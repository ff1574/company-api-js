const BusinessEntity = require("./businessEntity");
const employeeBusiness = require("./employeeBusiness");

class TimecardBusiness extends BusinessEntity {
  constructor() {
    super();
  }

  getTimecard(timecardId) {
    try {
      return this.dataLayer.getTimecard(timecardId);
    } catch (error) {
      console.error("Error retrieving timecard:", error);
      return null;
    }
  }

  getAllTimecards(empId) {
    try {
      return this.dataLayer.getAllTimecard(empId);
    } catch (error) {
      console.error("Error retrieving timecards:", error);
      return [];
    }
  }

  insertTimecard(timecardData) {
    const Timecard = this.dataLayer.Timecard;
    const { startTime, endTime, empId } = timecardData;

    try {
      const newTimecard = new Timecard(startTime, endTime, empId);
      return this.dataLayer.insertTimecard(newTimecard);
    } catch (error) {
      console.error("Error inserting timecard:", error);
      return null;
    }
  }

  updateTimecard(timecardData) {
    const Timecard = this.dataLayer.Timecard;

    try {
      const { timecardId, empId, startTime, endTime } = timecardData;
      const updatedTimecard = new Timecard(startTime, endTime, empId);
      updatedTimecard.setId(timecardId);
      return this.dataLayer.updateTimecard(updatedTimecard);
    } catch (error) {
      console.error("Error updating timecard:", error);
      return null;
    }
  }

  deleteTimecard(timecardId) {
    try {
      return this.dataLayer.deleteTimecard(timecardId) === 1;
    } catch (error) {
      console.error("Error deleting timecard:", error);
      return false;
    }
  }

  // Validation methods
  validateEmployeeExists(empId) {
    const employee = employeeBusiness.getEmployee(empId);
    if (!employee) {
      console.warn(`Employee ID ${empId} does not exist.`);
      return false;
    }
    return true;
  }

  validateStartTimeWithinLastWeek(startTime) {
    const currentTime = new Date();
    const oneWeekAgo = new Date(
      currentTime.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    const start = new Date(startTime);
    if (start > currentTime || start < oneWeekAgo) {
      console.warn(`Start time ${startTime} must be within the last week.`);
      return false;
    }
    return true;
  }

  validateEndTime(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const oneHourInMillis = 60 * 60 * 1000;

    if (end - start < oneHourInMillis) {
      console.warn("End time must be at least 1 hour after start time.");
      return false;
    }
    if (start.toDateString() !== end.toDateString()) {
      console.warn("End time must be on the same day as start time.");
      return false;
    }
    return true;
  }

  validateWeekday(timestamp) {
    const dayOfWeek = new Date(timestamp).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      console.warn("Timecard entries must be on a weekday (Monday-Friday).");
      return false;
    }
    return true;
  }

  validateWorkingHours(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const earliestTime = 6; // 06:00 AM
    const latestTime = 18; // 06:00 PM

    if (
      start.getHours() < earliestTime ||
      start.getHours() >= latestTime ||
      end.getHours() < earliestTime ||
      end.getHours() > latestTime
    ) {
      console.warn("Timecard entries must be between 06:00 and 18:00.");
      return false;
    }
    return true;
  }

  validateUniqueStartTimePerDay(startTime, empId) {
    console.log(
      `Validating unique start time for employee ID ${empId} on ${startTime}`
    );
    const employeeTimecards = this.getAllTimecards(empId);
    const start = new Date(startTime);

    for (const timecard of employeeTimecards) {
      const existingStart = new Date(timecard.start_time);
      if (existingStart.toDateString() === start.toDateString()) {
        console.warn(
          `Employee ID ${empId} already has a timecard on ${startTime}`
        );
        return false;
      }
    }
    console.log(
      `No existing timecard found for employee ID ${empId} on ${startTime}`
    );
    return true;
  }

  validateTimecardIdExists(timecardId) {
    const timecard = this.getTimecard(timecardId);
    if (!timecard) {
      console.warn(`Timecard ID ${timecardId} does not exist.`);
      return false;
    }
    return true;
  }
}

module.exports = new TimecardBusiness();
