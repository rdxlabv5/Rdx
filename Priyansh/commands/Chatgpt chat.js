const axios = require("axios");

let autoReplyStatus = {};

module.exports.config = {
  name: "ai",
  version: "1.0",
  hasPermssion: 0,
  credits: "ChatGPT + Julmi",
  description: "Enable/Disable auto AI chat without prefix",
  commandCategory: "chatbots",
  usages: "[on/off]",
  cooldowns: 0
};

// Command: .ai on / .ai off
module.exports.run = async ({ api, event, args }) => {
  const input = args[0]?.toLowerCase();
  const threadID = event.threadID;

  if (input === "on") {
    autoReplyStatus[threadID] = true;
    return api.sendMessage("✅ Auto-reply is ON.", threadID, event.messageID);
  } else if (input === "off") {
    autoReplyStatus[threadID] = false;
    return api.sendMessage("❌ Auto-reply is OFF.", threadID, event.messageID);
  } else {
    return api.sendMessage("Use `.ai on` to enable or `.ai off` to disable auto-reply.", threadID, event.messageID);
  }
};

// This handles ALL messages (for auto-reply)
module.exports.handleEvent = async ({ api, event }) => {
  const { threadID, messageID, senderID, body } = event;

  // ignore if disabled
  if (!autoReplyStatus[threadID]) return;
  if (!body || senderID === api.getCurrentUserID()) return;

  const apiKey = "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";

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: body }],
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    const reply = res.data.choices[0].message.content.trim();
    api.sendMessage(reply, threadID, messageID);
  } catch (err) {
    console.log("AI Error:", err.message);
  }
};
