const express = require("express");
const cors = require("cors");
// const axios = require('axios')

const app = express();

app.use(cors());

app.use(express.json());

let ships = []

const { getCompliment, getFortune, addShip, deleteShip, getShips } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune)
app.get("/api/getShips", getShips)
app.post("/api/addShip", addShip)
app.delete("/api/deleteShip:id", deleteShip)

app.listen(4000, () => console.log("Server running on 4000"));
