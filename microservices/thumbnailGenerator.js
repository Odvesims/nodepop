'use strict';

const { Responder } = require('cote');
var Jimp = require('jimp');

const responder = new Responder({ name: 'Thumbnail Generator' });

responder.on('make-thumbnail', async (req, done) => {
  const { picture } = req;
  const picturePath = `./public/images/${picture}`;

  Jimp.read(picturePath)
    .then((pictureThumbnail) => {
      pictureThumbnail
        .resize(250, 250)
        .write(`./public/thumbnail-images/thumbnail_${picture}`);
    })
    .catch((err) => {
      console.error(err);
    });
  const result = 'Thumbnail Generated!';
  await done(result);
});
