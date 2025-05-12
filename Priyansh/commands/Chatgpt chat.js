const axios = require("axios");
const moment = require("moment-timezone");

let autoReplyStatus = {}; // store per-thread setting

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Julmi Jaat + ChatGPT",
  description: "Enable or disable auto-reply AI",
  commandCategory: "chatbots",
  usages: "ai [on/off]",
  cooldowns: 0,
};

// Command: .ai on / .ai off
module.exports.run = async function ({ api, event, args }) {
  const input = args[0]?.toLowerCase();
  const threadID = event.threadID;

  if (input === "on") {
    autoReplyStatus[threadID] = true;
    return api.sendMessage("✅ Auto-reply is ON.", threadID, event.messageID);
  }

  if (input === "off") {
    autoReplyStatus[threadID] = false;
    return api.sendMessage("❌ Auto-reply is OFF.", threadID, event.messageID);
  }

  return api.sendMessage("Use `.ai on` to enable or `.ai off` to disable auto-reply.", threadID, event.messageID);
};

// Auto AI response (no prefix needed)
module.exports.handleEvent = async function ({ api, event }) {
  const threadID = event.threadID;
  const senderID = event.senderID;
  const message = event.body;

  if (!autoReplyStatus[threadID]) return; // Not enabled
  if (!message || senderID === api.getCurrentUserID()) return;

  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";
  const currentTime = moment().tz("Asia/Kolkata").format("MMM D, YYYY - hh:mm A");

  const systemPrompt = `You are a friendly and intelligent chatbot replying in a Facebook Messenger chat. Current time is ${currentTime}.`;

  try {
    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    api.sendMessage(reply, threadID, event.messageID);
  } catch (err) {
    console.log("AI Error:", err.response?.data || err.message);
  }
};
