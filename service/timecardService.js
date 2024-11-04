const express = require("express");
const timecard = require("../business/timecardBusiness");
const router = express.Router();

router.get("/", (req, res) => {
  const { timecard_id, emp_id } = req.query;
  if (timecard_id) {
    res.json(timecard.get(timecard_id));
  } else {
    res.json(timecard.getAll(emp_id));
  }
});

router.post("", () => {});
router.put("", () => {});
router.delete("", () => {});

module.exports = router;
