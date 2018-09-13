var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

var Headline = require("../models/Headline");

module.exports = {
    //runs scrape function inserts into mongodb
    fetch: function(cb) {
        scrape(function(data) {
            var articles = data;
            for (var i= 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
                cb(err, docs);
            });
        });
    },
    //removes an article
    delete: function(query, cb) {
        Headline.remove(query, cb);
    },
    // gets all the items in the collection
    get: function(query, cb) {
        Headline.find(query)
        .sort({
            _id:-1
        })
        .exec(function(err, doc) {
            cb(doc);
        });
    },
    // updates articles
    update: function(query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}

