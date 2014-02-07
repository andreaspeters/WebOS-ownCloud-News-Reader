enyo.kind({
  name: "MyApps.ExtSaveArticle",
  kind: enyo.VFlexBox,
  events: {
      onReceive: "",
      onSave: "",
      onCancel: ""
  },
  components: [

		
	{kind: "PageHeader", content: "Save Article", align: "center"},
	{kind: "VFlexBox",
		components: [
			{kind: "WebService", name: "login",
       				 url: "https://www.instapaper.com/api/add",
       				 method: "POST",
       				 onSuccess: "loginSuccess",
       				 onFailure: "loginFailure"},


			{kind: "Button", caption: "Instapaper", onclick: "instapaperButtonClick"},
			{kind: "Button", caption: "Save Local", onclick: "localsaveButtonClick"},
			{kind: "Popup", name: "loginSuccessPopup", components: [
				{content: "Saved To Instapaper"}
]},
			{kind: "Popup", name: "loginFailurePopup", components: [
				{content: "Something went wrong.  Check your connection and account credentials under Preferences"}
]},

]

} 
],

instapaperButtonClick: function() {

this.$.login.call({username: "", password: "", url: ""});

},

loginSuccess: function() {
this.$.loginSuccessPopup.openAtCenter();
},

loginFailure: function() {
this.$.loginFailurePopup.openAtCenter();
},

localsaveButtonClick: function() {
}

});
