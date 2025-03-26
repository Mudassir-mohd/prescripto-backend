import express from "express";
import appointmentModel from "../models/appointmentModel.js"; 

const router = express.Router();

// Create a new appointment
router.post("/create", async (req, res) => {
    try {
        const { userId, docId, docData, userData, slotTime, slotDate, amount } = req.body;

        // Create a new appointment instance
        const newAppointment = new appointmentModel({
            userId,
            docId,
            docData,
            userData,
            slotTime,
            slotDate,
            amount,
            cancelled: false,  // Default is false
            payment: false,    // Default is false
            isCompleted: false // Default is false
        });

        // Save to the database
        await newAppointment.save();
        res.status(201).json({ message: "Appointment saved successfully!", appointment: newAppointment });
    } catch (error) {
        console.error("Error saving appointment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/my-appointments/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await appointmentModel.find({ userId });

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found for this user" });
        }

        res.status(200).json({ message: "Appointments fetched successfully", appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
