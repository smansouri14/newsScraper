//require mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//unique makes sure it doesn't scrape the same aricle into the database more than once
var headlineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    },
    link: {
        type: String
    }
});

var Headline = mongoose.model("Headline", headlineSchema);
//export Headline
module.exports = Headline;