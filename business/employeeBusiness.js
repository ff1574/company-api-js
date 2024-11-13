const BusinessEntity = require("./businessEntity");
const departmentBusiness = require("./departmentBusiness");

class EmployeeBusiness extends BusinessEntity {
  constructor() {
    super();
  }

  // Method to retrieve a single employee by ID
  getEmployee(empId) {
    try {
      return this.dataLayer.getEmployee(empId);
    } catch (error) {
      console.error("Error retrieving employee:", error);
      return null;
    }
  }

  // Method to retrieve all employees by company name
  getAllEmployees(companyName) {
    try {
      return this.dataLayer.getAllEmployee(companyName);
    } catch (error) {
      console.error("Error retrieving employees:", error);
      return [];
    }
  }

  // Method to insert a new employee
  insertEmployee(employeeData) {
    const Employee = this.dataLayer.Employee;
    const { empName, empNo, hireDate, job, salary, deptId, mngId } =
      employeeData;

    try {
      const newEmployee = new Employee(
        empName,
        empNo,
        hireDate,
        job,
        salary,
        deptId,
        mngId
      );
      return this.dataLayer.insertEmployee(newEmployee);
    } catch (error) {
      console.error("Error inserting employee:", error);
      return null;
    }
  }

  // Method to update an existing employee
  updateEmployee(employeeData) {
    const Employee = this.dataLayer.Employee;
    try {
      const updatedEmployee = new Employee(
        employeeData.empName,
        employeeData.empNo,
        employeeData.hireDate,
        employeeData.job,
        employeeData.salary,
        employeeData.deptId,
        employeeData.mngId
      );
      updatedEmployee.setId(employeeData.empId);
      return this.dataLayer.updateEmployee(updatedEmployee);
    } catch (error) {
      console.error("Error updating employee:", error);
      return null;
    }
  }

  // Method to delete an employee by ID
  deleteEmployee(empId) {
    try {
      return this.dataLayer.deleteEmployee(empId) === 1;
    } catch (error) {
      console.error("Error deleting employee:", error);
      return false;
    }
  }

  // Validation methods
  validateUniqueEmpNo(empNo, companyName, empId = null) {
    const allEmployees = this.getAllEmployees(companyName);

    // Check each employee's empNo and empId for duplicates
    for (const employee of allEmployees) {
      if (employee.emp_no === empNo) {
        return false;
      }
    }
    return true;
  }

  validateDepartment(deptId, companyName) {
    const department = departmentBusiness.getDepartment(companyName, deptId);
    return department !== null;
  }

  validateManager(mngId) {
    if (mngId == 0) return true;
    const manager = this.getEmployee(mngId);
    console.log(manager);
    return manager !== null;
  }

  validateHireDate(hireDate) {
    const today = new Date();

    // Parse date assuming format YYYY-MM-DD
    const hireDateObj = new Date(hireDate);

    // Validate if hireDate is in the future
    if (hireDateObj > today) {
      return "Hire date cannot be in the future";
    }

    // Check if hireDate falls on a weekday
    const dayOfWeek = hireDateObj.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return "Hire date must be a weekday (Monday-Friday)";
    }

    return "true";
  }

  validateEmpIdExists(empId) {
    return this.getEmployee(empId) !== null;
  }
}

module.exports = new EmployeeBusiness();
