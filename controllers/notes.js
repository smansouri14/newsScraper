// brings in note and makeDate function
var Note = require("../models/Note");
var makeDate = require("../scripts/date");

module.exports = {
    // find all notes with the headline id
    get: function(data, cb) {
        Note.find({
            _headlineId: data._id
        }, cb);
    },
    // this allows us to save notes
    save: function(data, cb) {
        var newNote= {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };
        Note.create(newNote, function (err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    //allows us to delete notes on an article
    delete: function(data, cb) {
        Note.remove({
            _id: data._id
        }, cb);
    }
};