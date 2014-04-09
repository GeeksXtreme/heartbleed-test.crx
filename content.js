var logprefix = '[Heartbleed Test]: ';
console.debug(logprefix+'Extension loaded');
var bleed = new XMLHttpRequest();
bleed.server = 'http://bleed-1161785939.us-east-1.elb.amazonaws.com/bleed/';
var host = document.location.host;

bleed.open('GET', bleed.server+host, true);
console.debug(logprefix+'Opened connection to '+bleed.server+host);
bleed.onreadystatechange = function () {
	if (bleed.readyState === 4) {
		console.debug(logprefix+'Got response');
		if (bleed.status === 200) {
			console.debug(logprefix+bleed.server+host+' returned code 200 OK');
			bleed.responseJSON = JSON.parse(bleed.responseText);
			if (bleed.responseJSON.code === 0) {
				console.warn(logprefix+host+' IS VULNERABLE!');
			} else if (bleed.responseJSON.code === 1) {
				console.debug(logprefix+host+' seems not affected');
			} else if (bleed.responseJSON.code === 2) {
				console.error(logprefix+bleed.responseJSON.error);
			} else {
				console.error(logprefix+'Got invalid response');
			}
			chrome.extension.sendMessage({'pageAction': bleed.responseJSON.code, 'host': host});
		} else {
			console.error(logprefix+bleed.server+host+' returned code '+bleed.status);
			chrome.extension.sendMessage({'pageAction': ''});
		}
	}
};
bleed.send(null);
