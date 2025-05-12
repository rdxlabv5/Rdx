const axios = require("axios");
const moment = require("moment-timezone");

let chatOn = false; // Auto-reply initially OFF

module.exports.config = {
  name: "ai-autoreply",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Modified by ChatGPT",
  description: "Auto-reply with On/Off control",
  commandCategory: "chatbots",
  usages: "[on/off]",
  cooldowns: 0,
  dependencies: {}
};

async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID]?.name || "User";
  } catch {
    return "User";
  }
}

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body } = event;

  if (!chatOn || !body || senderID === api.getCurrentUserID()) return;

  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";
  api.sendTypingIndicator(threadID, true);

  const userName = await getUserName(api, senderID);
  const currentTime = moment().tz("Asia/Kolkata").format("MMM D, YYYY - hh:mm A");

  const systemPrompt = `You are a helpful Messenger chatbot. Respond politely and clearly. Current time: ${currentTime}`;

  try {
    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: body }
        ],
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0
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
  } catch (error) {
    console.log("OpenAI API Error:", error.message);
    // No need to send user any error message
  }
};

// Command to turn ON/OFF the auto-reply manually
module.exports.run = async function ({ api, event, args }) {
  const input = args[0]?.toLowerCase();

  if (input === "on") {
    chatOn = true;
    return api.sendMessage("✅ Auto-reply has been *enabled*.", event.threadID, event.messageID);
  }

  if (input === "off") {
    chatOn = false;
    return api.sendMessage("❌ Auto-reply has been *disabled*.", event.threadID, event.messageID);
  }

  return api.sendMessage("Please use: `ai-autoreply on` or `ai-autoreply off`", event.threadID, event.messageID);
};
