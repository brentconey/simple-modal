(function ($) {
    $.fn.simplemodal = function (options) {
        var $modal = $(this);
        var defaultOptions = $.extend({
            show: false,
            ajaxDone: null,
            ajaxError: null
        }, options);

        if (defaultOptions.show) {
            showModal();
        } else {
            hideModal();
        }
        var $modalForm = $modal.find("form");

        if ($modalForm.length > 0) {
            //we have a form in the modal
            //attach events and figure out data
            var action = $modalForm.attr("action");
            var method = $modalForm.attr("method");
            var $formInputs = $modalForm.find('input, textarea, select')
                .not(':input[type=button], :input[type=submit], :input[type=reset]');
            
            var $submitButton = $($modalForm.find(".modal-confirm")[0]);

            $(document).on("click", '#' + $submitButton.attr("id"), function (e) {
                e.preventDefault();
                //do the ajax stuff to send the data
                //then fire the submitFunction
                var dataObjectToSend = {};
                $.each($formInputs, function (index, input) {
                    var inputName = $(input).attr("name");
                    //set up empty object to fill
                    dataObjectToSend[inputName] = $(input).val();
                });

                $.ajax({
                    type: method,
                    url: action,
                    data: dataObjectToSend
                }).done(function (data) {
                    $.each($formInputs, function (index, input) {
                        $(input).val('');
                    });
                    hideModal();
                    if (defaultOptions.ajaxDone) {
                        defaultOptions.ajaxDone(data);
                    }
                }).fail(function () {
                    hideModal();
                    if (defaultOptions.ajaxError) {
                        defaultOptions.ajaxError();
                    }
                });
                
            });
        }
        var modalActivator = $modal.attr("id");
        $(document).on('click','a[href="#' + modalActivator + '"]', function (e) {
            e.preventDefault();
            // if the modal overlay doesn't exist, add it
            if( !$(".modal-overlay").length ){
                $('body').prepend('<div class="modal-overlay"></div>');
            }
            showModal();
            // $modal.find("input").first().focus(); 
        });

        function showModal() {
            $(".modal-overlay").addClass("modal-overlay--show");
            $modal.addClass("modal--show");
        }
		
		return {
			show: showModal
		};
        
    };
    //global click handlers
    $(document).on("keyup", function (e) {
        if (e.keyCode === 27) {
            hideModal();
        }
    });

    $(document).on("click", ".modal-overlay, .modal-close, .modal-cancel", function (e) {
        e.preventDefault();
        hideModal();
    });

    function hideModal() {
        $('.modal').removeClass("modal--show");
        $(".modal-overlay").removeClass("modal-overlay--show");
    }
    

    
})(window.jQuery);
