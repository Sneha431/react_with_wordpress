const express = require("express");
const route = express.Router();

const services = require("../services/render");
const controller = require("../controllers/controller");


route.get("/products", services.getproducts);
route.post("/products/createProduct", services.createProduct);
route.put("/products/updateProduct/:id", services.updateProduct);
route.delete("/products/deleteProduct/:id", services.deleteProduct);


module.exports = route;
