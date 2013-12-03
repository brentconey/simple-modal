simple-modal
============

This is a super simple, out of your way, js modal library. Check out demo.html as a supplement to these instructions.


Dependencies
============
jQuery
SASS


Usage
=====

1. Add a class of *modal* to the div you would like to be a modal.
2. Add a modal activator: a tag with a class of *modal-activator*.
3. Include the JS and CSS in your project (including jQuery or Zepto).
			
Once you have jQuery and the simplemodal.js files loaded, all you need to do is call simplemodal on your div – like this:

$("#add_name").simplemodal();

This is the most basic usage.
		
If your modal div has a form, simple modal will read the action and method of the form and set up an ajax call passing all the input data within the div automatically.
	
	
Options
=======

Simplemodal has three properties that you can use.


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


Contributors
============
[Brent Coney](http://twitter.com/brentconey)
[Jordan Little](http://twitter.com/iamjordanlittle)