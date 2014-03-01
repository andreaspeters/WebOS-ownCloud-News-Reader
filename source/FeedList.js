enyo.kind({
	name: "MyApps.FeedList",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	components: [
		{kind: enyo.Header, style: "min-height: 50px;", components: [
			{content: "OC News"}
		]},	
		{kind: enyo.Scroller, flex: 1, components: [
			{kind: enyo.VirtualRepeater, name: "feedList", onSetupRow: "getFeed", onclick: "doListTap", components: [
				{kind: enyo.SwipeableItem, onConfirm: "doDeleteFeed", layoutKind: enyo.HFlexLayout, tapHighlight: true, components: [
					{name: "listItemTitle", content: ""}

				]},
			]}
		]},
		{kind: enyo.Toolbar, pack: "justify", components: [
			{flex: 1},
                        {icon: "images/configure.png", onclick: "doConfigure", align: "center"}

		]}
	],

	events: {
     		"onListTap": "",
		"onNewFeedTap": "",
		"onDeleteFeed": ""
	 }, 

	doConfigure: function() {
		Feed.showPreferences();
	},

	getFeed: function(inSender, inIndex) {
		if (typeof this.owner.feedList != "undefined") {
			var r = this.owner.feedList[inIndex];
     		
			if (r) {
       				this.$.listItemTitle.setContent(r.title);
	       			return true;
     			}
		}
 	}	 

});
