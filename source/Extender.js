enyo.kind({
	name: "MyApps.OCNewsReader",
	kind: enyo.VFlexBox,
	components: [  
     		{kind: "Popup", name: "feedFailurePopup", components: [
         		{style: "font-size: 1.1em; text-align: center; ", content: "Trouble Getting Feed"},
         		{style: "font-size: 0.8em; text-align: justify", width: "320px", components: [
             			{name: "feedFailureText"}
         		]},
         		{kind: enyo.Button, caption: "OK", onclick: "closeFeedFailurePopup"}
     		]},
		// start of Prefs
		{kind: "Popup", name: "showPreferencesPopup", style: "width: 600px; height: 1000px", components: [{
			name: "preferences",
			className: "enyo-bg",
			kind: "MyApps.ExtPrefs",
			onReceive: "",
			onSave: "savePreferences",
			onCancel: "closePreferences"

		}]},
		// WebView
		{kind: "Popup", name: "showFeedWebViewPopup", style: "width: 800px; height: 1000px", components: [
			{name: "feedWebView", className: "enyo-bg", kind: "MyApps.FeedWebView"}

		]},
     		{kind: "SlidingPane", flex: 1, multiViewMinWidth: 480, onSelect: "paneSelected", name: "feedSlidingPane", components: [
         		{name: "FeedListPane", width: "320px", kind: "MyApps.FeedList", onListTap: "showFeed", onDeleteFeed: "deleteFeedItem", onNewFeedTap: "showAddNewFeedPopup"},
         		{name: "feedItemsPane", width: "320px", peekWidth: 50, kind: "MyApps.FeedItems", onListTap: "openFeedItem", onRefreshTap: "refreshFeedItemsList"},
         		{name: "feedItemPreviewPane", flex: 1, peekWidth: 100, kind: "MyApps.FeedPreview", onResize: "resizeFeedPreview"},
         		//{name: "feedWebViewPane", flex: 1, peekWidth: 100, kind: "MyApps.FeedWebView", onResize: "resizeWebView"}
     		]},



		{kind: "AppMenu", components: [
			{caption: "Preferences", onclick: "showPreferences"},
		]}
	],

	ready: function() {
		this.ocnews = new MyApps.OCNews();
		this.ocnews.login(localStorage.getItem("ocUsername"), localStorage.getItem("ocPassword"), localStorage.getItem("ocURL"));
		this.ocnews.getFeedList();
	},

	updateFeedList: function(feeds) {
     		this.feedList = feeds;
     		this.feedItems = [];
     
     		if (this.feedList == undefined) {
         		this.feedList = [];
     		} else {
         		this.feedList = this.feedList;
         		this.$.FeedListPane.$.feedList.render();
  		}


 	}, 

 	showFeed: function(inSender, inEvent) {
     		var r = this.feedList[inEvent.rowIndex];
 
     		if (r) {
         		this.$.feedSlidingPane.selectView(this.$.feedItemsPane);
         		this.$.feedItemsPane.$.selectedFeedName.setContent(r.title);
         		this.$.feedItemsPane.$.feedItemsSpinner.show();
			this.ocnews.getFeedItems(r.id);
		}
	},

	updateFeedItems: function(items) {
     		this.feedItems = items;
		this.$.feedItemsPane.$.feedItemsSpinner.hide();
     		this.$.feedItemsPane.$.feedItems.render();
	},

 	showAddNewFeedPopup: function() {
     		this.$.newFeedPopup.openAtCenter();
 	}, 


 	resetNewFeedData: function() {
     		this.$.newFeedTitle.setValue("");
     		this.$.newFeedURL.setValue("");
     		this.$.newFeedPopup.close();
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
		this.ocnews.getFeedItems(r.id);
 	},

	openFeedItem: function(inSender, inEvent) {
     		var r = this.feedItems[inEvent.rowIndex];
 
     		if(r) {
			this.$.feedItemPreviewPane.$.selectedItemName.setContent(r.title);
			this.$.feedItemPreviewPane.$.currentFeedItemPreview.setContent(r.body);
			this.url = r.url;
         		//this.$.feedWebViewPane.$.selectedItemName.setContent(r.title);
         		//this.$.feedWebViewPane.$.currentFeedItemWebView.setUrl(r.url);
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
