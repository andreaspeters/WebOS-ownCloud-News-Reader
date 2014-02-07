enyo.kind({
	name: "MyApps.FeedWebView",
	kind: enyo.SlidingView,
	layoutKind: enyo.VFlexLayout,
	components: [
	{kind: enyo.Header, style: "min-height: 60px;", components: [
     {kind: enyo.HFlexBox, flex: 1, components: [
         {content: "", name: "selectedItemName", style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;", flex: 1},
         {kind: enyo.Spinner, name: "feedWebViewSpinner", align: "right"}
     ]}
 ]},
 {kind: enyo.Scroller, flex: 1, components: [
     {kind: (window.PalmSystem ? enyo.WebView : enyo.Iframe), name: "currentFeedItemWebView",
 	    flex: 1, onLoadComplete: "hideWebViewSpinner", onLoadStarted: "showWebViewSpinner"}
 ]},
 {kind: enyo.Toolbar, pack: "justify", components: [
     {kind: enyo.GrabButton},
     {flex: 1},
     {icon: "images/menu-icon-refresh.png", onclick: "refreshWebView", align: "right"}, // Refresh Button
     {icon: "images/print_icon_label.jpg", onclick: "openPrintDialog", align: "center"}, // Print Button
     {icon: "images/save_icon.jpg", onclick: "openSaveDialog", align: "left"} // Save Button
 ]},


{kind: "Popup", name: "showSaveDialog", style: "width 500px; height 500px", components: [
{
	name: "savearticle",
	className: "enyo-bg",
	kind: "MyApps.ExtSaveArticle",
	onReceive: "",
	onSave: "",
	onCancel: "closeSaveArticle"
}
]
},

// Print Dialog Box
 {name: "printDialog", kind: "PrintDialog",
         duplexOption: true,
         colorOption: true,
         frameToPrint: {name:"currentFeedItemWebView", landscape:false},
         appName: "Extender"}


],

hideWebViewSpinner: function() {
     this.$.feedWebViewSpinner.hide();
 },

showWebViewSpinner: function() {
     this.$.feedWebViewSpinner.show();
 },

refreshWebView: function() {
     this.$.currentFeedItemWebView.reloadPage();
 },

openPrintDialog: function() {
	this.$.printDialog.openAtCenter();  // Standard enyo.Popup method
},
openSaveDialog: function() {
	this.$.showSaveDialog.openAtCenter();
}

});
