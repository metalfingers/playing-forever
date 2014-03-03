function kittyCatz(){
	var theseDamnCats = [],
			kittyCage = {
				_requestTime: 0,
				_lastUpdate: 0,
				_crayCounter: 0,
				phaseTwo: false,
				crayCount: function(action){ //action can be a timestamp of "reset"...confusing, but ok...i guess
					if (action === "reset") { 
						this._crayCounter = 0; 
					} else if(action !== undefined) {
						this._requestTime = action;
						if (this._requestTime - this._lastUpdate > 50) {
							this._lastUpdate = action;
							this._crayCounter++;
						}
					}
					return this._crayCounter;
				}
			};

	// This dude runs the show. The Cat represents the highest ideals of the Internet
	// 
	function Cat(direction){

		// Make a div of random size, choose one of our 6 cats as the img,
		// create a random animation delay so that they're not all moving at the same time
		this.element = window.document.createElement('div');
		this.catDimensions = Math.floor( Math.random() * (300-10) + 100);

		this.element.classList.add('cat');
		this.element.classList.add(direction);
		this.element.style.width = this.element.style.height = this.catDimensions + 'px';
		this.element.style.backgroundImage = "url('img/cat" + Math.floor( (Math.random() * 6) + 1) + ".png')";
		this.element.style.setProperty('-webkit-animation-delay', ( Math.random() * 10 ) + 's');

		this.mouseMoveStart;
		this.mouseMoveEnd;
		this.lastMouseMovement;

		this.aboutToDisappear = false;

		this.style = this.element.style; // shortcut

	}

	// Add a function to the Cat class so that allows the cat to randomly follow
	// the mouse pointer or not...as a cat does
	Cat.prototype.randoCatMotion = function(num) {
		var followOrIgnore = Math.random() >= 0.3 ? true : false;
		if (followOrIgnore) {
			return num;
		} else {
			return Math.floor( Math.random() * ( window.innerHeight - 0 + 1 ) );
		}
	}

	// Add cats to the DOM
	function addCats(cats, direction){
		for (var i = cats - 1; i >= 0; i--) {
			var thisCat = new Cat(direction);
			if (direction === 'left' || direction === 'right') {
				thisCat.style.top = Math.floor( Math.random() * ( window.innerHeight - 0 + 1 ) ) + 'px';			
			} else if (direction === 'up' || direction === 'down') {
				thisCat.style.left = Math.floor( Math.random() * ( window.innerWidth - 0 + 1 ) ) + 'px';			
			}
			window.document.body.appendChild(thisCat.element);
			theseDamnCats.push(thisCat);
		}
	}


	window.document.addEventListener('mousemove', function(e){

		if (window.document.querySelector('.crazy-bar').classList.contains('cat-invasion-phase-two')) {
			window.document.querySelector('body').style.webkitFilter = 'hue-rotate(' + Math.floor( Math.random() * 359 ) + 'deg)';
			window.document.querySelector('.crazy-bar').style.width = '100%';
			kittyCage.crayCount(e.timeStamp);
			switch (true) {
				case (kittyCage.crayCount() >= 350):
					window.playingForeverObject.setDone('kittyCatz');
					console.log('saved');
					break;
				case (kittyCage.crayCount() >= 300):
					break;
			}
		} else {
			theseDamnCats.forEach(function(cat, i){
				if (e.timeStamp - cat.lastMouseMovement < 500) {
					if (e.timeStamp - cat.lastMouseMovement < 250) {
						kittyCage.crayCount(e.timeStamp);
						window.document.querySelector('.crazy-bar').style.width = kittyCage.crayCount() / 200 * 100 + '%';
						cat.style.webkitAnimation = 'none';
						switch (true) {
							case (kittyCage.crayCount() >= 250):
								cat.style.webkitAnimation = 'zoomAndDisappear 1s forwards';
								if (cat.aboutToDisappear !== true) {
									cat.element.addEventListener('webkitAnimationEnd', function(){
										window.document.body.removeChild(cat.element);
										theseDamnCats.splice(i, 1);
									});
									cat.aboutToDisappear = true;
									window.document.querySelector('.crazy-bar').classList.add('cat-invasion-phase-two');
								};
								break;
							case (kittyCage.crayCount() >= 200):
								window.document.querySelector('body').style.webkitFilter = 'hue-rotate(' + Math.floor( Math.random() * 359 ) + 'deg)';
							case (kittyCage.crayCount() >= 170):
								cat.style.top = cat.randoCatMotion(window.innerHeight /2) - 200 + 'px';
								cat.style.left = cat.randoCatMotion(window.innerWidth/2) - 200 + 'px';
							case (kittyCage.crayCount() >= 150):
								cat.style.webkitAnimation = 'bgRotate .5s linear ' + ( Math.floor(Math.random()*2) ? "alternate-reverse" : "alternate") + ' infinite';
								break;
							case (kittyCage.crayCount() >= 110):
								cat.style.webkitAnimation = 'shakeAndPulseAndRotate .25s linear ' + ( Math.floor(Math.random()*2) ? "alternate-reverse" : "alternate") + ' infinite';
								break;
							case (kittyCage.crayCount() >= 80):
								cat.style.webkitAnimation = 'shakeAndPulse .25s linear infinite';
								break;
							case (kittyCage.crayCount() >= 40):
								cat.style.webkitAnimation = 'shake .25s '+ Math.random()*0.75 + 's linear infinite';
								break;
						}
						if (kittyCage.crayCount() > 20) {
							cat.style.webkitFilter = 'hue-rotate(' + Math.floor( Math.random() * 359 ) + 'deg) drop-shadow(5px 5px 5px #222)';
						}
					}
				} else {
					cat.style.top = cat.randoCatMotion(e.y) + 'px';
					cat.style.left = cat.randoCatMotion(e.x) + 'px'; 
					cat.mouseMoveEnd = e.timeStamp;
					if (kittyCage.crayCount() > 10) {
						console.log('cray killer');
						kittyCage.crayCount('reset'); 
						cat.style.webkitAnimation = 'none';
						cat.style.webkitFilter = 'hue-rotate(0deg) drop-shadow(5px 5px 5px #222)';
						cat.style.webkitTransform = 'rotate(0deg)';
						window.document.querySelector('.crazy-bar').style.width = '0%';
						window.document.querySelector('body').style.webkitFilter = 'hue-rotate(0deg)';
					}
				}
				cat.lastMouseMovement = e.timeStamp;
			});
		}

	});


	window.setInterval(function(){
		window.document.querySelector('body').style.backgroundImage = "url('img/bg" + Math.floor( (Math.random() * 3) + 1) + ".gif')"
	}, 5000);

	addCats(10, 'left');

}