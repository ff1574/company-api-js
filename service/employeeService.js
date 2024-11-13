const express = require("express");
const employeeBusiness = require("../business/employeeBusiness");
const router = express.Router();

// GET: Retrieve an employee by ID or all employees by company
router.get("/", (req, res) => {
  const { company, emp_id } = req.query;

  try {
    if (emp_id) {
      const employee = employeeBusiness.getEmployee(parseInt(emp_id, 10));
      if (employee) {
        return res.status(200).json(employee);
      } else {
        return res.status(404).json({ error: "Employee not found" });
      }
    } else {
      const employees = employeeBusiness.getAllEmployees(company);
      return res.status(200).json(employees);
    }
  } catch (error) {
    console.error("Error retrieving employee(s):", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST: Insert a new employee
router.post("/", (req, res) => {
  const { company, emp_name, emp_no, hire_date, job, salary, dept_id, mng_id } =
    req.body;

  if (
    !company ||
    !emp_name ||
    !emp_no ||
    !hire_date ||
    !job ||
    !salary ||
    !dept_id
  ) {
    return res.status(400).json({ error: "All employee fields are required" });
  }
  // Perform validations
  if (!employeeBusiness.validateUniqueEmpNo(emp_no, company)) {
    return res.status(400).json({ error: "Employee number must be unique" });
  }
  if (!employeeBusiness.validateDepartment(dept_id, company)) {
    return res.status(400).json({ error: "Department ID does not exist" });
  }
  if (!employeeBusiness.validateManager(mng_id)) {
    return res.status(400).json({ error: "Manager ID does not exist" });
  }
  const hireDateValidation = employeeBusiness.validateHireDate(hire_date);
  if (hireDateValidation != "true") {
    return res.status(400).json({ error: hireDateValidation });
  }

  // Proceed to insert
  const newEmployee = {
    empName: emp_name,
    empNo: emp_no,
    hireDate: hire_date,
    job,
    salary,
    deptId: dept_id,
    mngId: mng_id,
    company,
  };
  const insertedEmployee = employeeBusiness.insertEmployee(newEmployee);
  if (insertedEmployee) {
    return res.status(201).json({
      message: "Employee successfully inserted",
      employee: insertedEmployee,
    });
  } else {
    return res.status(400).json({ error: "Failed to insert employee" });
  }
});

// PUT: Update an existing employee
router.put("/", (req, res) => {
  const {
    emp_id,
    company,
    emp_name,
    emp_no,
    hire_date,
    job,
    salary,
    dept_id,
    mng_id,
  } = req.body;

  if (
    !emp_id ||
    !company ||
    !emp_name ||
    !emp_no ||
    !hire_date ||
    !job ||
    !salary ||
    !dept_id
  ) {
    return res.status(400).json({ error: "All employee fields are required" });
  }

  if (!employeeBusiness.validateEmpIdExists(emp_id)) {
    return res.status(404).json({ error: "Employee ID does not exist" });
  }
  if (!employeeBusiness.validateUniqueEmpNo(emp_no, company, emp_id)) {
    return res.status(400).json({ error: "Employee number must be unique" });
  }
  if (!employeeBusiness.validateDepartment(dept_id, company)) {
    return res.status(400).json({ error: "Department ID does not exist" });
  }
  if (!employeeBusiness.validateManager(mng_id, company)) {
    return res.status(400).json({ error: "Manager ID does not exist" });
  }
  const hireDateValidation = employeeBusiness.validateHireDate(hire_date);
  if (hireDateValidation !== "true") {
    return res.status(400).json({ error: hireDateValidation });
  }

  const updatedEmployee = {
    empId: emp_id,
    empName: emp_name,
    empNo: emp_no,
    hireDate: hire_date,
    job,
    salary,
    deptId: dept_id,
    mngId: mng_id,
    company,
  };
  const result = employeeBusiness.updateEmployee(updatedEmployee);
  if (result) {
    return res.status(200).json({
      message: "Employee successfully updated",
      employee: result,
    });
  } else {
    return res.status(400).json({ error: "Failed to update employee" });
  }
});

// DELETE: Delete an employee by ID
router.delete("/", (req, res) => {
  const { emp_id } = req.query;

  if (!emp_id) {
    return res.status(400).json({ error: "Employee ID is required" });
  }

  const deleted = employeeBusiness.deleteEmployee(parseInt(emp_id, 10));
  if (deleted) {
    return res.status(200).json({ message: "Employee deleted successfully" });
  } else {
    return res
      .status(404)
      .json({ error: "Failed to delete employee or employee not found" });
  }
});

module.exports = router;
