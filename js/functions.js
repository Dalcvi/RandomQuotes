let quotesArray;
const url = "https://api.quotable.io/random";

const colors = [
    "#6598eb", "#3b7fed",
    "#6eeba0", "#39e67e",
    "#cad95d", "#c6db2e",
    "#6b3857", "#691447",
    "#b57a43", "#b36319",
    "#7142c2", "#5b21bf"
];

document.addEventListener("DOMContentLoaded", function () {
    getQuotes().then(() => {
        changeEverything();
        document.getElementById("new-quote").addEventListener("click", changeEverything);
    });
});




function changeEverything() {
    let id = Math.floor(Math.random() * (colors.length));
    let randomQuote = quotesArray.quotes[Math.floor(Math.random() * (quotesArray.quotes.length))];
    $("#tweet-button").attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&text=" + randomQuote.quote + " -" + randomQuote.author);
    $("#tumblr-button").attr("href", "https://www.tumblr.com/widgets/share/tool?posttype=quote&caption=" + randomQuote.author + "&content=" + randomQuote.quote + "&canonicalUrl=http%3A%2F%2Fgoogle.com&shareSource=tumblr_share_button");


    $(".button").animate(
        {
            backgroundColor: colors[id]
        },
        { duration: 1000, easing: "linear", queue: false })


    $("#quote-text, #quote-author").animate({
        color: colors[id][0],
        opacity: 0,
    }, 500, function () {
        $("#text").html(randomQuote.quote);
        $("#author").html(randomQuote.author);
        $(this).animate({
            color: colors[id],
            opacity: 1,
        }, 500);
    });

    $("body").animate(
        {
            backgroundColor: colors[id]
        },
        { duration: 1000, easing: "linear" });
}

function getQuotes() {
    return $.ajax({
        headers: {
            Accept: 'application/json'
        },
        url:
            'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') {
                quotesArray = JSON.parse(jsonQuotes);
            }
        }
    });
}

