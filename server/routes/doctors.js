const express = require('express');
const router = express.Router();
const Doctors = require("../database-mysql/doctors/doctors");

// Api to post new doctor to database
router.post('/', function (req, res, next) {
    Doctors.addDoctor(req.body).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve all doctors from database
router.get('/', function (req, res, next) {
    Doctors.getDoctors().then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve all doctors from database
router.get('/VMsupervisors/:user_id', function (req, res, next) {
    Doctors.getDoctorsByVMSupervisor(req.query.user_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve last doctor from database
router.get('/last', function (req, res, next) {
    Doctors.getLastDoctor().then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

// Api to retrieve last doctor from database
router.get('/invited', function (req, res, next) {
    Doctors.getInvitedDoctors(req.query.doctor_name).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});


module.exports = router;