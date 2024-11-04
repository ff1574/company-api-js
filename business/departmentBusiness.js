const BusinessEntity = require("./businessEntity");

class Department extends BusinessEntity {
  get(company, dept_id) {
    let department = this.dataLayer.getDepartment(company, dept_id);
    return department;
  }

  getAll(company) {
    return this.dataLayer.getAllDepartment(company);
  }
}

module.exports = new Department();
