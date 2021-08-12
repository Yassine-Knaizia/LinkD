const { sql } = require("../config/db");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

// Database function to insert new client  //
const signupClient = async (req) => {
    var alert = "";
    var hash = bcrypt.hashSync(req.user_password, salt);
    var query = `INSERT INTO users (user_email, user_password) values ('${req.user_email}','${hash}')`;
    try {
        let users = await sql(query);
        return users;
    } catch (err) {
        if(err.code === "ER_DUP_ENTRY") {
            alert = "This adress email is already used please try another email";
            return {alert};
        } else {
            console.log(err);
        }
    }
}

// Database function to login available client  //
const loginClient = async (req) => {
    var assignedPassword = null;
    var alert = "";
    var query = `SELECT * FROM users WHERE user_email='${req.user_email}'`;
    try {
        let user = await sql(query);
        if (user.length) {
            assignedPassword = user[0].user_password;
            if(bcrypt.compareSync(req.user_password, assignedPassword)) {
                return user;
            } else {
                alert = "Please verify your password";
                return {alert};
            }      
        } else {
            alert = "Please verify your email adress";
            return {alert};
        }
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve all clients  //
const getClients = async () => {
    var query = `Select * from users`;
    try {
        let users = await sql(query);
        return users;
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve client by it's ID  //
const getClient = async (user_id) => {
    var query = `Select * from users where user_id='${user_id}'`;
    try {
        let user = await sql(query);
        return user;
    } catch (err) {
        console.log(err)
    }
}

// Database function to retrieve client by it's Email adress  //
const getClientByEmail = async (user_email) => {
    var query = `Select * from users where user_email='${user_email}'`;
    try {
        let user = await sql(query);
        return user;
    } catch (err) {
        console.log(err)
    }
}


// Database function to save client forgot password crendentials  //
const saveClientResetCredentials = async (req) => {
    var query = `UPDATE users Set resetPasswordToken='${req.resetPasswordToken}', resetPasswordExpires='${req.resetPasswordExpires}' WHERE user_email='${req.user_email}'`;
    try {
        let user = await sql(query);
        return user;
    } catch (err) {
        console.log(err)
    }
}

// Database function to update client avatar   //
const updateClientProfile = async (user_id, req) => {
    if(req.user_password) {
        var hash = bcrypt.hashSync(req.user_password, salt);
        var query = `UPDATE users Set user_avatar='${req.user_avatar}', user_password='${hash}' WHERE user_id='${user_id}'`;
        try {
            let user = await sql(query);
            return user;
        } catch (err) {
            console.log(err)
        }
    } else {
        var query = `UPDATE users Set user_avatar='${req.user_avatar}' WHERE user_id='${user_id}'`;
        try {
            let user = await sql(query);
            return user;
        } catch (err) {
            console.log(err)
        } 
    }
}

// Database function to update client password   //
const updateClientPassword = async (req) => {
    const password = req.user_password;
    var hash = await bcrypt.hashSync(password, salt);
    var query = `UPDATE users Set user_password='${hash}', resetPasswordToken='${req.resetPasswordToken}', resetPasswordExpires='${req.resetPasswordExpires}' WHERE user_email='${req.user_email}'`;
    try {
        let user = await sql(query);
        return user;
    } catch (err) {
        console.log(err)
    }
}


// Database function to retrieve client by it's Email adress  //
const getClientByResetPasswordToken = async (resetPasswordToken) => {
    var query = `Select * from users where resetPasswordToken='${resetPasswordToken}'`;
    try {
        let user = await sql(query);
        return user;
    } catch (err) {
        console.log(err)
    }
}



module.exports = {
    signupClient,
    loginClient,
    getClients,
    getClient,
    getClientByEmail,
    getClientByResetPasswordToken,
    saveClientResetCredentials,
    updateClientProfile,
    updateClientPassword,
}