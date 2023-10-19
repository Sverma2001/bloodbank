const donorRepository = require("../repositories/donorRepository");

const addDonor = async (data) => {
    try {
        return await donorRepository.saveDonor(data)
    }
    catch{
        return "Unable to add donor"
    }
}

const getAllDonors = async () => {
    try {
        return await donorRepository.getAllDonors()
    }
    catch{
        return "Unable to fetch all donors"
    }
}

const getDonors = async (pages) => {
    const limit = 10
    const skip = (pages - 1) * limit
    try {
        const totalDonors = await donorRepository.totalDonors()
        const donors = await donorRepository.PaginatedDonors(skip, limit)
        const donor = {
            donors,
            currentPage: pages,
            totalPages: Math.ceil(totalDonors / limit)
        }
        return donor
    }
    catch {
        return "Unable to get donor list"
    }
}

const deleteDonor = async (id) => {
    try {
        const donor = await donorRepository.deleteDonor(id)
        if (!donor) {
            res.status(404).send("Donor not found");
        }
        return donor
    }
    catch {
        return "Unable to delete donor"
    }
}

const updateDonor = async (serial_no, address, contact) => {
    try{
        return await donorRepository.updateDonor(serial_no, address, contact )
    }
    catch{
        return "Unable to update donor"
    }
}

const getDonorId = async () => {
    try {
        let newId = 0
        const donor = await donorRepository.getDonorId()
        if (!donor || donor.length === 0) {
            newId = 1
        }
        else {
            newId = (donor[0].serial_no + 1)
        }
        return newId.toString()
    }
    catch{
        return "fetching donor id failed"
    }
}

module.exports = {
    addDonor,
    getAllDonors,
    getDonors,
    deleteDonor,
    updateDonor,
    getDonorId
}