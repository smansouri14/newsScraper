//require in request and cheerio
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    //request to NY times website
    request("https://www.nytimes.com/section/smarter-living?pagetype=Homepage&action=click&module=Smarter%20Living", function(err, res, body){
        var $ = cheerio.load(body);

        //array of articles
        var articles = [];

        // select each theme summary and on each grab the text 
        $(".story-body").each(function(i, element){
            var head = $(this).children(".story-link").children(".story-meta").children(".headline").text().trim();
            var sum = $(this).children(".story-link").children(".story-meta").children(".summary").text().trim();
            var url = $(this).children(".story-link").attr("href");


            // if they exists replace regex
            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dateToAdd = {
                    headline: headNeat,
                    summary: sumNeat,
                    link: url
                };
                console.log(dateToAdd);
                articles.push(dateToAdd);
            }
        });
        console.log("hello");
                cb(articles);
    });
};

module.exports = scrape;