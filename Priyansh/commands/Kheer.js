module.exports.config = {
  name: "kheer",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Send a random kheer image",
  commandCategory: "Image",
  usages: "kheer",
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
  
  // Updated links for kheer images
  var link = [
    "https://i.imgur.com/VaWTVV6.jpeg",
    "https://i.imgur.com/neSkTw7.jpeg",
    "https://i.imgur.com/tniZRN2.jpeg",
    "https://i.imgur.com/E4FW5iX.jpeg",
    "https://i.imgur.com/uVM5sVQ.jpeg"
  ];

  // React with ❤️ emoji
  api.setMessageReaction("❤️", event.messageID, (err) => {}, true);

  // Sweet and loving message
  api.sendMessage(
    "𝗔𝗥𝗘𝗬 𝗪𝗔𝗛! ❤️\n𝗠𝗜𝗧𝗛𝗔𝗔 𝗦𝗘 𝗣𝗬𝗔𝗥 𝗞𝗔 𝗠𝗢𝗢𝗗 𝗛𝗢 𝗚𝗬𝗔 𝗛𝗔𝗜! 🥰\n𝗔𝗕𝗛𝗜 𝗔𝗔𝗥𝗛𝗜 𝗛𝗔𝗜 𝗝𝗔𝗡𝗔𝗕 𝗞𝗘 𝗟𝗜𝗬𝗘 𝗞𝗛𝗘𝗘𝗥, 𝗗𝗘𝗞𝗛𝗘𝗡 𝗔𝗨𝗥 𝗘𝗡𝗝𝗢𝗬 𝗞𝗔𝗥𝗘𝗡! 🍨",
    event.threadID,
    () => {
      // Send the image after the message
      var callback = () => api.sendMessage(
        { body: `𝗠𝗔𝗗𝗘 𝗕𝗬 𝗥𝗗𝗫: ${link.length} 𝗞𝗛𝗘𝗘𝗥 𝗜𝗠𝗔𝗚𝗘𝗦 𝗛𝗘𝗥𝗘!`, attachment: fs.createReadStream(__dirname + "/cache/1.jpeg") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.jpeg"),
        event.messageID
      );

      // Randomly select a kheer image and download it
      return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
        .pipe(fs.createWriteStream(__dirname + "/cache/1.jpeg"))
        .on("close", () => callback());
    }
  );
};
