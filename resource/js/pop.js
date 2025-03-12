'use strict';

// Pop function
function Pop(self, call = null){
	let modal_pop = document.getElementById('popUp');
	let modal = bootstrap.Modal.getOrCreateInstance(modal_pop) // Returns a Bootstrap modal instance
	modal.show(); // Show pop up modal

	let data = self.dataset;
	if(call == null) call = data.pop;
	call = call.split('.');

	// delete data.pop; // Remove the pop caller
	let html = Pop_Class[call[0]][call[1]](data);

	modal_pop.querySelector('#body').innerHTML = html; // The returned data formed to an html element. Peace.
}



// Attach Pop function to all element with data-pop
$(()=>{
	$("[data-pop]").each((index, elem) => {
		$(elem).click(function(){
			Pop(this);
		})
	})
})