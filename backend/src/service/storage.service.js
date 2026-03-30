const  ImageKit = require( "imagekit")

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PublicKey,
    privateKey : process.env.IMAGEKIT_PrivateKey,
    urlEndpoint : process.env.IMAGEKIT_UrlEndpoint
});

async function uploadFile(file,fileName) {
    const response = await imagekit.upload({
        file:file,
        fileName:fileName,
        folder:"AI-Caption-App"
    })
    return response

}
module.exports = uploadFile