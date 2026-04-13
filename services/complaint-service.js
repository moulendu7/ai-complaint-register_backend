const axios = require("axios");
const complaintRepo = require("../repository/complaint-repo");

const HF_API_URL = "https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli";
const HF_API_KEY = process.env.HF_API_KEY;

const CATEGORIES = [
  "Academic Issues",
  "Bathroom & Hygiene",
  "Mess & Food Quality",
  "Anti-Ragging & Safety",
  "Infrastructure/Maintenance",
];

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/broke/g, "broken")
    .replace(/not working|not work/g, "broken")
    .replace(/dont/g, "do not")
    .replace(/cant/g, "cannot");
};

const ruleBoost = (text) => {
  if (/insect|mosquito|bug/.test(text)) {
    if (/food|mess|canteen/.test(text)) return { category: "Mess & Food Quality", confidence: 0.92 };
    return { category: "Bathroom & Hygiene", confidence: 0.85 };
  }
  if (/fan|light|electric|power|switch|elevator|lift/.test(text)) return { category: "Infrastructure/Maintenance", confidence: 0.9 };
  if (/bathroom|toilet|water|leak|washroom|tap|faucet|pipe|plumbing/.test(text)) return { category: "Bathroom & Hygiene", confidence: 0.9 };
  if (/food|mess|canteen|dirty|bad food/.test(text)) return { category: "Mess & Food Quality", confidence: 0.88 };
  if (/class|teacher|exam|lecture/.test(text)) return { category: "Academic Issues", confidence: 0.85 };
  if (/ragging|fight|abuse|threat/.test(text)) return { category: "Anti-Ragging & Safety", confidence: 0.95 };
  return null;
};

const classifyComplaint = async (text) => {
  const normalized = normalizeText(text);
  
  let aiCategory = "Other";
  let aiConfidence = 0;

  try {
    const response = await axios.post(
      HF_API_URL,
      {
        inputs: normalized,
        parameters: {
          candidate_labels: CATEGORIES,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 8000,
      }
    );

    if (response.data && response.data.labels) {
      aiCategory = response.data.labels[0];
      aiConfidence = response.data.scores[0];
    }
  } catch (error) {
    console.error(error.message);
  }

  const rule = ruleBoost(normalized);

  if (rule && aiConfidence < 0.75) {
    return rule;
  }

  if (aiConfidence < 0.3) {
    return { category: "Other", confidence: aiConfidence };
  }

  return { category: aiCategory, confidence: aiConfidence };
};

const mapDepartment = (category) => {
  const map = {
    "Bathroom & Hygiene": "Maintenance",
    "Infrastructure/Maintenance": "Maintenance",
    "Mess & Food Quality": "Mess",
    "Academic Issues": "Academic Office",
    "Anti-Ragging & Safety": "Security",
    Other: "General",
  };
  return map[category] || "General";
};

const createComplaint = async (userId, data) => {
  const { description } = data;
  const aiResult = await classifyComplaint(description);

  const complaint = await complaintRepo.createComplaint({
    user: userId,
    description,
    category: aiResult.category,
    aiConfidence: aiResult.confidence,
    department: mapDepartment(aiResult.category),
  });

  return complaint;
};

const getUserComplaints = async (userId) => {
  return await complaintRepo.getByUser(userId);
};

const getAllComplaints = async () => {
  return await complaintRepo.getAll();
};

const updateComplaint = async (id, data) => {
  return await complaintRepo.updateComplaint(id, data);
};

const getComplaintById = async (id) => {
  return await complaintRepo.getById(id);
};

module.exports = {
  createComplaint,
  getUserComplaints,
  getAllComplaints,
  updateComplaint,
  getComplaintById,
};