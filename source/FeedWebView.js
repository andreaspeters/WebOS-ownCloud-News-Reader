enyo.kind({
	name: "MyApps.FeedWebView",
	kind: enyo.Popup,
	components: [
		{kind: (window.PalmSystem ? enyo.WebView : enyo.Iframe), name: "currentFeedItemWebView", flex: 1, onLoadComplete: "hideWebViewSpinner", onLoadStarted: "showWebViewSpinner"}
	],

	rendered: function() {
		this.$.currentFeedItemWebView.setUrl(Feed.url);
		this.$.currentFeedItemWebView.call();
	}

});
