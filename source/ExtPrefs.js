enyo.kind({
  name: "MyApps.ExtPrefs",
  kind: enyo.VFlexBox,
  events: {
      onReceive: "",
      onSave: "",
      onCancel: ""
  },
  components: [
      {kind: "PageHeader", content: "Extender Preferences"},
      {kind: "VFlexBox",
          components: [
	      {kind: "RowGroup", caption: "OwnCloud", components: [
		  {name: "ocURLInput", kind: "Input", hint: "https://www.aventer.biz/owncloud"},
		  {name: "ocUsernameInput", kind: "Input", hint: "Username"},
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
      	this.$.ocURLInput.setValue(localStorage.getItem("ocURL"));
      	this.$.ocUsernameInput.setValue(localStorage.getItem("ocUsername"));
      	this.$.ocPasswordInput.setValue(localStorage.getItem("ocPassword"));

  },
  
  saveClick: function(inSender, inEvent) {
	// OwnCloud 
	var newOcURLValue = this.$.ocURLInput.getValue();
	localStorage.setItem("ocURL", newOcURLValue);
	
	var newOcUsernameValue = this.$.ocUsernameInput.getValue();
	localStorage.setItem("ocUsername", newOcUsernameValue);

	var newOcPasswordValue = this.$.ocPasswordInput.getValue();
	localStorage.setItem("ocPassword", newOcPasswordValue);

	this.doSave(newOcURLValue);
	this.doSave(newOcUsernameValue);
	this.doSave(newOcUsernameValue);

    this.owner.ocnews.login(localStorage.getItem("ocUsername"), localStorage.getItem("ocPassword"), localStorage.getItem("ocURL"));
    this.owner.ocnews.getFeedList();

  },

  cancelClick: function() {
      this.doCancel();
  }
});
