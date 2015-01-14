enyo.kind({
	name: "MyApps.FeedWebView",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	r: "",
	o: "",
	components: [
		{kind: enyo.Header, style: "height: 25px; background-color: #A2C536;", components: [
     			{kind: enyo.HFlexBox, flex: 1, components: [
         			{content: "", name: "selectedItemName", style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;", flex: 1}
     			]}
 		]},
		{kind: enyo.HFlexBox, flex:1, components: [
			{kind: "Image", src: "images/webview.png", style: "width: 40px; padding-left: 10px;"},
	 		{kind: enyo.Scroller, flex: 1, components: [
				{kind: (window.PalmSystem ? enyo.WebView : enyo.Iframe), style:"width:780px", name:"currentFeedItemWebView", onLoadComplete: "hideWebViewSpinner", onLoadStarted: "showWebViewSpinner"}
 			]}
			]
		},
 		{kind: enyo.Toolbar, pack: "justify", style: "height: 25px", components: [
     			{kind: enyo.GrabButton, name: "troggleBtn"},
     			{flex: 1}

 		]}
	],

	showWebView: function(inSender) {
		if (this.r.url === this.o.url) {
			return;
		}
	        this.$.currentFeedItemWebView.setUrl(this.r.url);
		this.$.selectedItemName.setContent(this.r.title);
		this.o = this.r;
	}

		

});
