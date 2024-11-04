const BusinessEntity = require("./businessEntity");

class Timecard extends BusinessEntity {
  get(timecard_id) {
    let timecard = this.dataLayer.getTimecard(timecard_id);
    return timecard;
  }

  getAll(emp_id) {
    return this.dataLayer.getAllTimecard(emp_id);
  }
}

module.exports = new Timecard();
