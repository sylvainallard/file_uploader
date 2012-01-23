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
