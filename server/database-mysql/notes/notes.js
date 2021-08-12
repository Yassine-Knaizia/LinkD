const { sql } = require("../config/db");


// Database function to insert new localisation  //
const addNote = async (req) => {
  var query = `INSERT INTO notes (user_id, action_id, note_content, action_sender) values ('${req.user_id}', '${req.action_id}', '${req.note_content}', '${req.action_sender}')`;
  try {
    let note = await sql(query);
    return note;
  } catch(err) {
      console.log(err)
  }
}

// Database function to retrieve all localisations //
const getNotesByUserId = async (action_sender) => {
  var query = `Select * from notes WHERE action_sender=${action_sender}`;
  try {
    let notes = await sql(query);
    return notes;
  } catch(err) {
      console.log(err)
  }
}


module.exports = {
    addNote,
    getNotesByUserId,
}