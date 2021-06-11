const customer = require("./customer");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

app = express();
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(cors());

app.use(customer.router);
app.listen(8080);