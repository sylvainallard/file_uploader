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