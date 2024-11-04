const express = require("express");
const employee = require("../business/employeeBusiness");
const router = express.Router();

router.get("/", (req, res) => {
  const { company, emp_id } = req.query;
  if (emp_id) {
    res.json(employee.get(emp_id));
  } else {
    res.json(employee.getAll(company));
  }
});

router.post("", () => {});
router.put("", () => {});
router.delete("", () => {});

module.exports = router;
