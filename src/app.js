require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const db = require("./dao/database");

app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
