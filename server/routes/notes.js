const express = require('express');
const router = express.Router();
const Notes = require("../database-mysql/notes/notes");

router.post('/', function (req, res, next) {
    Notes.addNote(req.body).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.get('/:action_sender', function (req, res, next) {
    Notes.getNotesByUserId(req.query.action_sender).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});


module.exports = router;




