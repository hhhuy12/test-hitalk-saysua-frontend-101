var viewPort = document.getElementById('viewport');
var items = [
	'Carol Cleva Bell',
	'Nicol Maxima Bell',
	'Ethel Barrie Bell',
	'Mariel Brenda Bell',
	'Gabriel Celina Bell (Sena)',
	'Isabel Marcelina Bell',
	'Anuja Rihanna Bell',
	'Meryl Ryana Bell',
	'Abigail Ryanne Bell',
	'Rachel Volkswagen Bell',
	'Carmel Russia Bell',
	'Chantal Froyo Bell'
];

// Generate items
for (var i = 0; i < items.length; i ++) {
	var item = '<div class="item">' + items[i] + '</div>';
	viewPort.insertAdjacentHTML( 'beforeend', item );

}

// Update items position
var items = document.getElementsByClassName('item');
var itemsObj = [];
var width = 400;
for (var i = 0; i < items.length; i ++) {
	var item = items[i];
	item.style.top = '0px';
	item.calLeft = (i * width);
	item.style.left = item.calLeft + 'px';
	itemsObj.push(item);
}


var count = 0;
var timer;
var v0;	// init speed
var maxV0 = 800;

// Add click event
document.getElementById('stop').addEventListener('click', function() {
	stop();
});

// document.getElementById('spin').addEventListener('click', function() {
// 	spin();
// });

var isPushingSpin = false;
var timerChangeSpeed;
var powerbar = document.getElementById('powerbar');

document.getElementById('spin').addEventListener('mousedown', function() {
	v0 = Math.random() * 10 + 200;	
	timerChangeSpeed = setInterval(function() {
		v0 += 5;
		if (v0 > maxV0) v0 = maxV0;
		var percent = v0 / maxV0 * 100;
		powerbar.style.width = percent + '%';
		if (percent < 40) {
			powerbar.style.background = '#2ecc71';
		} else if (percent < 75) {
			powerbar.style.background = '#f39c12';
		} else {
			powerbar.style.background = '#c0392b';
		}
	}, 10);
});

document.getElementById('spin').addEventListener('mouseup', function() {
	if (timerChangeSpeed) {
		console.log('mouse up run');
		clearInterval(timerChangeSpeed);
		timerChangeSpeed = null;
		spin();
	}
});

document.getElementById('spin').addEventListener('mouseout', function() {
	
	if (timerChangeSpeed) {
		console.log('mouse out run');
		clearInterval(timerChangeSpeed);
		timerChangeSpeed = null;
		spin();
	}
});

// Stop spin
function stop() {
	clearInterval(timer);
	var d = itemsObj[itemsObj.length - 1].calLeft;

	if (d > - width /2) {
		for (var i = 0; i < itemsObj.length; i ++) {
			var item = itemsObj[i];

			item.calLeft -= d;

			item.style.left = item.calLeft + 'px';

		}
	} else {
		for (var i = 0; i < itemsObj.length; i ++) {
			var item = itemsObj[i];
			item.calLeft = (i * width);
			item.style.left = item.calLeft + 'px';
		}
	}
}

// Spin
function spin() {
	clearInterval(timer);
	var a = -Math.random() * 15 - 25;
	// console.log(v0, a);
	var dt = 200;
	var t = 0;
	var v;
	count = 0;
	timer  = setInterval(function() {
		if (v <=0) {
			stop();
			return;
		}

		t += dt/1000;
		v = v0 + a * t
		for (var i = 0; i < itemsObj.length; i ++) {
			var item = itemsObj[i];
			item.calLeft = item.calLeft + v * dt/1000;
			item.style.left = item.calLeft + 'px';
		}

		// Update positioin of 2 last items to the head, so that we don' see the lagging
		var first = itemsObj[0];
		var last = itemsObj[itemsObj.length -1];
		last.calLeft = first.calLeft - width;
		last.style.left = last.calLeft + 'px';
		var last2 = itemsObj[itemsObj.length - 2];
		last2.calLeft = last.calLeft - width;
		last2.style.left = last2.calLeft + 'px';

		// Check if item[0] if pass: move last item to the head of array
		if (itemsObj[0].calLeft >= width) {
			for (var i = itemsObj.length - 1; i > 0; i --) {
				itemsObj[i] = itemsObj[i-1];
			}
			itemsObj[0] = last;
		}

		
	}, dt)
}