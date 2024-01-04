const express = require('express');
const router = express.Router();
const API = require('../controllers/api');
const UserAPI = require('../controllers/auth');
const multer = require('multer');

//multer middleware
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname)
    },
});

let upload = multer({
    storage: storage
}).single("image");

router.get('/', API.fetchAllPost);
router.get('/:id', API.fetchPostById);
router.post('/', upload, API.createPost);
router.put('/:id', upload, API.createTribute);
router.patch('/:id', upload, API.updatePost);
router.delete("/:id", API.deletePost);

//this route is to add picture to gallery
router.put('/gallery/:id', upload, API.addPicture);

router.put('/addVisitor/:id', API.addVisitor);
router.put('/createDonation/:id', API.createDonation);

router.post('/register', UserAPI.registerAccount);
router.post('/login', UserAPI.login);
router.get('/userProfile/:username', UserAPI.findUser);
router.patch('/userProfile/:id', UserAPI.updateUser);

module.exports = router;
