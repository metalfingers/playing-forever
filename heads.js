if (window.Shape) {
	var rectArray = [rect = new Shape.Rectangle({
			point: [10, window.innerHeight/2],
			size: [window.innerWidth*2, 100],
			strokeColor: 'black',
			strokeWidth: 1
		})];

	rectArray[0].fillColor = 'green';
	rectArray[0].rotate(-30);

	for (var i = 0; i < 10; i++) {
		rectArray[i] = rectArray[0].clone();
		rectArray[i].position.x -= i * 200;
		rectArray[i].fillColor = 'green';
		console.log(rectArray[i].layer);
		// rectArray.push(newRect);
	};


	rectArray[0].onFrame = function(){
		for (var i = 0; i < rectArray.length; i++) {
			rectArray[i].fillColor.hue += Math.random();
		};
	}

	// function onMouseMove(event){
	// 	for (var i = 0; i < rectArray.length; i++) {
	// 		rectArray[i].position += {x: 1, y: 1};
	// 	};
	// }
}