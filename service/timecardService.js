const express = require("express");
const timecardBusiness = require("../business/timecardBusiness");
const router = express.Router();

// GET: Retrieve a timecard by ID or all timecards for an employee
router.get("/", (req, res) => {
  const { timecard_id, emp_id } = req.query;

  if (timecard_id) {
    const timecard = timecardBusiness.getTimecard(parseInt(timecard_id, 10));
    if (timecard) {
      return res.status(200).json(timecard);
    } else {
      return res.status(404).json({ error: "Timecard not found" });
    }
  } else if (emp_id) {
    const timecards = timecardBusiness.getAllTimecards(parseInt(emp_id, 10));
    return res.status(200).json(timecards);
  } else {
    return res
      .status(400)
      .json({ error: "Employee ID or Timecard ID is required" });
  }
});

// POST: Insert a new timecard
router.post("/", (req, res) => {
  const { start_time, end_time, emp_id } = req.body;

  if (!start_time || !end_time || !emp_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Perform validations
  if (!timecardBusiness.validateEmployeeExists(emp_id)) {
    return res.status(400).json({ error: "Employee ID is not valid" });
  }
  if (!timecardBusiness.validateStartTimeWithinLastWeek(start_time)) {
    return res
      .status(400)
      .json({ error: "Start time must be within the last week" });
  }
  if (!timecardBusiness.validateEndTime(start_time, end_time)) {
    return res.status(400).json({
      error:
        "End time must be at least 1 hour after start time and on the same day",
    });
  }
  if (!timecardBusiness.validateWeekday(start_time)) {
    return res
      .status(400)
      .json({ error: "Timecard entries must be on a weekday (Monday-Friday)" });
  }
  if (!timecardBusiness.validateWorkingHours(start_time, end_time)) {
    return res
      .status(400)
      .json({ error: "Timecard entries must be between 06:00 and 18:00" });
  }
  if (!timecardBusiness.validateUniqueStartTimePerDay(start_time, emp_id)) {
    return res
      .status(400)
      .json({ error: "Employee already has a timecard for the specified day" });
  }

  // Insert the timecard
  const newTimecard = {
    startTime: start_time,
    endTime: end_time,
    empId: emp_id,
  };
  const insertedTimecard = timecardBusiness.insertTimecard(newTimecard);

  if (insertedTimecard) {
    return res.status(201).json({
      message: "Timecard successfully inserted",
      timecard: insertedTimecard,
    });
  } else {
    return res.status(400).json({ error: "Failed to insert timecard" });
  }
});

// PUT: Update an existing timecard
router.put("/", (req, res) => {
  const { timecard_id, emp_id, start_time, end_time } = req.body;

  if (!timecard_id || !emp_id || !start_time || !end_time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Perform validations
  if (!timecardBusiness.validateTimecardIdExists(timecard_id)) {
    return res.status(400).json({ error: "Timecard ID is not valid" });
  }
  if (!timecardBusiness.validateEmployeeExists(emp_id)) {
    return res.status(400).json({ error: "Employee ID is not valid" });
  }
  if (!timecardBusiness.validateStartTimeWithinLastWeek(start_time)) {
    return res
      .status(400)
      .json({ error: "Start time must be within the last week" });
  }
  if (!timecardBusiness.validateEndTime(start_time, end_time)) {
    console.log(start_time, end_time);
    console.log(timecardBusiness.validateEndTime(start_time, end_time));
    return res.status(400).json({
      error:
        "End time must be at least 1 hour after start time and on the same day",
    });
  }
  if (!timecardBusiness.validateWeekday(start_time)) {
    return res
      .status(400)
      .json({ error: "Timecard entries must be on a weekday (Monday-Friday)" });
  }
  if (!timecardBusiness.validateWorkingHours(start_time, end_time)) {
    return res
      .status(400)
      .json({ error: "Timecard entries must be between 06:00 and 18:00" });
  }
  if (!timecardBusiness.validateUniqueStartTimePerDay(start_time, emp_id)) {
    return res
      .status(400)
      .json({ error: "Employee already has a timecard for the specified day" });
  }

  const updatedTimecard = {
    timecardId: timecard_id,
    empId: emp_id,
    startTime: start_time,
    endTime: end_time,
  };
  const result = timecardBusiness.updateTimecard(updatedTimecard);

  if (result) {
    return res
      .status(200)
      .json({ message: "Timecard successfully updated", timecard: result });
  } else {
    return res.status(400).json({ error: "Failed to update timecard" });
  }
});

// DELETE: Delete a timecard by ID
router.delete("/", (req, res) => {
  const { timecard_id } = req.query;

  if (!timecard_id) {
    return res.status(400).json({ error: "Timecard ID is required" });
  }

  const deleted = timecardBusiness.deleteTimecard(parseInt(timecard_id, 10));
  if (deleted) {
    return res.status(200).json({ message: "Timecard deleted successfully" });
  } else {
    return res
      .status(404)
      .json({ error: "Failed to delete timecard or timecard not found" });
  }
});

module.exports = router;
