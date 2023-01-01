javascript:
!(function () {
	var textCanvas = document.createElement("canvas");
	textCanvas.width=1000;
	textCanvas.height=300;
	var textctx = textCanvas.getContext("2d");
	textctx.fillStyle = "#000000";
	textctx.fillRect(0,0,textCanvas.width,textCanvas.height);

	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);

	canvas.style.position= "fixed";
	canvas.style.left = "0";
	canvas.style.top = "0";
	canvas.style.zIndex = -1;

	var context = canvas.getContext("2d");

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		clearCanvas();
	}

	function clearCanvas() {
		context.fillStyle = "#000000";
		context.fillRect(0, 0, canvas.width, canvas.height);
	}

	resizeCanvas();

	window.addEventListener("resize", resizeCanvas);


	function mouseDownHandler(e) {
		var x = e.clientX;
		var y = e.clientY;

		createFireworks(x, y,["刘志燕"][Math.floor(Math.random()*3)]);
	}
	document.addEventListener("mousedown", mouseDownHandler);

	var particles = [];

	function createFireworks(x, y,text="") {

		var hue = Math.random() * 360;
		var hueVariance = 30;

		function setupColors(p){
			p.hue = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
			p.brightness = Math.floor(Math.random() * 21) + 50;
			p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;
		}

		if(text!=""){
			
			var gap = 6;
			var fontSize = 120;

			textctx.font=fontSize+"px Verdana";
			textctx.fillStyle = "#ffffff";
			
			var textWidth = textctx.measureText(text).width;
			var textHeight = fontSize;
			
			textctx.fillText(text,0,textHeight);
			var imgData = textctx.getImageData(0,0,textWidth,textHeight*1.2);
			
			textctx.fillStyle = "#000000";
			textctx.fillRect(0,0,textCanvas.width,textCanvas.height);

			for (var h = 0; h < textHeight*1.2; h+=gap) {
			    for(var w = 0; w < textWidth; w+=gap){
			            var position = (textWidth * h + w) * 4;
			            var r = imgData.data[position], g = imgData.data[position + 1], b = imgData.data[position + 2], a = imgData.data[position + 3];
			    
			    		if(r+g+b==0)continue;

			            var p = {};

						p.x = x;
						p.y = y;

						p.fx = x + w - textWidth/2;
						p.fy = y + h - textHeight/2;

						p.size = Math.floor(Math.random()*2)+1;
						p.speed = 0.5;

						setupColors(p);

						particles.push(p);
			    }
			}
		}else{
			var count = 100;
			for (var i = 0; i < count; i++) {
				//角度
				var angle = 360 / count * i;
				//弧度
				var radians = angle * Math.PI / 180;

				var p = {};

				p.x = x;
				p.y = y;
				p.radians = radians;
				
				//大小
				p.size = Math.random()*2+1;

				//速度
				p.speed = Math.random()*5+.4;

				//半径
				p.radius = Math.random()*81+50;

				p.fx = x + Math.cos(radians) * p.radius;
				p.fy = y + Math.sin(radians) * p.radius;

				setupColors(p);

				particles.push(p);
			}
		}
	}
	function drawFireworks() {
		clearCanvas();

		for (var i = 0; i < particles.length; i++) {
			var p = particles[i];

			p.x += (p.fx - p.x)/10;
			p.y += (p.fy - p.y)/10-(p.alpha-1)*p.speed;

			p.alpha -= 0.006;

			if (p.alpha<=0) {
				particles.splice(i, 1);
				continue;
			}

			context.beginPath();
			context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
			context.closePath();

			context.fillStyle = 'hsla('+p.hue+',100%,'+p.brightness+'%,'+p.alpha+')';
			context.fill();
		}
	}

	//requestAnimationFrame
	var lastStamp = 0;
	function tick(opt=0) {
		if(opt-lastStamp>2000){
			lastStamp=opt;
			createFireworks(Math.random()*canvas.width,Math.random()*canvas.height);
		}

		context.globalCompositeOperation = 'destination-out';
		context.fillStyle ='rgba(0,0,0,'+10/100+')';
		context.fillRect(0,0,canvas.width,canvas.height);
		context.globalCompositeOperation = 'lighter';

		drawFireworks();

		requestAnimationFrame(tick);
	}
	tick();
	
	function musicPlay(isPlay) {
		var media = document.querySelector('#audioDom');
		if (isPlay && media.paused) {
			media.play();
		}
		if (!isPlay && !media.paused) {
			media.pause();
		}
	}

	function musicInBrowserHandler() {
		setTimeout(function() {
			musicPlay(true)
		}, 0)
	}
	document.body.addEventListener('touchstart', musicInBrowserHandler);
	document.body.addEventListener('click', ()=>{
		setTimeout(() => {
			function audioAutoPlay() {
				var audio = document.getElementById('audioDom');
				audio.play();
			}
			audioAutoPlay();
		}, 800) // 
		setTimeout(()=>{
			audioPlay()
		},0)
		function audioPlay() {
			var media = document.querySelector('#audioPlay');
			console.log(media.paused);
			if (media.paused) {
				media.play();
			}
			if (!media.paused) {
				media.pause();
			}
			console.log(media.paused);
		}
	});

	function fireworks() {
		document.querySelector('.page_one').addClass('hide');
		document.querySelector('.page_two').removeClass('hide');
	}

	function start() {
		let str = document.querySelector("#text").html(); //"于我而言，你是最好且是唯一"
		let str_ = ''
		let i = 0
		let content = document.getElementById('contents')
		let timer = setInterval(() => {
			if (str_.length < str.length) {
				str_ += str[i++]
				content.innerHTML = '<p>' + str_ + '<span class="xx" style="opacity: 1;    color: white;">∎</span></p>' //打印时加光标
			} else {
				clearInterval(timer)
				content.innerHTML = '<p>' + str_ + '</p>'
			}
		}, 100)
	}
})();