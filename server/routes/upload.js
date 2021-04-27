const router = require("express").Router();
const multer = require('multer')
const fs =require("fs")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, ''))
  }
})
let upload = multer({ storage: storage })

const storageSd = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/images/avatar')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, ''))
  }
})
let uploadSd = multer({ storage: storageSd })

router.post('/', upload.single('file'), function (req) {
  const { file } = req
  console.log(file)
})
router.post('/avatar', uploadSd.single('file'), function (req) {
  const { file } = req
  console.log(file)
})

router.delete("/avatar/:name" , (req,res) => { 
    fs.unlink(
        `../client/public/images/avatar/${req.params.name}`,
        err => {
          if (err) {
            throw err
          }
          console.log('File is deleted.')
        }
      )
})

module.exports = router