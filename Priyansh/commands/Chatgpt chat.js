const axios = require("axios");
const moment = require("moment-timezone");

// Global switch for auto-reply
let autoReplyOn = false;

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT + Julmi Jaat",
  description: "Turn AI auto-reply on or off",
  commandCategory: "chatbots",
  usages: "[on/off]",
  cooldowns: 0,
  dependencies: {}
};

// Command to turn on/off
module.exports.run = async function ({ api, event, args }) {
  const input = args[0]?.toLowerCase();

  if (input === "on") {
    autoReplyOn = true;
    return api.sendMessage("✅ AI auto-reply is now *ON*.", event.threadID, event.messageID);
  }

  if (input === "off") {
    autoReplyOn = false;
    return api.sendMessage("❌ AI auto-reply is now *OFF*.", event.threadID, event.messageID);
  }

  return api.sendMessage("Use `!ai on` to enable or `!ai off` to disable auto-reply.", event.threadID, event.messageID);
};

// Auto-reply system
module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body } = event;

  // Don't respond if disabled or self-message or empty
  if (!autoReplyOn || senderID === api.getCurrentUserID() || !body) return;

  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";
  const currentTime = moment().tz("Asia/Kolkata").format("MMM D, YYYY - hh:mm A");

  const systemPrompt = `You are a helpful and polite Messenger chatbot. Time: ${currentTime}`;

  try {
    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: body }
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
    api.sendMessage(reply, threadID, messageID);
  } catch (err) {
    console.log("AI Error:", err.message); // Silent fail, no reply to user
  }
};
