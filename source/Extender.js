enyo.kind({
	name: "MyApps.Extender",
	kind: enyo.VFlexBox,
	components: [  
	 {kind: "WebService", name: "testFeed", onSuccess: "testFeedSuccess", onFailure: "testFeedFailed"},
	 {kind: "WebService", name: "grabFeed", onSuccess: "grabFeedSuccess", onFailure: "grabFeedFailed"},
     	 {kind: "Popup", name: "newFeedPopup", components: [
         {style: "font-size: 1.1em; text-align: center", className: "enyo-item enyo-first", components: [
             {content: "Add New Feed", style: "align: center"}
         ]},
         {className: "enyo-item enyo-middle", components: [
             {kind: enyo.Input, name: "newFeedTitle", hint: "New Feed Name", autoCapitalize: "lowercase"}
         ]},
         {className: "enyo-item enyo-last", components: [
             {kind: enyo.Input, name: "newFeedURL", hint: "New Feed URL", autoCapitalize: "lowercase"}
         ]},
         {flex: 1, components: [
             {kind: enyo.Button, onclick: "addNewFeed", caption: "Add Feed", className: "enyo-button-affirmative"}
         ]}
     ]},
     {kind: "Popup", name: "feedFailurePopup", components: [
         {style: "font-size: 1.1em; text-align: center; ", content: "Trouble Getting Feed"},
         {style: "font-size: 0.8em; text-align: justify", width: "320px", components: [
             {name: "feedFailureText"}
         ]},
         {kind: enyo.Button, caption: "OK", onclick: "closeFeedFailurePopup"}
     ]},
// start of Prefs
	{kind: "Popup", name: "showPreferencesPopup", style: "width: 600px; height: 1000px", components: [
	{
		name: "preferences",
		className: "enyo-bg",
		kind: "MyApps.ExtPrefs",
		onReceive: "",
		onSave: "savePreferences",
		onCancel: "closePreferences"

}
]
},
     {kind: "SlidingPane", flex: 1, multiViewMinWidth: 480, onSelect: "paneSelected", name: "feedSlidingPane",
 components: [
         {name: "FeedListPane", width: "320px", kind: "MyApps.FeedList", onListTap: "showFeed",
             onDeleteFeed: "deleteFeedItem", onNewFeedTap: "showAddNewFeedPopup"},
         {name: "feedItemsPane", width: "320px", peekWidth: 50, kind: "MyApps.FeedItems",
             onListTap: "openFeedItem", onRefreshTap: "refreshFeedItemsList"},
         {name: "feedWebViewPane", flex: 1, peekWidth: 100, kind: "MyApps.FeedWebView",
             onResize: "resizeWebView"}
     ]},



{kind: "AppMenu",
	components: [
		{caption: "Preferences", onclick: "showPreferences"},
	]
}
],

ready: function() {
     this.feedList = localStorage.getItem("feedList");
     this.feedItems = [];
     
     if (this.feedList == undefined) {
         this.feedList = [];
     } else {
         this.feedList = JSON.parse(this.feedList);
         this.$.FeedListPane.$.feedList.render();
  }


 }, 

saveFeedList: function() {
     localStorage.setItem("feedList", JSON.stringify(this.feedList));
 },
 showAddNewFeedPopup: function() {
     this.$.newFeedPopup.openAtCenter();
 }, 

addNewFeed: function() {
     var url = "http://query.yahooapis.com/v1/public/yql?q="
         + "select%20title%2C%20pubDate%2C%20link"
         + "%20from%20rss%20where%20url%3D%22"
 + encodeURI(this.$.newFeedURL.getValue())
         + "%22&format=json&callback=";
     this.$.testFeed.setUrl(url);
     this.$.testFeed.call();
 },
 testFeedSuccess: function(inSender, inResponse, inRequest) {
     if (inResponse.query.results !== null) {
         this.feedList.push({
             title: this.$.newFeedTitle.getValue(),
             url: this.$.newFeedURL.getValue()
         });
         this.resetNewFeedData();
         this.saveFeedList();
         this.$.FeedListPane.$.feedList.render();
     } else {
         this.testFeedFailed();
     }
 },

testFeedFailed: function() {
     this.$.feedFailurePopup.openAtCenter();
     this.$.feedFailureText.setContent("Either the feed URL you entered is incorrect or the "
 + "feed just couldn't be grabbed. Please check the URL and try again.");
 },
 resetNewFeedData: function() {
     this.$.newFeedTitle.setValue("");
     this.$.newFeedURL.setValue("");
     this.$.newFeedPopup.close();
 },

grabFeedSuccess: function(inSender, inResponse, inRequest) {
     this.feedItems = inResponse.query.results.item;
     this.$.feedItemsPane.$.feedItemsSpinner.hide();
     this.$.feedItemsPane.$.feedItems.render();
 }, 

grabFeedFailed: function() {
     this.$.feedFailurePopup.openAtCenter();
     this.$.feedFailureText.setContent("The feed could not be read at this time. Please try again.");
 },

 showFeed: function(inSender, inEvent) {
     var r = this.feedList[inEvent.rowIndex];
 
     if (r) {
         this.$.feedSlidingPane.selectView(this.$.feedItemsPane);
         this.$.feedItemsPane.$.selectedFeedName.setContent(r.title);
         this.$.feedItemsPane.$.feedItemsSpinner.show();
         var url = "http://query.yahooapis.com/v1/public/yql?q="
             + "select%20title%2C%20pubDate%2C%20link"
             + "%20from%20rss%20where%20url%3D%22" + encodeURI(r.url)
             + "%22&format=json&callback=";
         this.$.grabFeed.setUrl(url);
         this.$.grabFeed.call();
     }
 },

deleteFeedItem: function(inSender, inIndex) {
     this.feedList.splice(inIndex, 1);
     this.$.FeedListPane.$.feedList.render();
     this.saveFeedList();
 },

closeFeedFailurePopup: function() {
     this.$.feedFailurePopup.close();
 },

refreshFeedItemsList: function() {
     if (!(this.feedList.length > 0)) {
         return;
     }
     this.$.feedItemsPane.$.feedItemsSpinner.show();
     this.$.grabFeed.call();
 },

openFeedItem: function(inSender, inEvent) {
     var r = this.feedItems[inEvent.rowIndex];
 
     if(r) {
         this.$.feedWebViewPane.$.selectedItemName.setContent(r.title);
         this.$.feedWebViewPane.$.currentFeedItemWebView.setUrl(r.link);
     }
 },

resizeWebView: function() {
     if (!!window.PalmSystem)
         this.$.feedWebViewPane.$.currentFeedItemWebView.resize();
 },

showPreferences: function() {
	this.$.showPreferencesPopup.openAtCenter();
},

closePreferences: function() {
	this.$.showPreferencesPopup.close();
},

savePreferences: function() {
	this.$.showPreferencesPopup.close();
}

});
