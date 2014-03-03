var playingForeverObject = {};

(function(){
	if (window.localStorage) {
		window.localStorage.playingForever = window.localStorage.playingForever || "{}";
		playingForeverObject = JSON.parse(window.localStorage.playingForever);
	} else {
		console.log('no window.localStorage...we can\'t do nuttin\'');
	}
	if (playingForeverObject.setDone) {
		playingForeverObject.setDone = playingForeverObject.setDone;
	} else {
		Object.defineProperty(playingForeverObject, 'setDone', {
 			set: function(level) {
 				playingForeverObject[level] = 'done';
 				window.localStorage.setItem('playingForever', JSON.stringify(playingForeverObject));
 			}
		});
	}
})();

// set level order
playingForeverObject.levelOrder = ['kittyCatz', 'headz'];

// iterate through the levelOrder array to find the first level that's now completed and load it
playingForeverObject.levelOrder.every(function(val, i){
	if (playingForeverObject[val] !== 'done') {
		// create a new script element for whichever level we're loading
		var newScript = window.document.createElement('script');
		newScript.type = 'text/javascript';
		newScript.src = 'js/' + val + '.js';
		newScript.onload = new Function(val+'()'); // function that calls the function named as the levelOrder val is ('kittyKatz' --> kittyKatz())
		window.document.body.appendChild(newScript);

		return false;
	} else {
		return true;
	}
});