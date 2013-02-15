var canvas;
var stage;

var bg;

var main;

var tkr = new Object;

//preloader
var preload;
var manifest;
var totalLoaded;

function main() {
	canvas = document.getElementById("TetrisCanvas");
	stage = new createjs.Stage(canvas);
	
	//support older browser with flash fallback sound plugin
	createjs.FlashPlugin.BASE_PATH = "../js/soundjs/" // Initialize the base path from this document to the Flash Plugin
	createjs.SoundJS.registerPlugins([createjs.HTMLAudioPlugin, createjs.FlashPlugin]);  // register the plugins you might use
	if (!createjs.SoundJS.checkPlugin(true)) {
		alert("Error Sound Support");
		return;
	}
	
	preload = new createjs.PreloadJS();
    preload.installPlugin(createjs.SoundJS);
    preload.onFileLoad = handleFileLoad;
    preload.onProgress = handleProgress;
    preload.onComplete = handleComplete;

	//Ticker
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", handleTick);
	
}

function handleTick(event) {
	//do game loop
}

function handleFileLoad(event) {
	
}

function handleProgress(event) {
	
}

function handleComplete(event) {
	
}
