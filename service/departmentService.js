const express = require("express");
const departmentBusiness = require("../business/departmentBusiness");
const router = express.Router();

// GET: Fetch a single department or all departments for a company
router.get("/", (req, res) => {
  const { company, dept_id } = req.query;

  if (!company) {
    return res.status(400).json({ error: "Company name is required" });
  }

  try {
    if (dept_id) {
      const department = departmentBusiness.getDepartment(
        company,
        parseInt(dept_id, 10)
      );
      if (department) {
        return res.status(200).json(department);
      } else {
        return res.status(404).json({ error: "Department not found" });
      }
    } else {
      const departments = departmentBusiness.getAll(company);
      return res.status(200).json(departments);
    }
  } catch (error) {
    console.error("Error retrieving department(s):", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST: Insert a new department
router.post("/", (req, res) => {
  const { company, dept_name, dept_no, location } = req.body;

  if (!company || !dept_name || !dept_no || !location) {
    return res
      .status(400)
      .json({ error: "All department fields are required" });
  }

  if (!departmentBusiness.validateUniqueDeptNo(dept_no, company)) {
    return res.status(400).json({ error: "Department number must be unique" });
  }

  try {
    const newDepartment = {
      company,
      deptName: dept_name,
      deptNo: dept_no,
      location,
    };
    const insertedDepartment =
      departmentBusiness.insertDepartment(newDepartment);

    if (insertedDepartment) {
      return res.status(201).json({
        message: "Department successfully inserted",
        department: insertedDepartment,
      });
    } else {
      return res.status(400).json({ error: "Failed to insert department" });
    }
  } catch (error) {
    console.error("Error inserting department:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PUT: Update an existing department
router.put("/", (req, res) => {
  const { dept_id, company, dept_name, dept_no, location } = req.body;

  if (!dept_id || !company || !dept_name || !dept_no || !location) {
    return res
      .status(400)
      .json({ error: "All department fields are required" });
  }

  // Validate department exists
  if (!departmentBusiness.validateDeptExists(company, parseInt(dept_id, 10))) {
    return res.status(404).json({ error: "Department ID does not exist" });
  }

  // Validate unique department number
  if (
    !departmentBusiness.validateUniqueDeptNo(
      dept_no,
      company,
      parseInt(dept_id, 10)
    )
  ) {
    return res.status(400).json({ error: "Department number must be unique" });
  }

  try {
    const departmentToUpdate = {
      dept_id: parseInt(dept_id, 10),
      company,
      dept_name: dept_name,
      dept_no: dept_no,
      location,
    };
    const updatedDepartment =
      departmentBusiness.updateDepartment(departmentToUpdate);

    if (updatedDepartment) {
      return res.status(200).json({
        message: "Department successfully updated",
        department: updatedDepartment,
      });
    } else {
      return res.status(400).json({ error: "Failed to update department" });
    }
  } catch (error) {
    console.error("Error updating department:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE: Delete a department
router.delete("/", (req, res) => {
  const { company, dept_id } = req.query;

  if (!company || !dept_id) {
    return res
      .status(400)
      .json({ error: "Company name and department ID are required" });
  }

  // Validate department exists
  if (!departmentBusiness.validateDeptExists(company, parseInt(dept_id, 10))) {
    return res.status(404).json({ error: "Department ID does not exist" });
  }

  try {
    const deleted = departmentBusiness.deleteDepartment(
      company,
      parseInt(dept_id, 10)
    );

    if (deleted) {
      return res
        .status(200)
        .json({ message: "Department deleted successfully" });
    } else {
      return res.status(400).json({ error: "Failed to delete department" });
    }
  } catch (error) {
    console.error("Error deleting department:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
