'use strict';

const { Requester } = require('cote');

const requester = new Requester({ name: 'Thumbnail Publisher' });

const thumbnailRequester = (picture) => {
  const req = {
    type: 'make-thumbnail',
    picture: picture,
  };
  requester.send(req, (done) => {
    console.log(`transform ${picture} = ${req} ${done}`);
  });
};

module.exports = thumbnailRequester;
