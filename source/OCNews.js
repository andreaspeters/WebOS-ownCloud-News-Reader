enyo.kind({
        name: "MyApps.OCNews",
	kind: enyo.VFlexBox,
	components: [
  		{kind: "WebService", name: "ocLogin", onSuccess: "ocLoginSuccess"},
  		{kind: "WebService", name: "ocGetFeedList", onSuccess: "ocGetFeedListSuccess", handleas: "json"},
  		{kind: "WebService", name: "ocGetFeedItems", onSuccess: "ocGetFeedItemsSuccess", handleas: "json"}
	],

    makeAuthToken: function(username, password) {
       var tok = username + ":" + password;
       var hash = base64_encode(tok);
       return "Basic " + hash;
    },



	login: function (Username, Password, URL) {
		if (Username && Password && URL) {
			this.URL = URL;
			this.authtoken = this.makeAuthToken(Username, Password);

			this.$.ocLogin.headers = { 'Authorization': this.authtoken };
			this.$.ocLogin.setUrl( URL + "/index.php/apps/news/api/v1-2/version");
			this.$.ocLogin.call();	
		}
	},

	ocLoginSuccess: function() {
		this.loginOk = 1;
	},

	getFeedList: function() {
		this.$.ocLogin.headers = { 'Authorization': this.authtoken };
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
