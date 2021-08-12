const { sql } = require("../config/db");


// Database function to insert new notification  //
const pushNotification = async (req) => {
    var query = `INSERT INTO notifications (notification_name, notification_sender, notification_VM_supervisor, notification_DSM_supervisor, notification_CDP_supervisor, recieved_since) values ('${req.notification_name}', ${req.notification_sender}, ${req.VM_supervisor}, ${req.DSM_supervisor}, ${req.CDP_supervisor}, '${req.recieved_since}')`;
    try {
        let notification = await sql(query);
        return notification;
    } catch (err) {
        console.log(err)
    }
}

// Database function to mark as read VM notification  //
const markAsReadVMsupervisorNotification = async (notification_id) => {
    var query = `UPDATE notifications SET markAsRead_VM_supervisor=1 WHERE notification_id=${notification_id}`;
    try {
        let notification = await sql(query);
        return notification;
    } catch (err) {
        console.log(err)
    }
}

// Database function to mark as read DSM notification  //
const markAsReadDSMsupervisorNotification = async (notification_id) => {
    var query = `UPDATE notifications SET markAsRead_DSM_supervisor=1 WHERE notification_id=${notification_id}`;
    try {
        let notification = await sql(query);
        return notification;
    } catch (err) {
        console.log(err)
    }
}

// Database function to mark as read CDP notification  //
const markAsReadCDPsupervisorNotification = async (notification_id) => {
    var query = `UPDATE notifications SET markAsRead_CDP_supervisor=1 WHERE notification_id=${notification_id}`;
    try {
        let notification = await sql(query);
        return notification;
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve all notifications //
const getnotifications = async () => {
    var query = `Select * from notifications`;
    try {
        let notifications = await sql(query);
        return notifications;
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve all VM notifications //
const getnotificationByVMsupervisor = async (VM_supervisor) => {
    var query = `Select * from notifications where notification_VM_supervisor='${VM_supervisor}'`;
    try {
        let notifications = await sql(query);
        return notifications;
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve all DSM notifications //
const getnotificationByDSMsupervisor = async (DSM_supervisor) => {
    var query = `Select * from notifications where notification_DSM_supervisor='${DSM_supervisor}'`;
    try {
        let notifications = await sql(query);
        return notifications;
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve all CDP notifications //
const getnotificationByCDPsupervisor = async (CDP_supervisor) => {
    var query = `Select * from notifications where notification_CDP_supervisor='${CDP_supervisor}'`;
    try {
        let notifications = await sql(query);
        return notifications;
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    pushNotification,
    getnotifications,
    getnotificationByVMsupervisor,
    getnotificationByDSMsupervisor,
    getnotificationByCDPsupervisor,
    markAsReadVMsupervisorNotification,
    markAsReadDSMsupervisorNotification,
    markAsReadCDPsupervisorNotification
}