chrome.extension.onMessage.addListener(function (request, sender) {
	if (request.page_action) {
		console.debug('Showing pageAction with title '+request.page_action);
		chrome.pageAction.show(sender.tab.id);
		chrome.pageAction.setTitle({title: request.page_action, tabId: sender.tab.id});
	}
});

