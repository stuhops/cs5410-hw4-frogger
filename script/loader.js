game = {
    route: 'main-menu',

    // ------------- Canvas --------------
    gameHeight: 1024,
    gameWidth: 1024,

    // ---------- Game State -------------
    level: 1,
    levels: 2,
    gameOver: false,
    score: 100,
    checkCollisions: true,
    lives: 3,

    // ---------- Game Vars --------------
    rows: 14,
    obstacles: [],
    guts: [],
    baseTimer: 100000,
    timer: 100000,
    waitTimer: 1000,

    // --------- High Scores -------------
    highScores: ['Unclaimed', 'Unclaimed', 'Unclaimed', 'Unclaimed', 'Unclaimed'],

    // ----------- Controls --------------
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',

    // ------------ Audio ----------------
    audio: {
        win: './assets/win.mp3',
        move: './assets/move.mp3',
        extra: './assets/extra.mp3',
        background: './assets/background.mp3',
        splash: './assets/splash.mp3',
        squash: './assets/squash.mp3',
        time: './assets/time.mp3',
    },

    // ------------ Images ---------------
    assets: {},
};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------

            // 'navigation', 'random', 'particle-system', 'stats', 'initialize', 'settings', 
            // 'collision', 'graphics', 'gameLoop', 'images', 'obstacle', 'road', 'river', 
            // 'land', 'winRow', 'character'
game.loader = (function() {
    'use strict';
    let scriptOrder = [
        {
            scripts: ['navigation'],
            message: 'Navigation Loaded',
            onComplete: null
        }, {
            scripts: ['random'],
            message: 'Random number generator loaded',
            onComplete: null
        }, {
            scripts: ['particle-system', 'stats'],
            message: 'Particle system model loaded',
            onComplete: null
        }, {
            scripts: ['initialize', 'settings', 'collision', 'graphics', 'gameLoop', 'images'],
            message: 'Foundation loaded',
            onComplete: null
        }, {
            scripts: ['obstacle', 'road', 'river', 'land', 'winRow', 'character'],
            message: 'Game Board loaded',
            onComplete: null
        }];
    let assetOrder = [{
            key: 'game_sprites',
            source: '/assets/game_sprites.png'
        }, {
            key: 'alligator_sprites',
            source: '/assets/alligator.png'
        }, {
            key: 'fire',
            source: '/assets/fire.png'
        }, {
            key: 'guts',
            source: '/assets/guts.png'
        },];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.shift();    // Alternatively: scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/.../asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

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

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('It is all loaded up');
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            game.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All game assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );

}());