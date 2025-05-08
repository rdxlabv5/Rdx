module.exports.config = {
  name: "macaroni",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Send a random macaroni image",
  commandCategory: "Image",
  usages: "macaroni",
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
  
  // Links for macaroni images
  var link = [
    "https://i.imgur.com/9yDZc7o.jpeg",
    "https://i.imgur.com/ncv9VvN.jpeg",
    "https://i.imgur.com/ziTqMcO.jpeg",
    "https://i.imgur.com/8OeZLUv.jpeg",
    "https://i.imgur.com/GMPcM6p.jpeg",
    "https://i.imgur.com/4dfAL8b.jpeg",
    "https://i.imgur.com/NbJ4MwP.jpeg"
  ];

  // React with 🍝 emoji
  api.setMessageReaction("🍝", event.messageID, (err) => {}, true);

  // Fun and simple macaroni message
  api.sendMessage(
    "𝗬𝗢𝗨𝗥 𝗠𝗔𝗖𝗔𝗥𝗢𝗡𝗜 𝗜𝗦 𝗛𝗘𝗥𝗘! 🍝\n𝗘𝗡𝗝𝗢𝗬 𝗔 𝗗𝗘𝗟𝗜𝗖𝗜𝗢𝗨𝗦 𝗔𝗡𝗗 𝗖𝗥𝗘𝗔𝗠𝗬 𝗣𝗟𝗔𝗧𝗘 𝗢𝗙 𝗠𝗔𝗖𝗔𝗥𝗢𝗡𝗜! 😋",
    event.threadID,
    () => {
      // Send the image after the message
      var callback = () => api.sendMessage(
        { body: `𝗠𝗔𝗗𝗘 𝗕𝗬 𝗥𝗗𝗫: ${link.length} 𝗠𝗔𝗖𝗔𝗥𝗢𝗡𝗜 𝗜𝗠𝗔𝗚𝗘𝗦 𝗦𝗘𝗥𝗩𝗘𝗗!`, attachment: fs.createReadStream(__dirname + "/cache/1.jpeg") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.jpeg"),
        event.messageID
      );

      // Randomly select a macaroni image and download it
      return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
        .pipe(fs.createWriteStream(__dirname + "/cache/1.jpeg"))
        .on("close", () => callback());
    }
  );
};
