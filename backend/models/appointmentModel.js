import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }, // This will store the appointment creation time
    cancelled: { type: Boolean, default: false }, // Default is false
    payment: { type: Boolean, default: false },   // Default is false
    isCompleted: { type: Boolean, default: false } // Default is false
});

// Fix the model initialization
const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);

export default appointmentModel;



