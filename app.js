const express = require("express");
const departmentRouter = require("./service/departmentService");
const employeeRouter = require("./service/employeeService");
const timecardRouter = require("./service/timecardService");

const app = express();
const port = 3000;
const baseURL = "/fister-franko-p3/api";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`${baseURL}/department`, departmentRouter);
app.use(`${baseURL}/employee`, employeeRouter);
app.use(`${baseURL}/timecard`, timecardRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

module.exports = app;
