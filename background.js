chrome.extension.onMessage.addListener(function (request, sender) {
	console.debug('Got message from tab '+sender.tab.id);
	if (typeof request.pageAction !== 'undefined') {
		console.debug('Tab '+sender.tab.id+' requested pageAction '+request.pageAction);
		if (request.pageAction === 0) {
			chrome.pageAction.setTitle({title: request.host+'  IS VULNERABLE', tabId: sender.tab.id});
			chrome.pageAction.setIcon({path:{'19': 'images/red19.png', '38': 'images/red38.png'}, tabId: sender.tab.id});
			chrome.pageAction.show(sender.tab.id);
		} else if (request.pageAction === 1) {
			chrome.pageAction.setTitle({title: request.host+'  seems not affected', tabId: sender.tab.id});
			chrome.pageAction.setIcon({path:{'19': 'images/green19.png', '38': 'images/green38.png'}, tabId: sender.tab.id});
			chrome.pageAction.show(sender.tab.id);
		} else {
			chrome.pageAction.setTitle({title: 'ERROR\nPlease see console for details', tabId: sender.tab.id});
			chrome.pageAction.show(sender.tab.id);
		}
	}
});

