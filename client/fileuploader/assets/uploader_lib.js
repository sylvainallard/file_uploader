/* ===========================================================================
   BPM Combined Asset File
   MANIFEST: fileuploader ()
   This file is generated automatically by the bpm (http://www.bpmjs.org)
   =========================================================================*/

spade.register("fileuploader/uploader/lib/app", function(require, exports, __module, ARGV, ENV, __filename){
FU = Ember.Application.create({
	serverHost: '/'
});

});spade.register("fileuploader/uploader/lib/controllers/files", function(require, exports, __module, ARGV, ENV, __filename){
FU.filesController  = Em.ArrayController.create({
	content: []
});


});spade.register("fileuploader/uploader/lib/core_statechart", function(require, exports, __module, ARGV, ENV, __filename){
SC.mixin(FU, {
    //global state chart
    statechart: SC.Statechart.create({
        //log trace
        trace: NO,

        rootState: SC.State.extend({

            initialSubstate: 'noSelectionState',       

            noSelectionState: SC.State.extend({
                enterState: function() {
                    console.log('enter noSelectionState');				
                },
            }),
			
			fileSelectedState: SC.State.extend({
                enterState: function() {
                    console.log('enter fileSelectedState');				
                },
				uploadFilesAction: function(){
					//
					console.log("enter uploadFilesAction: ");
					FU.core_uploader.uploadFiles();
				},
            }),
			clearFilesAction: function(){
				//
				console.log("enter clearFilesAction: ");
				FU.core_uploader.clearFiles();
			},
			
        })
    })
});

});spade.register("fileuploader/uploader/lib/core_uploader", function(require, exports, __module, ARGV, ENV, __filename){
console.log("uploader running...");

FU.core_uploader = SC.Object.create({
	uploadFiles: function(){
		console.log("*** ready for uploading...");
		
		var fd= new FormData();
		//get array of FU.file from which we extrat files to upload
		//var fufiles = FU.filesController.get("content");
		//var fufiles = this.$().files;
	/*	var fufiles = $('input')[0].files;
		for(var i=0; i< fufiles;i++){
			fd.append("fileToUpload" + i, fuFiles[i]);	
		}

		var postUrl = FU.get('serverHost') + 'api_fileuploader/upload';
		console.log(fufiles.length + ' files.');
		var xhr = new XMLHttpRequest();
				
		xhr.view= this;
		var del = this.get('delegate') ? this.get('delegate') : this;
		xhr.upload.addEventListener("progress", del.fileFieldViewUploadProgress, false);
		xhr.addEventListener("load", del.fileFieldViewDidComplete, false);
		xhr.addEventListener("error", del.fileFieldViewUploadFailed, false);
		xhr.addEventListener("abort", del.fileFieldViewUploadCanceled, false);

		xhr.open("POST", postUrl, true);
		xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=------multipartformboundary' + (new Date).getTime());
		xhr.send(fd);*/
		//var files = $('input')[0].files;
		var files = FU.filesController.get("content");
			var formData = new FormData();
			var len = files.get('length');
			  for (var i = 0; i < len; i++) {
				var file = files.objectAt(i);
			    formData.append(file.get('fileName'), file.get('file'));
			  }
			  var xhr = new XMLHttpRequest();
			var del = this.get('delegate') ? this.get('delegate') : this;
			xhr.upload.addEventListener("progress", del.fileFieldViewUploadProgress, false);
			xhr.addEventListener("load", del.fileFieldViewDidComplete, false);
			xhr.addEventListener("error", del.fileFieldViewUploadFailed, false);
			xhr.addEventListener("abort", del.fileFieldViewUploadCanceled, false);
			
			  xhr.open('POST', FU.get('serverHost') + 'api_fileuploader/upload', true);
			  xhr.onload = function(e) { console.log('loaded')};

			  xhr.send(formData);
		//this._button.set('title', this.get('buttonTitle'));
	},
	
	fileFieldViewUploadFailed: function(e){
		console.log('error' + e);
	},
	
	fileFieldViewDidComplete: function(e){
		console.log('complete' + e);
	},
	
	fileFieldViewUploadCanceled: function(e){
		console.log('cancel' + e);
	},
	
	fileFieldViewUploadProgress: function(evt) {
	        if (evt.lengthComputable) {
	            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
	            console.log(percentComplete.toString() + '%');
	        }
	    },
	
	clearFiles:function(){
		console.log("enter clear files...");
		FU.filesController.set("content", null);
		
	}
	
});



$(document).ready(function() {
    FU.statechart.initStatechart();
});

});spade.register("fileuploader/uploader/lib/main", function(require, exports, __module, ARGV, ENV, __filename){
require("ember");
require("ember-statechart");
require("./app");
require("./model/file")
require("./controllers/files");
require("./core_statechart");
require("./core_uploader");
require("./views/upload_field");
require("./views/button");

});spade.register("fileuploader/uploader/lib/model/file", function(require, exports, __module, ARGV, ENV, __filename){
FU.File = Em.Object.extend({
	file: null,
	fileName:function(){
		return this.get('file').name;
	}.property('file'),
	
	fileSize:function(){
		return this.get('file').size;
	}.property('size'),
	
	fileType:function(){
		return this.get('file').type;
	}.property('type')
});

});spade.register("fileuploader/uploader/lib/views/button", function(require, exports, __module, ARGV, ENV, __filename){
var get = SC.get;
FU.Button = SC.Button.extend({

    attributeBindings: ['type', 'disabled', 'title'],

    disableTouch: NO,

    label_loc: function() {
        return this.get('label').loc();
    }.property('label'),

    mouseUp: function(e) {
        this._super(e);
        var action = get(this, 'sc_action')
        if (action && FU.statechart) {
            FU.statechart.sendAction(action, this.get('content') || this.getPath('itemView.content'));
			if(this.postAction){
				this.postAction();
			}
        }
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        return NO;
    },

    keyUp: function(e) {
        if (e.keyCode == 13) {
            var action = get(this, 'sc_action')
            if (action && FU.statechart) {
                FU.statechart.sendAction(action, this.get('content') || this.getPath('itemView.content'));
				if(this.postAction){
					this.postAction();
				}
            }
        }
        return NO;
    },

    touchStart: function(touch) {
        this._super(touch);
		return NO;//no bubble
    },

    touchEnd: function(touch) {
        this._super(touch);
		return NO;//no bubble
    }	
});

});spade.register("fileuploader/uploader/lib/views/upload_field", function(require, exports, __module, ARGV, ENV, __filename){
FU.UploadField = Em.TextField.extend({
	
	  attributeBindings: ['type', 'value', 'multiple'], 
	
     type:'file',
	
	 change:function(e){
		console.log('change!!');
		console.log(e.target.files);
		var f = e.target.files;
		var files = [];
		if(f.length>0){
			FU.statechart.gotoState("fileSelectedState")
		}else{
			FU.statechart.gotoState("noSelectionState")
		}
		for (var i = 0; i < f.length; i++) {
			var myFile = FU.File.create({file: f[i]});
			files.pushObject(myFile);
		}
		FU.filesController.set('content', files);
	 },
	
	
	 filesDidChange: function(){
		console.log('files did changes!');
		if(Ember.none(FU.filesController.get('content'))){
			console.log('null files');
			//this.$()[0].value = null;
			this.set('value', null);
		}
	}.observes('FU.filesController.content')
});

});