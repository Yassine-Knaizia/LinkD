const express = require('express');
const router = express.Router();
const Notes = require("../database-mysql/notes/notes");

module.exports = function (io) {
    // Api to push new notification to database
    router.post('/api/notifications', function (req, res, next) {
        Notes.addNote(req.body).then(result => {
            try {
                if (result) {
                    io.on("connection", (socket) => {
                        console.log("User connected")
                    });
                    setTimeout(() => {io.sockets.emit("NOTES", req.body)},2000);
                    return res.json(result);
                }
            } catch (err) {
                console.log(err)
            }
        })
    });
    return router;
};








