const ctrl = {};

const request = require('request');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs-extra');
const fsNrm = require('fs');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

let download = async function(uri, filename, callback){
  await request.head(uri, async function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);

    await request(uri).pipe(fsNrm.createWriteStream(filename)).on('close', callback);
  });
};

ctrl.downloadImage = async (req, res) => {
  // if (!req.file) {
  //   const dataPrevious = await User.findOne({ _id: req.user.id });
  //   // console.log(dataPrevious);
  //   if (dataPrevious) {
  //     if (dataPrevious.public_id) {
  //       await cloudinary.v2.uploader.destroy(dataPrevious.public_id);
  //     }
  //   }
  //   await User.findByIdAndUpdate(
  //     { _id: req.user.id },
  //     {
  //       $set: {
  //         foto: fotoDefault,
  //         public_id: null,
  //       },
  //     }
  //   );
  //   res.send(fotoDefault);
  //   return;
  // }
  // const dataPrevious = await User.findOne({ _id: req.user.id }).catch((err) => {
  //   console.log(err, "Error de Busqueda");
  // });

  // console.log(dataPrevious);
  // if (dataPrevious) {
  //   if (dataPrevious.public_id) {
  //     await cloudinary.v2.uploader.destroy(dataPrevious.public_id);
  //   }
  // }
  // console.log(req.file.path);
  if(!req.file) {
    res.send('error');
    return;
  }
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  // await User.findByIdAndUpdate(
  //   { _id: req.user.id },
  //   {
  //     $set: {
  //       foto: result.url,
  //       public_id: result.public_id,
  //     },
  //   }
  // ).catch((err) => console.log(err));
  await fs.unlink(req.file.path);

  // req.user.foto = result.url;
  res.send(result.url);
};

ctrl.downloadImgExtern = async(req, res) => {
  const urlReceived = JSON.parse(req.body.json).fileSrc.replace(/amp;/g, '');
  const ext = '.jpg';
  const fileUrl = uuid.v4();
  const newUrlDownload = path.resolve(`src/public/upload/${fileUrl}${ext}`);
  await download(urlReceived, newUrlDownload, async function(){
    const result = await cloudinary.v2.uploader.upload(newUrlDownload);
    await fs.unlink(newUrlDownload);
    res.send(result.url);
  });
}

module.exports = ctrl;
