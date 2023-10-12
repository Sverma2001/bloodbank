const express = require("express");
const router = new express.Router();
const Donor = require("../models/donorSchema");

//adding donor to the database
router.post('/addDonor', async (req, res) => {
    console.log(req.body)
    const donor = new Donor({
        ...req.body
    })

    try {
        await donor.save()
        res.status(201).send("donor added successfully")
    } 
    catch (e) {
        res.status(400).send(e)
    }
})

// getting all donor details
router.get('/AllDonors', async (req, res) => {
    try {
        const donor = await Donor.find()
        res.send(donor)
    } 
    catch (e) {
        res.status(500).send(e)
    }
})

//getting paginated donor details
router.get('/Donor', async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const skip = (page - 1) * limit
    console.log("page is now", page)
    try {
        const totalDonors = await Donor.countDocuments()
        const donors = await Donor.find().skip(skip).limit(limit)

        const donor = {
            donors,
            currentPage:page,
            totalPages: Math.ceil(totalDonors / limit)
        }
        console.log(donor)
        res.send(donor)
    } 
    catch (e) {
        res.status(500).json({ error: "Internal Server error" })
    }
})

// generating new donor id
router.get('/getDonorId', async (req, res) => {
    try {
        let newId = 0
        const donor = await Donor.find().sort({ serial_no: -1 }).limit(1)   
        if(!donor || donor.length === 0){
            newId = 1
        }
        else{
            newId = (donor[0].serial_no+1)
        }
        res.status(201).send(newId.toString())
    } 
    catch (e) {
        console.log(e)
        res.status(401).send(e)
    }
})

// deleting a specific donor
router.delete('/deleteDonor/:id', async (req, res) => {
    const id = req.params.id; 
    try {
        const donor = await Donor.findOneAndDelete({ serial_no: id }); 
        if (!donor) {
            return res.status(404).send("Donor not found");
        }
        res.send(donor);
    } catch (e) {
        res.status(400).send(e);
    }
});


// updating donors details
router.patch('/updateDonor', async (req, res) => {
    const {address,contact}={...req.body}
    try {
         await Donor.findOneAndUpdate({ serial_no: req.body.serial_no }, { address, contact })
        res.status(201).send("updated successfully")
    }
    catch (e) {
        res.status(500).send(e)
    }
    res.send()
})

module.exports = router;