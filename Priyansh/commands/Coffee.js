module.exports.config = {
  name: "coffee", // Command for Coffee
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Random Coffee video", // Updated description
  commandCategory: "Video",
  usages: "coffee", // Updated usage
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
    "https://i.imgur.com/azNJD7M.mp4",
    "https://i.imgur.com/umpYZBp.mp4",
    "https://i.imgur.com/TVf3e0L.mp4"
  ];

  // React with ☕ emoji
  api.setMessageReaction("☕", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage("𝗝𝗜 𝗝𝗜 𝗖𝗢𝗙𝗙𝗘𝗘 𝗞𝗔 𝗦𝗛𝗢𝗞 𝗛𝗔𝗜 𝗝𝗡𝗔𝗕 𝗞𝗢 𝗗𝗘𝗧𝗔 𝗛𝗨 𝗖𝗢𝗙𝗙𝗘𝗘", event.threadID, () => {
    // Once the initial message is sent, proceed to send the video
    var callback = () => api.sendMessage(
      { body: `MADE BY RDX: ${link.length}`, attachment: fs.createReadStream(__dirname + "/cache/1.mp4") },
      event.threadID,
      () => fs.unlinkSync(__dirname + "/cache/1.mp4"),
      event.messageID
    );

    // Randomly select a video link and download it
    return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
      .pipe(fs.createWriteStream(__dirname + "/cache/1.mp4"))
      .on("close", () => callback());
  });
};
