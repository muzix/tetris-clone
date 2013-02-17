var LOG = false;
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 960;
var canvas;
var stage;

var bg;

var main;

//preloader
var preload;
var manifest;
var totalLoaded = 0;

$(document).ready(function(){
	//Prevent scrolling
	document.ontouchstart = function(e){ 
	    e.preventDefault(); 
	}
	
	main();
});

function main() {
	canvas = document.getElementById("TetrisCanvas");
	
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	var factor = 1 / window.devicePixelRatio;
	
	canvas.style.width = canvas.width * factor + "px";
	canvas.style.height = canvas.height * factor + "px";
	
	stage = new createjs.Stage(canvas);
	stage.addEventListener("stagemouseup", handleStageMouseUp);
	
	//support older browser with flash fallback sound plugin
	createjs.FlashPlugin.BASE_PATH = "js/soundjs/" // Initialize the base path from this document to the Flash Plugin
	createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.WebAudioPlugin, createjs.FlashPlugin]);  // register the plugins you might use

	//Setup assets to load
    manifest = [
    			{src:"assets/graphics/bg.jpg", id:"bg"},
    			{src:"assets/sounds/bg_sound.mp3|assets/sounds/bg_sound.ogg", id:"bg_sound"}
    		   ];
    		   
	preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("fileload", handleFileLoad);
    preload.addEventListener("complete", handleComplete);
   	preload.loadManifest(manifest);
   	
	//Ticker
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", handleTick);
	
}

function handleTick(event) {
	//do game loop
}

function handleFileLoad(event) {
	if(LOG) alert("handleFileLoad");
	var item = event.item;
	var type = item.type;
	totalLoaded++;
	if(totalLoaded == manifest.length) {
		playBgMusic();
		createMainUI();
	}	
}

function handleComplete(event) {
}

function playBgMusic() {
	if(LOG) alert("playBgMusic");
	//playSound("bg_sound", true);
}

function createMainUI() {
	if(LOG) alert("createMainUI");
	var bgImg = preload.getResult("bg");
	var bgBitmap = new createjs.Bitmap(bgImg);
	stage.addChild(bgBitmap);
	stage.update();
}

function playSound(name, isLoop) {
	var loop = isLoop==true?-1:0;
	createjs.Sound.play(name,createjs.SoundJS.INTERRUPT_NONE,0,0,loop,1,0);
}

function handleStageMouseUp(event) {
	playSound("bg_sound", true);
}
