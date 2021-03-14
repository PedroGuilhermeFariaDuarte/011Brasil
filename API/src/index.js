"use strict";
exports.__esModule = true;
require("dotenv").config();
// App
var index_1 = require("@app/index");
// Logger
var index_2 = require("@logger/index");
index_1["default"].listen(process.env.API_PORT, function () {
    index_2["default"].info("011Brasil API, online!");
});
