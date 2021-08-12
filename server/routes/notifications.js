const express = require('express');
const router = express.Router();
const Notifications = require("../database-mysql/notifications/notifications");

router.get('/:VM_supervisor', function (req, res, next) {
    Notifications.getnotificationByVMsupervisor(req.query.VM_supervisor).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.get('/VM_validated/:DSM_supervisor', function (req, res, next) {
    Notifications.getnotificationByDSMsupervisor(req.query.DSM_supervisor).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.get('/VM_validated/DSM_validated/:CDP_supervisor', function (req, res, next) {
    Notifications.getnotificationByCDPsupervisor(req.query.CDP_supervisor).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});


router.post('/action/read/VM_supervisor/:notification_id', function (req, res, next) {
    Notifications.markAsReadVMsupervisorNotification(req.query.notification_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.post('/action/read/DSM_supervisor/:notification_id', function (req, res, next) {
    Notifications.markAsReadDSMsupervisorNotification(req.query.notification_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

router.post('/action/read/CDP_supervisor/:notification_id', function (req, res, next) {
    Notifications.markAsReadCDPsupervisorNotification(req.query.notification_id).then(result => {
        try {
            return res.json(result);
        } catch (err) {
            console.log(err)
        }
    })
});

module.exports = router;




