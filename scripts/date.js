var makeDate = function() {
    var d = new Date();
    var formattedDate = "";


    //add 1 because it starts dates at 0
    formattedDate += (d.getMonth() + 1) + "_";

    formattedDate += d.getDate() + "_";

    formattedDate += d.getFullYear();

    return formattedDate;

};

module.exports = makeDate;