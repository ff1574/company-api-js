const BusinessEntity = require("./businessEntity");

class DepartmentBusiness extends BusinessEntity {
  constructor() {
    super();
  }

  // Method to retrieve a single department by company name and department ID
  getDepartment(companyName, deptId) {
    if (!companyName || companyName.trim() === "") {
      console.error("The company name is required.");
      return null;
    }
    try {
      return this.dataLayer.getDepartment(companyName, deptId);
    } catch (error) {
      console.error("Error retrieving department", error);
      return null;
    }
  }

  // Method to retrieve all departments by company name
  getAll(companyName) {
    if (!companyName || companyName.trim() === "") {
      console.error("The company name is required.");
      return [];
    }
    try {
      return this.dataLayer.getAllDepartment(companyName);
    } catch (error) {
      console.error("Error retrieving departments", error);
      return [];
    }
  }

  // Method to insert a new department
  insertDepartment(departmentData) {
    const { company, deptName, deptNo, location } = departmentData;
    const Department = this.dataLayer.Department;

    if (!company || !deptName || !deptNo || !location) {
      console.error(
        "All fields (company, deptName, deptNo, location) are required."
      );
      return null;
    }

    try {
      const newDepartment = new Department(company, deptName, deptNo, location);
      return this.dataLayer.insertDepartment(newDepartment);
    } catch (error) {
      console.error("Error inserting department:", error);
      return null;
    }
  }

  // Method to update a department
  updateDepartment(departmentData) {
    const { dept_id, company, dept_name, dept_no, location } = departmentData;
    const Department = this.dataLayer.Department;

    if (!dept_id || !company || !dept_name || !dept_no || !location) {
      console.error(
        "All fields (dept_id, company, dept_name, dept_no, location) are required."
      );
      return null;
    }

    try {
      const departmentToUpdate = new Department(
        company,
        dept_name,
        dept_no,
        location,
        dept_id
      );

      return this.dataLayer.updateDepartment(departmentToUpdate);
    } catch (error) {
      console.error("Error updating department:", error);
      return null;
    }
  }

  // Method to delete a department by company name and department ID
  deleteDepartment(companyName, deptId) {
    try {
      return this.dataLayer.deleteDepartment(companyName, deptId) === 1;
    } catch (error) {
      console.error("Error deleting department", error);
      return false;
    }
  }

  // Method to delete all departments by company name
  deleteAllDepartments(companyName) {
    if (!companyName || companyName.trim() === "") {
      console.error("The company name is required.");
      return false;
    }
    try {
      const departments = this.dataLayer.getAllDepartment(companyName);
      departments.forEach((department) => {
        this.dataLayer.deleteDepartment(department.company, department.id);
        console.info("Deleted department:", department);
      });
      console.info("All departments deleted successfully.");
      return true;
    } catch (error) {
      console.error("Error deleting all departments", error);
      return false;
    }
  }

  // Method to validate unique department number
  validateUniqueDeptNo(deptNo, companyName) {
    // Retrieve all departments for the specified company
    const allDepartments = this.getAll(companyName);

    for (let dept of allDepartments) {
      if (deptNo == dept.dept_no) {
        console.warn(`Department number ${deptNo} is not unique`);
        return false;
      }
    }
    return true;
  }

  // Method to validate if department exists
  validateDeptExists(companyName, deptId) {
    const department = this.getDepartment(companyName, deptId);
    if (!department) {
      console.warn(
        `Department ID ${deptId} does not exist in company ${companyName}`
      );
      return false;
    }
    return true;
  }
}

module.exports = new DepartmentBusiness();
