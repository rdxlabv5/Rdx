module.exports.config = {
  name: "gulabjamun", // Command for Gulab Jamun
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX_ZAIN",
  description: "Random Gulab Jamun image", // Updated description
  commandCategory: "Image",
  usages: "gulabjamun", // Updated usage
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args, Users, Threads, Currencies }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  
  var link = [
    "https://i.imgur.com/2zn1S6H.jpeg",
    "https://i.imgur.com/tlh1j2W.jpeg",
    "https://i.imgur.com/JrD515M.jpeg",
    "https://i.imgur.com/CWGxFwF.jpeg"
  ];

  // React with 🤤 emoji
  api.setMessageReaction("🤤", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage("𝗝𝗜 𝗝𝗜 𝗚𝗨𝗟𝗔𝗕 𝗝𝗔𝗠𝗨𝗡 𝗞𝗜 𝗕𝗛𝗢𝗢𝗞 𝗟𝗔𝗚 𝗚𝗔𝗘𝗬 𝗛𝗔𝗜 𝗝𝗡𝗔𝗕 𝗞𝗢 𝗗𝗘𝗧𝗔 𝗛𝗨 𝗚𝗨𝗟𝗔𝗕 𝗝𝗔𝗠𝗨𝗡", event.threadID, () => {
    // Once the initial message is sent, proceed to send the image
    var callback = () => api.sendMessage(
      { body: `MADE BY RDX: ${link.length}`, attachment: fs.createReadStream(__dirname + "/cache/1.jpg") },
      event.threadID,
      () => fs.unlinkSync(__dirname + "/cache/1.jpg"),
      event.messageID
    );

    // Randomly select an image link and download it
    return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
      .pipe(fs.createWriteStream(__dirname + "/cache/1.jpg"))
      .on("close", () => callback());
  });
};
