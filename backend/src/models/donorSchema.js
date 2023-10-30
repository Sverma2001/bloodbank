const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
    serial_no: {
        type: Number,
        required: false,
        trim:true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    blood_group: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true,
        required: false
    },
    contact: {
        type: Number,
        trim: true,
        minlength: 10,
        required: false
    }
},
    {
        timestamps: true
    });

// donorSchema.pre("save", async function (next) {
//     if (!this.serial_no) {
//         const serialNumberDoc = await SerialNumber.findOneAndUpdate(
//             { name: "donor_serial_number" },
//             { $inc: { value: 1 } },
//             { new: true, upsert: true }
//         );
//         this.serial_no = serialNumberDoc.value;
//     }
//     next();
// });

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;