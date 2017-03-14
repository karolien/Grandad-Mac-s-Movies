(function() {
    var instances = plyr.setup({
        // Don't output to console
        debug: false
    });

    // Get an element
    function get(selector) {
        return document.querySelector(selector);
    }

    // Custom event handler
    function on(element, type, callback) {
        if (!(element instanceof HTMLElement)) {
            element = get(element);
        }
        element.addEventListener(type, callback, false);
    }

    // Loop through each instance
    instances.forEach(function(instance) {
        // Play 
        on('.js-play', 'click', function() {
            instance.play();
        });

        //Pause
        on('.js-pause', 'click', function() {
            instance.pause();
        });

        // Fullscreen
        on('.js-fullscreen', 'click', function() {
            instance.play();
            instance.toggleFullscreen();
        });

        // Volume up
        on('.js-louder', 'click', function() {
            var volume = instance.getVolume() * 10;
            if (volume != 10) {
                volume++;
                instance.setVolume(volume);
            }
        });

        // Volume down
        on('.js-quieter', 'click', function() {
            var volume = instance.getVolume() * 10;
            if (volume != 0) {
                volume--;
                instance.setVolume(volume);
            }
        });

        var ul = document.getElementById('movie-list');

        ul.addEventListener('click', function(e) {
            if (e.target.tagName === 'LI') {
                instance.source({
                    sources: [{
                        src: e.target.id,
                        type: 'youtube'
                    }]
                });
                var a_elements = document.getElementsByTagName("li");

                for (var i = 0, len = a_elements.length; i < len; i++) {
                    a_elements[i].className = "not-selected";
                }
                e.target.className = "selected";

                document.getElementById('movie-title').innerHTML = e.target.innerHTML;
            }
        });
    });


})();