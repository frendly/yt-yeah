const youtubedl = require('youtube-dl-exec');

const props = {
    dumpSingleJson: true,
    format: "best",
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    addHeader: ['referer:youtube.com', 'user-agent:googlebot']
};

const getYoutubeLink = (url) => {
  // https://www.youtube.com/watch?v=6xKWiCMKKJg
  const response = youtubedl(url, props);

  return response.url
}

// const url = getYoutubeLink('https://www.youtube.com/watch?v=6xKWiCMKKJg')


module.exports = {
  getYoutubeLink
}
