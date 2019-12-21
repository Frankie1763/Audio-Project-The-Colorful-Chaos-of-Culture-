window.onload = init();
var scaleX = window.innerWidth;
var scaleY = window.innerHeight;

function init() {
	console.log("Page Loaded!");
  alert('Move your mouse around slowly and find out the colorful culture of different people!')
}
var xM;
var yM;
var circle = document.getElementById('circle');
var xCenter = scaleX/2;
var yCenter = scaleY/2;
var radius =0.45*scaleY;
// var x= xM-xCenter;
// var y= xM-yCenter;
console.log('center:'+xCenter+' '+yCenter);

var soundArray= [30,60,90,120,150,180,210,240,270,300,330,360]


//circle layout
circle.style.height = radius*2+'px'
circle.style.width = radius*2+'px'
circle.style.borderRadius = radius+'px'
circle.style.marginTop = 0.05*scaleY+'px'
circle.style.marginBottom = 0.05*scaleY+'px'
circle.style.marginLeft = scaleX/2-radius+'px'
circle.style.marginRight = scaleX/2-radius+'px'
//circle layout


function onMouseMove(){
	xM = event.clientX;
	yM = event.clientY;
	// console.log(xM);
	// console.log(yM);
}

// var redPointX = xCenter + radius;
// var redPointY = yCenter;
// var greenPointX = xCenter-250;
// var greenPointY = yCenter-433.01;
// var bluePointX = greenPointX;
// var bluePointY = yCenter+433.01;


function calcDistance(m,n){
	return ((xCenter - m)**2+(yCenter - n)**2)**0.5;
} //distance from the center

function calcAngle(m,n){
	return Math.atan2(m-xCenter,n-yCenter)*180/Math.PI + 180;
}


function changeColor() {

	if (calcDistance(xM,yM)<=radius){
		h= calcAngle(xM,yM);
		l= calcDistance(xM,yM)*0.5/radius*100;
		circle.style.backgroundColor= 'hsl('+h+',100%,'+l+'%)';
	} else {
		circle.style.backgroundColor='black';
	}
	// console.log(h,l);

}

// var v=1;
function changeVolume() {
	if (calcDistance(xM,yM)<=radius && calcDistance(xM,yM)> 30) {
		for (var i = 0; i < 12; i++) {
			var v = (calcDistance(xM,yM)+50)/(radius+50);
			if (Math.abs(calcAngle(xM,yM)-soundArray[i])>15) {
				v = v/20;
			}
			if (calcAngle(xM,yM)<15&&i==11) {
				v=  (calcDistance(xM,yM)+50)/(radius+50)//deal with the angle in (0,15)
			}
			// document.getElementById(''+i).volume =v;
			fade(i,v);
		};
	} else {
		for (var i = 0; i < 12; i++) {
			var v = 0.2;
			fade(i,v);
		}
	}
};

var fadeEffects=[];
var intervalTime = 50;


function fade(i,v) {
	console.log(i);
	var volume = document.getElementById(''+i).volume
	clearInterval(fadeEffects[i]);
	fadeEffects[i] = setInterval( function(){
		if (volume < v) {
			volume += 0.05;
			if (volume > v) {
				volume = v;
				clearInterval(fadeEffects[i]);  // ***
			}
		} else {
			volume -= 0.05;
			if (volume < v) {
				volume = v;
				clearInterval(fadeEffects[i]);
			}
		}
		// console.log('volume:'+volume);
		document.getElementById(''+i).volume = volume;
	},intervalTime );
};


// function fadeOut() {
// 	// clear the previous effect first
// 	clearInterval(fadeEffect);
// 	// and apply a new effect
// 	fadeEffect = setInterval( function(){
// 		volume -= 0.05;
// 		if (volume < 0.0) {
// 			volume = 0.0;
// 			clearInterval(fadeEffect);  // ***
// 		}
// 		player.volume = volume;
// 	}, intervalTime );
// }

function playAudio() {
	for (var i = 0; i < 12; i++) {
		document.getElementById(''+i).play()
	}
}
