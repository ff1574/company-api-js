const DataLayer = require("../lib/DataLayer");

class BusinessLayer {
  constructor() {
    this.dataLayer = new DataLayer("ff1574");
  }

  getDataLayer() {
    return this.dataLayer;
  }
}

module.exports = BusinessLayer;
