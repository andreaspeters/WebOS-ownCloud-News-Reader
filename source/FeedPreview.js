enyo.kind({
	name: "MyApps.FeedPreview",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	components: [
		{kind: enyo.Header, style: "min-height: 30px;", components: [
     			{kind: enyo.HFlexBox, flex: 1, components: [
         			{content: "", name: "selectedItemName", style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;", flex: 1}
     			]}
 		]},
 		{kind: enyo.Scroller, flex: 1, components: [
			{kind: "HtmlContent", name: "currentFeedItemPreview", content: "", style: "font-size: 0.75em; padding: 10px 10px 10px 10px"}
 		]},
 		{kind: enyo.Toolbar, pack: "justify", components: [
     			{kind: enyo.GrabButton},
     			{flex: 1},
			{icon: "images/forward-email.png", onclick: "sendEMail"} 
 		]}
	],

	sendEMail: function() {
        	params = { "summary":Feed.r.title,
                   	   "text":Feed.r.title+" : URL: "+Feed.r.url
                    	 };
		Feed.$.emailOpenCall.call({"id": "com.palm.app.email", "params":params});
	}

});
