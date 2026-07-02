import { askGemini } from "../services/geminiService.js";

export const chatWithAI = async (req, res) => {
  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const reply = await askGemini(prompt);

    res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });

  }
};