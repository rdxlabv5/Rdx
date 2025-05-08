module.exports.config = {
  name: "juice", // Command for Juice
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX",
  description: "Random Juice videos", 
  commandCategory: "Video",
  usages: "juice", 
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
    "https://i.imgur.com/XoJBte0.mp4",
    "https://i.imgur.com/6MXjTBn.mp4",
    "https://i.imgur.com/kHWScEj.mp4",
    "https://i.imgur.com/xTU0lg4.mp4",
    "https://i.imgur.com/ySqhZb4.mp4",
    "https://i.imgur.com/HmIIJNL.mp4"
  ];

  // React with 🧃 emoji
  api.setMessageReaction("🧃", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage(
    "𝗢𝗸𝗲𝘆! 𝗝𝘂𝗶𝗰𝗲 𝗸𝗮 𝗺𝗼𝗼𝗱 𝗵𝗮𝘆, 𝗮𝗯𝗵𝗶 𝗵𝗮𝘇𝗶𝗿 𝗸𝗮𝗿 𝗸𝗲 𝗱𝗲𝘁𝗮 𝗵𝘂𝗻 🧃🍊",
    event.threadID,
    () => {
      // Once the initial message is sent, proceed to send the video
      var callback = () => api.sendMessage(
        { body: `MADE BY RDX: ${link.length}`, attachment: fs.createReadStream(__dirname + "/cache/1.mp4") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.mp4"),
        event.messageID
      );

      // Randomly select a link and download it
      return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
        .pipe(fs.createWriteStream(__dirname + "/cache/1.mp4"))
        .on("close", () => callback());
    }
  );
};
