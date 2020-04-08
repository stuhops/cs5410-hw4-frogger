game = {
    assets: {}
};

function initialize() {
    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = 'blob';

            xhr.onload = function() {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                    } else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    asset.onload = function() {
                        window.URL.revokeObjectURL(asset.src);
                    };
                    asset.src = window.URL.createObjectURL(xhr.response);
                    if (onSuccess) { onSuccess(asset); }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }

        xhr.send();
    }

    //
    // Load the random.js code file

    require(
        ['navigation', 'random'],
        function() {        // on success
            console.log('random.js loaded');
            console.log('navigation.js loaded');
            console.log('random number test: ', Random.nextDouble());
        },
        function(error) {   // on failure
            console.log('error: ', error);
        }
    );
    require(
        ['particle-system', 'stats'],
        function() {        // on success
            console.log('particle-system.js loaded');
            console.log('stats.js loaded');
        },
        function(error) {   // on failure
            console.log('error: ', error);
        }
    );
    require(
        ['initialize'],
        function() {        // on success
            console.log('initialize.js loaded');
        },
        function(error) {   // on failure
            console.log('error: ', error);
        }
    );
    require(
        ['settings', 'collision', 'graphics', 'gameLoop', 'images', 'obstacle', 'road', 'river'],
        function() {  // on success
            console.log('settings.js loaded');
            console.log('collision.js loaded');
            console.log('graphics.js loaded');
            console.log('gameLoop.js loaded');
            console.log('images.js loaded');
            console.log('obstacle.js loaded');
            console.log('road.js loaded');
            console.log('river.js loaded');
        },
        function(error) {  // on failure
            console.log('error: ', error);
        }
    );

    //
    // Load the fire.png asset
    loadAsset(
        '../assets/fire.png',
        function(asset) {
            console.log('fire.png loaded');
            console.log('asset: ', asset);
            game.assets['fire'] = asset;
        },
        function(error) {
            console.log('error: ', error);
        }
    );
};
