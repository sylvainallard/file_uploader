console.log("uploader running...");

FU.core_uploader = SC.Object.create({
	uploadFiles: function(){
			console.log("*** ready for uploading...");
		
			var fd= new FormData();

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