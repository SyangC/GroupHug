var s3 = require('./s3');
var multer = require('multer')
var multerS3 = require('multer-s3-transform');
var uuid = require('uuid');
var gm = require('gm');
var sharp = require('sharp');

module.exports = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
   /* contentType: function(req, file, next) {
      next(null, file.mimetype);
    },*/
    shouldTransform: function (req, file, cb) {
         cb(null, /^image/i.test(file.mimetype))
       },
    transforms: [{
        id: 'original',
        key: function (req, file, cb) {
            var ext = '.' + file.originalname.split('.').splice(-1)[0];
            var filename = uuid.v1()+'-orig' + ext;
            cb(null, filename)
        },
        transform: function (req, file, cb) {
            cb(null, sharp().resize(600,600).max())
        }
      }, {
        id: 'thumbnail',
        key: function (req, file, cb) {
          var ext = '.' + file.originalname.split('.').splice(-1)[0];
          var filename = uuid.v1()+'-thumb' + ext;
        cb(null, filename)
        },
        transform: function (req, file, cb) {
        cb(null, sharp().resize(100, 100).max())
        }
      },
      {
        id: 'main',
        key: function (req, file, cb) {
          var ext = '.' + file.originalname.split('.').splice(-1)[0];
          var filename = uuid.v1()+'-main' + ext;
        cb(null, filename)
        },
        transform: function (req, file, cb) {
        cb(null, sharp().resize(400, 400).max())
        }
      }
    ]
  })
});



/*module.exports = multer({
  storage: imager({
    s3:s3,
    dirname: 'thumbnails',
    bucket: process.env.AWS_BUCKET_NAME,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'eu-west-1',
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    key: function(req, file, next) {
          var ext = '.' + file.originalname.split('.').splice(-1)[0];
          var filename = uuid.v1() + ext;
          next(null, filename);

    },
    gm: {
      width: 200,
     /* height: 200,
      options: '!',
      format: 'jpg'
    },
    s3:{
      Metadata:{
        'name': 'grouphugimage'
      }
    }

  })
});
*/
