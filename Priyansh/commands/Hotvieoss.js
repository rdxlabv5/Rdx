/** don't change credits please **/
module.exports.config = {
  name: "hv", // Lowercase so command works correctly
  version: "1.0.0",
  hasPermssion: 0,
  credits: "LOCKED ITZ AADI BROKEN",
  description: "Send hot video",
  commandCategory: "Image",
  usages: "hv",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];

  // Custom message before sending video
  api.sendMessage("Yarr TU buht thrki hy baaz nhi aye ga sudhr ja Kuch nhi RAKHA en kamo me LEH KR RHA hu video send", event.threadID);

  // React with 🥵 emoji
  api.setMessageReaction("🥵", event.messageID, (err) => {}, true);

  // Video links
  var link = [
    "https://drive.google.com/uc?id=1a7XsNXizFTTlSD_gRQwK4bDA3HPam56W",
    "https://drive.google.com/uc?id=1aF6H24ILE6wIFGW3M3BGXg8l63ktP8B3",
    "https://drive.google.com/uc?id=1_ysGMbGZQexheta6tuSBhJQDeAMioXr_",
    "https://drive.google.com/uc?id=1bTwYfovA2YKCs_kskWyp2GHh7K9XHQN0",
    "https://drive.google.com/uc?id=1bPdkmq6lKm8BGwxkWaADHe0kutTtEujR",
    "https://drive.google.com/uc?id=1b_evUu8zmfiPs-CeaZp1DkkArB5zl5x-",
    "https://drive.google.com/uc?id=1brkBa03NdRCx6lfrjopbWJUCoJupCRYg",
    "https://drive.google.com/uc?id=1c6SCqToTZamfuiiz5LrckOxDYT9gnJGu",
    "https://drive.google.com/uc?id=1bv8GL0XDReocf1NfZBMCNoMAsBBwDE1i",
    "https://drive.google.com/uc?id=1c01XFZFNYRi_harhEbPvf-i25QIo9c0V",
    "https://drive.google.com/uc?id=1bs5sI8NDRVK_omefR59how1UjZ6TEu91",
    "https://drive.google.com/uc?id=1bcIoyM9T_wQlaXxar4nVjCXsKHavRmnb",
    "https://drive.google.com/uc?id=1boVaYpbxIH3RItPY6k0Ld2F98YasHVq9",
    "https://drive.google.com/uc?id=1c5YXcgK3kOx6bTfVjxNGGMdDYbGmVInC",
    "https://drive.google.com/uc?id=1c1OHfuq-YBOO-UwO5uybPqO7gOqTwInp",
    "https://drive.google.com/uc?id=1jsoQ4wuRdN6EP6jOE3C0L6trLZmoPI0L",
    "https://drive.google.com/uc?id=1jr4YzPNCTOj_lfdOSnauXfTPJkbuqS3f",
    "https://drive.google.com/uc?id=1tlon-avneE7lQF2rS13GOeiuLWIUEA7J",
    "https://drive.google.com/uc?id=1tqaCw0vfG2zJDijgsFF2UTlOB-EmI4SZ",
    "https://drive.google.com/uc?id=1ta1ujBjmcvxSuYVwQ3oEXIJsnPCW2VZO",
    "https://drive.google.com/uc?id=1svD1h3vEYbwxMeU5v4c2wQPBaU90fcEx",
    "https://drive.google.com/uc?id=1seUwXvoVFyCzOA5SykF9uxhlwuwLzPn0",
    "https://drive.google.com/uc?id=1t2oFQmOtw-6V_ahWzYo08v1g2oGnkhPL"
  ];

  // Send video from random link
  const videoPath = __dirname + "/cache/hv.mp4";
  const chosenLink = link[Math.floor(Math.random() * link.length)];

  const callback = () => api.sendMessage({
    body: "ya LY pkr video mar LY muth",
    attachment: fs.createReadStream(videoPath)
  }, event.threadID, () => fs.unlinkSync(videoPath), event.messageID);

  return request(encodeURI(chosenLink))
    .pipe(fs.createWriteStream(videoPath))
    .on("close", () => callback());
};
