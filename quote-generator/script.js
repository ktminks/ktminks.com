
$(document).ready(function () {

    const quotes = [
        {
            quote: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
            author: "Thich Nhat Hanh"
        },

        {
            quote: "Respond; don\’t react. Listen; don\’t talk. Think; don\’t assume.",
            author: "Raji Lukkoor"
        },

        {
            quote: "Always hold fast to the present. Every situation, indeed every moment, is of infinite value, for it is the representative of a whole eternity.",
            author: "Johann Wolfgang von Goethe"
        },

        {
            quote: "The way to live in the present is to remember that \‘This too shall pass.\’ When you experience joy, remembering that \‘This too shall pass\’ helps you savor the here and now. When you experience pain and sorrow, remembering that \‘This too shall pass\’ reminds you that grief, like joy, is only temporary.",
            author: "Joey Green"
        },

        {
            quote: "Life is not lost by dying; life is lost minute by minute, day by dragging day, in all the small uncaring ways.",
            author: "Stephen Vincent Benet"
        },

        {
            quote: "The mind in its natural state can be compared to the sky, covered by layers of cloud which hide its true nature.",
            author: "Kalu Rinpoche"
        },

        {
            quote: "Meditation practice isn\’t about trying to throw ourselves away to become something better. It\’s about befriending who we are already.",
            author: "Pema Chodron"
        },

        {
            quote: "Tolerance is always important, it helps us overcome difficulties. Without it, small things irritate us and we overreact.",
            author: "Dalai Lama"
        },

        {
            quote: "Since we are not solely material creatures, it is a mistake to base all our hopes for happiness on external development alone.",
            author: "Dalai Lama"
        },

        {
            quote: "If one were truly aware of the value of human life, to waste it blithely on distractions and the pursuit of vulgar ambitions would be the height of confusion.",
            author: "Dilgo Khyentse Rinpoche"
        },

        {
            quote: "If every 8-year-old in the world is taught meditation, we will eliminate violence from the world in one generation.",
            author: "Dalai Lama"
        },

        {
            quote: "Love is the absence of judgment.",
            author: "Dalai Lama"
        },

        {
            quote: "Our own worst enemy cannot harm us as much as our unwise thoughts. No one can help us as much as our own compassionate thoughts.",
            author: "Buddha"
        },

        {
            quote: "Observe the space between your thoughts, then observe the observer.",
            author: "Hamilton Boudreaux"
        },

        {
            quote: "Each morning we are born again. What we do today is what matters most.",
            author: "Buddha"
        },

        {
            quote: "The basic root of happiness lies in our minds\; outer circumstances are nothing more than adverse or favorable.",
            author: "Matthieu Ricard"
        }
    ];
    let randomNum = 0;
    function setLink() {
        let url = 'https://www.twitter.com/intent/tweet?text=\"' + quotes[randomNum].quote + '\" ' + quotes[randomNum].author;
        $('#tweetMe').attr('href', url);
    };
    //default value
    $('#currentQuote').html('\"' + quotes[0].quote + '\"');
    $('#currentAuthor').html(quotes[0].author);
    setLink();
    //new quote button
    $('#newQuote').click(function () {
        randomNum = Math.floor(Math.random() * (quotes.length));
        $('#currentQuote').html('\"' + quotes[randomNum].quote + '\"');
        $('#currentAuthor').html(quotes[randomNum].author);
        setLink();
    });
});
