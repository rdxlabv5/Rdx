module.exports.config = {
  name: "cb", // Short command for biscuits
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Send a random biscuit image",
  commandCategory: "Image",
  usages: "cb",
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
  
  // Updated biscuit image links
  var link = [
    "https://i.imgur.com/gOitKMS.jpeg",
    "https://i.imgur.com/eMVkLtW.jpeg",
    "https://i.imgur.com/J4kA5rd.jpeg",
    "https://i.imgur.com/xphviJE.jpeg",
    "https://i.imgur.com/XMlfVGG.jpeg",
    "https://i.imgur.com/LlMZH92.jpeg",
    "https://i.imgur.com/PvugvaV.jpeg",
    "https://i.imgur.com/ZX361D5.jpeg",
    "https://i.imgur.com/PlsAH1i.jpeg"
  ];

  // React with 🍪 emoji
  api.setMessageReaction("🍪", event.messageID, (err) => {}, true);

  // Stylish message before sending the image
  api.sendMessage(
    "𝙅𝙖𝙣𝙖𝙗! 🍪 𝙇𝙜𝙩𝙖 𝙝𝙖𝙞 𝘼𝙖𝙥𝙠𝙤 𝘽𝙞𝙨𝙘𝙪𝙞𝙩 𝙠𝙖 𝙈𝙤𝙤𝙙 𝙃𝙤 𝙜𝙮𝙖! ✨\n\n𝙇𝙤 𝙅𝙞 𝘼𝙥𝙠𝙖 𝙊𝙧𝙙𝙚𝙧 𝙋𝙚𝙨𝙝 𝙆𝙞𝙮𝙖 𝙟𝙖𝙖 𝙍𝙝𝙖 𝙝𝙖𝙞! 😍",
    event.threadID,
    () => {
      // Send the image after the message
      var callback = () => api.sendMessage(
        { body: `𝗠𝗔𝗗𝗘 𝗕𝗬 𝗥𝗗𝗫: ${link.length} 𝗕𝗜𝗦𝗖𝗨𝗜𝗧𝗦 𝗜𝗠𝗔𝗚𝗘𝗦 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘!`, attachment: fs.createReadStream(__dirname + "/cache/1.jpeg") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.jpeg"),
        event.messageID
      );

      // Randomly select a biscuit image and download it
      return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
        .pipe(fs.createWriteStream(__dirname + "/cache/1.jpeg"))
        .on("close", () => callback());
    }
  );
};
