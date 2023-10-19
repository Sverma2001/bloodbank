const Donor = require('../models/donorSchema')

const saveDonor = async (data) => {
    try {
        const donor = new Donor({
            ...data
        })
        await donor.save()
        return donor
    }
    catch (err) {
        return err
    }
}

const getAllDonors = async () => {
    try {
        return await Donor.find()
    }
    catch (err) {
        return err
    }
}

const PaginatedDonors = async (skip, limit) => {
    try {
        return Donor.find().skip(skip).limit(limit)
    }
    catch (err) {
        return err
    }
}

const totalDonors = async () => {
    try {
        return await Donor.countDocuments()
    } 
    catch (err) {
        return err
    }
}

const deleteDonor = async (id) => {
    try{
        return await Donor.findOneAndDelete({ serial_no: id })
    }
    catch(err){
        return err
    }
}

const updateDonor = async (serial_no, address, contact) => {
    try{
        return await Donor.findOneAndUpdate({serial_no}, {address, contact })
    }
    catch(err){
        return err
    }
}

const getDonorId = async () => {
    try {
        return await Donor.find().sort({ serial_no: -1 }).limit(1)
    }
    catch (err) {
        return err
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