function isYouTubeUrl(message) {
    const urlRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(\&t=([a-zA-Z0-9_-]+))?$/;
    const youtubeRegex = /^(https?:\/\/)?(www\.)?youtu\.be\/([a-zA-Z0-9_-]+)$/;
  
    return urlRegex.test(message.text) || youtubeRegex.test(message.text);
  }

  module.exports = {
    isYouTubeUrl
  }