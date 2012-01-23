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