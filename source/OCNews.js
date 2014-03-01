enyo.kind({
        name: "MyApps.OCNews",
	kind: enyo.VFlexBox,
	components: [
  		{kind: "WebService", name: "ocLogin", onSuccess: "ocLoginSuccess"},
  		{kind: "WebService", name: "ocGetFeedList", onSuccess: "ocGetFeedListSuccess", handleas: "json"},
  		{kind: "WebService", name: "ocGetFeedItems", onSuccess: "ocGetFeedItemsSuccess", handleas: "json"}
	],

	login: function (Username, Password, URL) {
		if (Username && Password && URL) {
			var posStr = URL.indexOf(':');
			var subStrProt = URL.substring(0,posStr);
			var subStrURL  = URL.substring(posStr+3,URL.length);

			this.URL = subStrProt + "://" + Username + ":" + Password + "@" + subStrURL;

			this.$.ocLogin.setUrl( this.URL + "/index.php/apps/news/api/v1-2/version");
			this.$.ocLogin.call();	
		}
	},

	ocLoginSuccess: function() {
		this.loginOk = 1;
	},

	getFeedList: function() {
		this.$.ocGetFeedList.setUrl( this.URL + "/index.php/apps/news/api/v1-2/feeds");
		this.$.ocGetFeedList.call();	
	},

        ocGetFeedListSuccess: function(inSender, inResponse, inRequest) {
		Feed.updateFeedList(inResponse.feeds);
        },

	getFeedItems: function(feedId) {
		this.$.ocGetFeedItems.setUrl( this.URL + "/index.php/apps/news/api/v1-2/items");
		this.$.ocGetFeedItems.call({id:feedId});	
	},

        ocGetFeedItemsSuccess: function(inSender, inResponse, inRequest) {
		Feed.updateFeedItems(inResponse.items);
        },
});
