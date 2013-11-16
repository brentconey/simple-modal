simple-modal
============

This is a super simple, out of your way, js modal library.
Dependencies: jQuery

Please use demo.html in the project as a supplement to these instructions
To use: First, you need to add the overlay to the page. The overlay can be anywhere and only needs to be on the page once. 
		Add a class of modal to the div you would like to be a modal.
			
		Add a modal activator that will show the modal. (Typically an anchor tag with a class of "modal-activator")
			
		Now, you need to add the js and css to use simplemodal. Simplemodal has a dependency on jQuery so make sure it's in your project.
			
		Once you have jQuery and the simplemodal.js files loaded, all you need to do is call simplemodal on your div.
			Ex. $("#add_name").simplemodal();
			This is the most basic usage.
		
		If your modal div has a form, simple modal will read the action and method of the form and set up an ajax call passing all the input data within the div automatically.
		
		Options: Simplemodal has three properties that you can use.
				 Show: This defaults to false and can be overridden to true to show the modal on page load.
					   Ex. $("#add_name").simplemodal({ show: true });
				 ajaxDone: This is a hook into the successful completion of the ajax call.
					   Ex. $("#add_name").simplemodal({ ajaxDone: successFunction });
							function successFunction(data){
								//this will fire when the ajax even is done, passing back any data from the call
							}
				 ajaxError: This is the same as ajaxDone except that it fires when an error with the ajax call occurs.
					   Ex. $("#add_name").simplemodal({ ajaxError: errorHanlder });
							function errorHandler(data){
								//error handling code
							}

Contributors: Brent Coney & Jordan Little
