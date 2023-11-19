import Application from "../models/Application.js";

export const createApplication = async (req, res) => {
  try {
    const { name, email, dob, course } = req.body;
    const newApplication = new Application({ name, email, dob, course });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error("Error creating application:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
