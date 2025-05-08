module.exports.config = {
  name: "challi", // Command for sending challi images
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Send a random challi image", 
  commandCategory: "Image",
  usages: "challi", 
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
  
  // Updated challi image links
  var link = [
    "https://i.imgur.com/XZq7MIg.jpeg",
    "https://i.imgur.com/WPcl78c.jpeg",
    "https://i.imgur.com/I7FN81w.jpeg",
    "https://i.imgur.com/33DfmTu.jpeg"
  ];

  // React with 🌽 emoji
  api.setMessageReaction("🌽", event.messageID, (err) => {}, true);

  // Stylish message before sending the image
  api.sendMessage(
    "𝙊𝙠𝙚𝙮 𝙂! 🌽 𝙇𝙜𝙩𝙖 𝙝𝙮 𝙅𝙣𝙖𝙗 𝙆𝙤 𝘾𝙝𝙖𝙡𝙡𝙞 𝙆𝙖 𝙈𝙤𝙤𝙙 𝙃𝙮! ✨\n\n𝘿𝙚𝙩𝙖 𝙃𝙪 𝙅𝙖𝙣𝙖𝙗 𝙆𝙞 𝙁𝙖𝙧𝙢𝙖𝙞𝙨𝙝 𝙋𝙚! 😍",
    event.threadID,
    () => {
      // Send the image after the message
      var callback = () => api.sendMessage(
        { body: `𝗠𝗔𝗗𝗘 𝗕𝗬 𝗥𝗗𝗫: ${link.length} 𝗖𝗛𝗔𝗟𝗟𝗜 𝗜𝗠𝗔𝗚𝗘𝗦 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘!`, attachment: fs.createReadStream(__dirname + "/cache/1.jpeg") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.jpeg"),
        event.messageID
      );

      // Randomly select a challi image and download it
      return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
        .pipe(fs.createWriteStream(__dirname + "/cache/1.jpeg"))
        .on("close", () => callback());
    }
  );
};
