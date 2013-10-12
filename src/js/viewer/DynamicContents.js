var __loading = '<div class="bubblingG">'
                + '    <span id="bubblingG_1">'
                + '    </span>'
                + '    <span id="bubblingG_2">'
                + '    </span>'
                + '    <span id="bubblingG_3">'
                + '    </span>'
                +'</div>';

function loading(el) {
    var spinner = document.createElement('p');
    spinner.innerHTML = __loading;
    el.appendChild(spinner.firstElementChild);
}

function getGist(el, id, file) {
    loading(el.parentElement);

    $.ajax({
        url: 'https://gist.github.com/'+ id +'.json',
        data: {
            file: file || ''
        },
        dataType: 'jsonp',
        success: function(gist) {
            loadCss(gist.stylesheet);
            $(el).parent().html(gist.div);
        }
    });
}

function getTweet(el, id) {
    loading(el.parentElement);

    $.ajax({
        url: 'https://syndication.twimg.com/tweets.json',
        data: {
            ids: id,
            lang: 'en',
            suppress_response_codes: true
        },
        dataType: 'jsonp',
        success: function(tweet) {
            var parent, hasStats;
            parent = el.parentElement;

            parent.innerHTML = tweet[id];
            hasStats = parent.querySelectorAll('.footer .stats-narrow')[0];
            // hasStats = parent.find('.footer .stats-narrow')[0];

            if (!hasStats) {
                parent.querySelectorAll('.footer')[0].remove();
            }
        }
    });
}

function getSlideShare(el, user, id) {
    loading(el.parentElement);

    $.ajax({
        url: 'http://www.slideshare.net/api/oembed/2',
        data: {
            url: 'http://www.slideshare.net/'+ user +'/'+ id,
            format: 'json'
        },
        dataType: 'jsonp',
        success: function(slideshow) {
            var parent, hasStats;
            parent = el.parentElement;

            parent.innerHTML = slideshow['html'];
            // hasStats = parent.querySelectorAll('.footer .stats-narrow')[0];
            // hasStats = parent.find('.footer .stats-narrow')[0];

            // if (!hasStats) {
            //     parent.querySelectorAll('.footer')[0].remove();
            // }
        }
    });
}

function getFlickr(el, user, id) {
    loading(el.parentElement);

    $.ajax({
        url: 'http://www.flickr.com/services/oembed.json',
        data: {
            url: 'http://www.flickr.com/photos/'+ user +'/'+ id
        },
        dataType: 'jsonp',
        success: function(photo) {
            var parent, hasStats;
            parent = el.parentElement;

            parent.innerHTML = '<img src="'+ photo['url'] +'">';
            // hasStats = parent.querySelectorAll('.footer .stats-narrow')[0];
            // hasStats = parent.find('.footer .stats-narrow')[0];

            // if (!hasStats) {
            //     parent.querySelectorAll('.footer')[0].remove();
            // }
        }
    });
}