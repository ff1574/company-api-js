const BusinessEntity = require("./businessEntity");

class Employee extends BusinessEntity {
  get(emp_id) {
    let employee = this.dataLayer.getEmployee(emp_id);
    return employee;
  }

  getAll(company) {
    return this.dataLayer.getAllEmployee(company);
  }
}

module.exports = new Employee();
