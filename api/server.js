const express = require("express");

const db = require("./data/carsDB");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

server.post("/cars", async (req, res) => {
  if (req.body) {
    const cars = await db.addCar(req.body);
    res.status(200).json(cars);
  }
});
server.get("/cars", async (req, res) => {
  res.status(200).json({ cars: await db.getCars() });
});
server.delete("/cars/:name", async (req, res) => {
  db.deleteCar(req.params.name);
  res.status(200).json({ msg: "Item deleted", cars: await db.getCars() });
});

module.exports = server;
