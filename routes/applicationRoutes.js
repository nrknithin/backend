const express = require("express");
const router = express.Router();
const {
  getAllApplications,
  getApplicationById,
  createApplication
} = require("../controller/applicationController");

//get all orders
router.get("/", getAllApplications);

//get a order by id
router.get("/:id", getApplicationById);

//update a order
router.post("/", createApplication);

module.exports = router;
