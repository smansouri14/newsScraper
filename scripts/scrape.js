//require in request and cheerio
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    //request to NY times website
    request("http://www.nytimes.com", function(err, res, body){
        var $ = cheerio.load(body);

        //array of articles
        var articles = [];

        //select each theme summary and on each grab the text 
        $(".theme-summary").each(function(i, element){
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();

            // $(".css-249qw6").each(function(i, element){
            //     var head = $(this).children(".css-8uvv5f.esl82me1").text().trim();
            //     var sum = $(this).children(".css-ba1f3o.e1n8kpyg0").text().trim();

            // if they exists replace regex
            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dateToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dateToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;