import Incident from "../models/incidents.model.js";

//create new incident

export const createIncident = async (req, res) => {
  const { title, description, severity } = req.body;
  const allowedSeverities = ['Low', 'Medium', 'High'];

  if (!title || !description || !severity || !allowedSeverities.includes(severity)) {
    return res.status(400).json({
      error: "Validation failed. Required fields: title, description, severity (Low, Medium, High)",
    });
  }

  try {
    const newIncident = await Incident.create({ title, description, severity });
    newIncident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    console.error("Error creating incident:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//list all

export const listIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ id: 1 }); // sorted by id ascending
    res.status(200).json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//id output

export const getIncidentById = async (req, res) => {
  const { id } = req.params;

  try {
    const incident = await Incident.findOne({ id: parseInt(id) }); // find by custom id
    if (!incident) {
      return res.status(404).json({ error: "Incident not found" });
    }
    res.status(200).json(incident);
  } catch (error) {
    console.error("Error fetching incident:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete by id

export const deleteIncidentById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIncident = await Incident.findOneAndDelete({ id: parseInt(id) });
    if (!deletedIncident) {
      return res.status(404).json({ error: "Incident not found" });
    }
    res.status(200).json({ message: "Incident deleted successfully" });
  } catch (error) {
    console.error("Error deleting incident:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
