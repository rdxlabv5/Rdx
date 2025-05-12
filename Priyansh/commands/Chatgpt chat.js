const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
  name: "ai-autoreply",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Modified by ChatGPT from original by 𝑱𝑼𝑳𝑴𝑰 𝑱𝑨𝑨𝑻",
  description: "Auto reply to every message using OpenAI",
  commandCategory: "chatbots",
  usages: "Just send any message and get auto-reply",
  cooldowns: 0,
  dependencies: {}
};

async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID]?.name || "User";
  } catch (error) {
    console.log("Name Fetch Error:", error.message);
    return "User";
  }
}

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body } = event;

  if (!body || senderID === api.getCurrentUserID()) return;

  api.sendTypingIndicator(threadID, true);

  const apiKey = "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";
  const url = "https://api.openai.com/v1/chat/completions";

  const userName = await getUserName(api, senderID);
  const currentTime = moment().tz("Asia/Kolkata").format("MMM D, YYYY - hh:mm A");

  const systemPrompt = `You are a friendly and helpful Messenger chatbot that responds to users politely. The current time is ${currentTime}.`;

  try {
    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `${body}` }
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
    console.error("OpenAI Error:", error.response?.data || error.message);
    api.sendMessage("Sorry, I couldn't respond due to an internal error.", threadID);
  }
};

module.exports.run = () => {};
