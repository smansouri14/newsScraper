//require in mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//note schema
var noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String
});

var Note = mongoose.model("Note", noteSchema);
//exports Note model
module.exports = Note;