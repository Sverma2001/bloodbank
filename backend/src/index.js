const express = require("express");
require('./db/database');

const cors = require('cors')
const donorRoute = require("./apis/donor");

const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());
app.use(donorRoute)

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})