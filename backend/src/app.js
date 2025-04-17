require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const db = require("./dao/initDB");
const cors = require('cors');

app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5176",
        allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
        credentials: true,
    })
);

app.use("/api", routes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

