module.exports.config = {
  name: "dahibhalay", // Command for Dahi Bhalay
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Random Dahi Bhalay image", // Updated description
  commandCategory: "Image",
  usages: "dahibhalay", // Updated usage
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
    "https://i.imgur.com/sWb7pt7.jpeg",
    "https://i.imgur.com/jzb4TtA.jpeg",
    "https://i.imgur.com/hHuD53A.jpeg",
    "https://i.imgur.com/lDZ5rZw.jpeg"
  ];

  // React with 😋 emoji
  api.setMessageReaction("😋", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage(
    "𝗩𝗔𝗛! 𝗗𝗔𝗛𝗜 𝗕𝗛𝗔𝗟𝗔𝗬 𝗞𝗔 𝗔𝗦𝗟 𝗦𝗪𝗔𝗗 🤤\n𝗜𝗦𝗞𝗘 𝗕𝗜𝗡𝗔 𝗭𝗜𝗡𝗗𝗔𝗚𝗜 𝗔𝗗𝗛𝗨𝗥𝗜 𝗛𝗔𝗜! 𝗟𝗢 𝗝𝗡𝗔𝗕, 𝗔𝗕 𝗜𝗡𝗝𝗢𝗬 𝗞𝗜𝗝𝗘!",
    event.threadID,
    () => {
      // Once the initial message is sent, proceed to send the image
      var callback = () => api.sendMessage(
        { body: `MADE BY RDX: ${link.length}`, attachment: fs.createReadStream(__dirname + "/cache/1.jpeg") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.jpeg"),
        event.messageID
      );

      // Randomly select an image link and download it
      return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
        .pipe(fs.createWriteStream(__dirname + "/cache/1.jpeg"))
        .on("close", () => callback());
    }
  );
};
