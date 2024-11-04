const express = require("express");
const department = require("../business/departmentBusiness");
const router = express.Router();

router.get("/", (req, res) => {
  const { company, dept_id } = req.query;
  if (company && dept_id) {
    res.json(department.get(company, dept_id));
  } else {
    res.json(department.getAll(company));
  }
});

router.post("", () => {});
router.put("", () => {});
router.delete("", () => {});

module.exports = router;
