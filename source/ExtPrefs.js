enyo.kind({
  name: "MyApps.ExtPrefs",
  kind: enyo.VFlexBox,
  events: {
      onReceive: "",
      onSave: "",
      onCancel: ""
  },
  components: [
      {
          name: "getPreferencesCall",
          kind: "PalmService",
          service: "palm://com.palm.systemservice/",
          method: "getPreferences",
          onSuccess: "getPreferencesSuccess",
          onFailure: "getPreferencesFailure"
      },
      {
          name: "setPreferencesCall",
          kind: "PalmService",
          service: "palm://com.palm.systemservice/",
          method: "setPreferences",
          onSuccess: "setPreferencesSuccess",
          onFailure: "setPreferencesFailure"
      },
      {kind: "PageHeader", content: "Extender Preferences"},
      {kind: "VFlexBox",
          components: [
              {kind: "RowGroup", caption: "Instapaper Account Info", components: [
                  {name: "instapaperUsernameInput", kind: "Input", hint: "Username", autocorrect: false},
		  {name: "instapaperPasswordInput", kind: "PasswordInput", hint: "Password", autoWordComplete: false, spellCheck: false, autocorrect: false}
              ]},
	      {kind: "RowGroup", caption: "OwnCloud", components: [
		  {name: "ocURLInput", kind: "Input", hint: "https://www.aventer.biz/owncloud", autocorrect: false},
		  {name: "ocUsernameInput", kind: "Input", hint: "Username", autocorrect: false},
		  {name: "ocPasswordInput", kind: "PasswordInput", hint: "Password", autoWordComplete: false, spellCheck: false, autocorrect: false}
	      ]},
              {kind: "HFlexBox", pack: "end", style: "padding: 0 10px;",
                  components: [
                      {name: "saveButton", kind: "Button",
                          content: "Save", onclick: "saveClick", className: "enyo-button-blue"},
                      {width: "10px"},
                      {name: "cancelButton", kind: "Button",
                          content: "Cancel", onclick: "cancelClick"}
                  ]
              }
          ]
      },
  ],




  create: function() {
      this.inherited(arguments);
      this.$.getPreferencesCall.call(
      {
          "keys": ["instapaperUsername", "instapaperPassword", "ocURL", "ocUsername", "ocPassword"]
      });
      // keep this updated with the value that's currently saved to the service
      this.savedInstapaperUsername = localStorage.getItem("instapaperUsername");
      this.savedInstapaperPassword = localStorage.getItem("instapaperPassword");
      this.savedOcURL      = localStorage.getItem("ocURL");
      this.savedOcUsername = localStorage.getItem("ocUsername");
      this.savedOcPassword = localStorage.getItem("ocPassword");


  },
  
  getPreferencesSuccess: function(inSender, inResponse) {
	// Instant Paper
	this.savedInstapaperUsername = inResponse.instapaperUsername;
	this.doReceive(this.savedInstapaperUsername);
	
	this.savedInstapaperPassword = inResponse.instapaperPassword;
	this.doReceive(this.savedInstapaperPassword);
	
	// OwnCloud
	this.savedOcURL = inResponse.ocURL;
	this.doReceive(this.savedOcURL);
	
	this.savedOcUsername = inResponse.ocUsername;
	this.doReceive(this.savedOcUsername);
	
	this.savedOcPassword = inResponse.ocPassword;
	this.doReceive(this.savedOcPassword);	
     
  }, 
  
  getPreferencesFailure: function(inSender, inResponse) {
	enyo.log("got failure from getPreferences");
  },	
  
  setPreferencesSuccess: function(inSender, inResponse) {
	console.log("got success from setPreferences");
  },
  
  setPreferencesFailure: function(inSender, inResponse) {
	console.log("got failure from setPreferences");
  },
  
  showingChanged: function() {
	// reset contents of text input box to last saved value
	this.$.instapaperUsernameInput.setValue(this.newInstapaperUsername);
	this.$.instapaperPasswordInput.setValue(this.newInstapaperPassword);
	
	this.$.ocURLInput.setValue(this.newOcURL);	
	this.$.ocUsernameInput.setValue(this.newOcUsername);
	this.$.ocPasswordInput.setValue(this.newOcPassword);
	
  },

  saveClick: function(inSender, inEvent) {
	// Instant Paper
	var newInstapaperUsernameValue = this.$.instapaperUsernameInput.getValue();
	this.$.setPreferencesCall.call(
	{
		"instapaperUsername": newInstapaperUsernameValue
	});
	this.savedInstapaperUsername = newInstapaperUsernameValue;
	this.doSave(newInstapaperUsernameValue);
	localStorage.setItem("instapaperUsername", JSON.stringify(this.newInstapaperUsername));
	
	
	var newInstapaperPasswordValue = this.$.instapaperPasswordInput.getValue();
	this.$.setPreferencesCall.call(
	{
		"instapaperPassword": newInstapaperPasswordValue
	});
	this.savedInstapaperPasswordValue = newInstapaperPasswordValue;
	this.doSave(newInstapaperPasswordValue);
	localStorage.setItem("instapaperPassword", JSON.stringify(this.newInstapaperPassword));
	
	// OwnCloud 
	var newOcURLValue = this.$.ocURLInput.getValue();
	this.$.setPreferencesCall.call({
		"ocURL": newOcURLValue
	});
	this.savedOcURLValue = newOcURLValue;
	this.doSave(newOcURLValue);
	localStorage.setItem("ocURL", JSON.stringify(this.newOcURL));
	
	var newOcURLValue = this.$.ocURLInput.getValue();
	this.$.setPreferencesCall.call({
		"ocURL": newOcURLValue
	});
	
	this.savedOcURLValue = newOcURLValue;
	this.doSave(newOcURLValue);
	localStorage.setItem("ocURL", JSON.stringify(this.newOcURL));

	
	var newOcPasswordValue = this.$.ocPasswordInput.getValue();
	this.$.setPreferencesCall.call({
		"ocPassword": newOcPasswordValue
	});
	this.savedOcPasswordValue = newOcPasswordValue;
	this.doSave(newOcPasswordValue);
	localStorage.setItem("ocPassword", JSON.stringify(this.newOcPassword));
	
  },

  cancelClick: function() {
      this.doCancel();
  }
});
