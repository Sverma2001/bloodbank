const donorService = require('../services/donorService');

// Add Donor 
async function addDonor(req, res) {
    try {
        await donorService.addDonor(req.body);
        res.status(201).send("donor added successfully");
    }
    catch (err) {
        res.status(400).send({ err: 'Adding Donor Failed' });
    }
}

//fetching the list of all donors
async function getAllDonors(req, res) {
    try {
        const donor = await donorService.getAllDonors();
        res.send(donor);
    }
    catch (err) {
        res.status(500).send({ err: 'Internal Server Error' });
    }
}

//fething the paginated donor
async function getDonor(req, res) {
    const page = parseInt(req.query.page) || 1;
    try {
        const donor = await donorService.getDonors(page);
        res.status(200).send(donor);
    }
    catch (e) {
        res.status(500).send({ error: "Internal Server error" });
    }
}

//deleting the donor
async function deleteDonor(req, res) {
    const id = req.params.id;
    try {
        const donor = await donorService.deleteDonor(id);
        res.send(donor);
    } catch (e) {
        res.status(400).send({ err: 'Deleting Donor Failed' });
    }
}

//updating the donor
async function updateDonor(req, res) {
    const { serial_no, address, contact } = { ...req.body };
    try {
        await donorService.updateDonor(serial_no, address, contact);
        res.status(201).send("updated successfully");
    }
    catch (e) {
        res.status(500).send({ error: "Updating donor details failed" });
    }
    res.send()
}

//fetching the id of the last donor
async function getDonorId(req, res) {
    try {
        const id = await donorService.getDonorId();
        res.status(201).send(id);
    }
    catch (err) {
        console.log(err)
        res.status(401).send({ err: "Unable to fetch Id" });
    }
}

module.exports = {
    addDonor,
    getAllDonors,
    getDonor,
    deleteDonor,
    updateDonor,
    getDonorId
}