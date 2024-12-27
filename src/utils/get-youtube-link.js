const youtubedl = require('youtube-dl-exec')

const getYoutubeLink = async (url) => {
  // https://www.youtube.com/watch?v=6xKWiCMKKJg
  const videoObj = await youtubedl(url, {
    dumpSingleJson: true,
    format: "best",
    // dumpJson: true,
    // simulate: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    // quality: '22',
    addHeader: ['referer:youtube.com', 'user-agent:googlebot']
  // }).then(output => console.log(output.url))  
  });

  return videoObj.url
}

// getYoutubeLink('https://www.youtube.com/watch?v=6xKWiCMKKJg')

module.exports = {
  getYoutubeLink
}