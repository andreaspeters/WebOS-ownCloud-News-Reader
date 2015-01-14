enyo.kind({
	name: "MyApps.OCNewsReader",
	kind: enyo.VFlexBox,
	r: "",
	a: "",
	components: [  
		{ name: "fileOpenCall", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "open", subscribe: true },
		{ name: "emailOpenCall", kind: "PalmService", service: "palm://com.palm.applicationManager/", method: "launch", subscribe: true },
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
     		{kind: "SlidingPane", flex: 1, onSelect: "paneSelected", name: "feedSlidingPane", fixedWidth: false, dismissible: false, components: [
         		{name: "FeedListPane", width: "320px", kind: "MyApps.FeedList", onListTap: "showFeed", onDeleteFeed: "deleteFeedItem", onNewFeedTap: "showAddNewFeedPopup"},
         		{name: "feedItemsPane", width: "320px", peekWidth: 50, kind: "MyApps.FeedItems", onListTap: "openFeedItem", onRefreshTap: "refreshFeedItemsList"},
         		{name: "feedItemPreviewPane", width: "600px", peekWidth: 150, kind: "MyApps.FeedPreview", onResize: "resizeFeedPreview"},
         		{name: "feedItemWebViewPane", width: "30px", peekWidth: 200, kind: "MyApps.FeedWebView", onResize: "resizeFeedWebView"}
     		]},



		{kind: "AppMenu", components: [
			{caption: "Preferences", onclick: "showPreferences"},
                        {caption: "Donation", onclick: "donateForAventer"},
                        {caption: "About", onclick: "openAbout"},
            {caption: "License", onclick: "openLicensePopup"}

		]},

        {kind: "Popup", name: "licensePopup", onclick: "btnLicenseClose", components: [
            {content: "Software License: GPL - https://www.gnu.org/copyleft/gpl.html"},
            {content: "Paper Background Image License: By Enrique Flouret - http://creativecommons.org/licenses/by/    2.0/deed.de"},
            {content: "Source Code: https://bitbucket.org/andpeters/owncloud-news-reader"}
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
     		this.a = this.feedList[inEvent.rowIndex];
 
     		if (this.a) {
         		this.$.feedSlidingPane.selectView(this.$.feedItemsPane);
         		this.$.feedItemsPane.$.selectedFeedName.setContent(this.a.title);
         		this.$.feedItemsPane.$.feedItemsSpinner.show();
			this.ocnews.getFeedItems(this.a.id);
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
   		this.r = this.feedItems[inEvent.rowIndex];
 
   		if(this.r) {
			this.$.feedItemPreviewPane.$.selectedItemName.setContent(this.r.title);
			this.$.feedItemPreviewPane.$.currentFeedItemPreview.setContent(this.r.body);
			this.$.feedItemPreviewPane.$.r = this.r;
   		}
 	},


	showPreferences: function() {
		this.$.showPreferencesPopup.openAtCenter();
	},

	closePreferences: function() {
		this.$.showPreferencesPopup.close();
	},

	savePreferences: function() {
		this.$.showPreferencesPopup.close();
	},

	openAbout: function() {
		this.$.fileOpenCall.call({ target: "http://www.aventer.biz"});
	},

	donateForAventer: function() {
		this.$.fileOpenCall.call({ target: "https://www.aventer.biz/104-1-donate.html"});
	},

    // Convert the Unixtime to normal timestamp
    unixtime: function(dateTime) {
		console.log(dateTime);
        var date = new Date(dateTime*1000);
		console.log(date);
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getYear()+1900;
        var hours = date.getHours();
        var minutes = date.getMinutes();
        return day + '.' + month + '.' + year + '  ' + hours + ':' + minutes;
    },

    resizeFeedWebView: function() {
        if (this.r) {
                this.$.feedItemWebViewPane.$.currentFeedItemWebView.setUrl(this.r.url);
                this.$.feedItemWebViewPane.$.selectedItemName.setContent(this.r.title);
        }

    },

    openLicensePopup: function(inSender) {
        this.$.licensePopup.openAtCenter();
    }



});
