const express = require("express");
const router = new express.Router();
const donorController = require("../controller/donorController");

router.post('/addDonor', donorController.addDonor)
router.get('/AllDonors', donorController.getAllDonors)
router.get('/Donor', donorController.getDonor)
router.get('/getDonorId', donorController.getDonorId)
router.delete('/deleteDonor/:id', donorController.deleteDonor);
router.patch('/updateDonor', donorController.updateDonor);

module.exports = router;