const Email = require("../models/Email");
const generateEmail = require("../services/geminiService");

// ================= Generate Email =================

const generateAIEmail = async (req, res) => {
  try {

    const { subject, prompt, tone } = req.body;

    if (!subject || !prompt) {
      return res.status(400).json({
        success: false,
        message: "Subject and Prompt are required",
      });
    }

    const finalPrompt = `
Generate a ${tone || "Professional"} email.

Subject:
${subject}

Details:
${prompt}

Return only the email content.
`;

    const aiResponse = await generateEmail(finalPrompt);

    const email = await Email.create({
      user: req.user.id,
      subject,
      prompt,
      tone,
      generatedEmail: aiResponse,
    });

    res.status(200).json({
      success: true,
      message: "Email Generated Successfully",
      email,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Get History =================

const getHistory = async (req, res) => {

  try {

    const emails = await Email.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      emails,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ================= Delete Email =================

const deleteEmail = async (req, res) => {

  try {

    await Email.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Email Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  generateAIEmail,
  getHistory,
  deleteEmail,
};