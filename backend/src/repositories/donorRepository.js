const Donor = require('../models/donorSchema');

//saving the added donor to the database and then saving it
const saveDonor = async (data) => {
    try {
        const donor = new Donor({
            ...data
        });
        await donor.save();
        return donor;
    }
    catch (err) {
        return err;
    }
}

//fetching the list of all donors
const getAllDonors = async () => {
    try {
        return await Donor.find();
    }
    catch (err) {
        return err;
    }
}

//fetching the paginated donor
const PaginatedDonors = async (skip, limit) => {
    try {
        return Donor.find().skip(skip).limit(limit);
    }
    catch (err) {
        return err;
    }
}

//fetching the total number of donors
const totalDonors = async () => {
    try {
        return await Donor.countDocuments();
    }
    catch (err) {
        return err;
    }
}

//deleting the donor
const deleteDonor = async (serial_no) => {
    try {
        return await Donor.findOneAndDelete({ serial_no });
    }
    catch (err) {
        return err;
    }
}

//updating the donor by finding it with serial no and then updating the address and contact
const updateDonor = async (serial_no, address, contact) => {
    try {
        return await Donor.findOneAndUpdate({ serial_no }, { address, contact });
    }
    catch (err) {
        return err;
    }
}

//fetching the id of the last donor
const getDonorId = async () => {
    try {
        return await Donor.find().sort({ serial_no: -1 }).limit(1);
    }
    catch (err) {
        return err;
    }
}

module.exports = {
    saveDonor,
    getAllDonors,
    PaginatedDonors,
    totalDonors,
    deleteDonor,
    updateDonor,
    getDonorId
}