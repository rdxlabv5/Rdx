const axios = require("axios");
const moment = require("moment-timezone");

// Auto reply global switch
let autoReplyOn = false;

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ChatGPT + Julmi Jaat",
  description: "AI auto-reply ON/OFF",
  commandCategory: "chatbots",
  usages: "[on/off]",
  cooldowns: 0
};

// Command: !ai on / !ai off
module.exports.run = async function ({ api, event, args }) {
  const input = args[0]?.toLowerCase();
  if (input === "on") {
    autoReplyOn = true;
    return api.sendMessage("✅ Auto-reply is ON.", event.threadID, event.messageID);
  }
  if (input === "off") {
    autoReplyOn = false;
    return api.sendMessage("❌ Auto-reply is OFF.", event.threadID, event.messageID);
  }

  return; // No message on wrong input
};

// Auto reply: triggered on any message if autoReplyOn = true
module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body } = event;

  // Ignore if off, bot message, or blank message
  if (!autoReplyOn || senderID === api.getCurrentUserID() || !body) return;

  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";
  const currentTime = moment().tz("Asia/Kolkata").format("MMM D, YYYY - hh:mm A");

  const systemPrompt = `You are a helpful AI assistant in a Messenger chat. Reply clearly and helpfully. Current time: ${currentTime}`;

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
    console.log("AI Error:", err.message); // No error shown to user
  }
};
