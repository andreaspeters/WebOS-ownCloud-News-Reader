enyo.kind({
	name: "MyApps.FeedItems",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	components: [
	 {kind: enyo.Header, style: "min-height: 60px;", layoutKind: enyo.HFlexLayout, components: [
     {content: "", name: "selectedFeedName", style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;", flex: 1},
     {kind: enyo.Spinner, name: "feedItemsSpinner", align: "right"}
 ]},
 {kind: enyo.Scroller, flex: 1, components: [
     {kind: enyo.VirtualRepeater, name: "feedItems", onSetupRow: "getFeedItems", onclick: "doListTap", components: [
         {kind: enyo.Item, layout: enyo.HFlexBox, tapHighlight: true, components: [
             {name: "feedItemTitle", style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;", content: ""},
             {name: "feedItemPublished", content: "", style: "font-size: 0.75em"}
         ]}
     ]}
 ]},
 {kind: enyo.Toolbar, pack: "justify", components: [
     {kind: enyo.GrabButton},
     {flex: 1},
     {icon: "images/menu-icon-refresh.png", onclick: "doRefreshTap", align: "right"}
 ]} 
],

events: {
     "onListTap": "",
     "onRefreshTap": ""
 },

getFeedItems: function(inSender, inIndex) {
     var r = this.owner.feedItems[inIndex];
 
     if (r) {
         this.$.feedItemTitle.setContent(r.title);
         this.$.feedItemPublished.setContent(r.pubDate);
         return true;
     }
 } 

});
