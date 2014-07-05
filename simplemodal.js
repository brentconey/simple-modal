(function ($) {
    $.fn.simplemodal = function (options) {
        var $modal = $(this);
        var defaultOptions = $.extend({
            show: false,
            ajaxDone: null,
            ajaxError: null,
            onModalCancel: null,
            onModalConfirm: null
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

            var $submitButton = $($modalForm.find(".simplemodal-confirm")[0]);

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
        var navigateUrl;
        $(document).on('click', '#' + modalActivator + '_activator', function (e) {
            e.preventDefault();
            // if the modal overlay doesn't exist, add it
            if (!$(".simplemodal-overlay").length) {
                $('body').prepend('<div class="simplemodal-overlay"></div>');
            }
            navigateUrl = $(this).attr("href");
            showModal(); 
        });

        function showModal() {
            $(".simplemodal-overlay").addClass("simplemodal-overlay--show");
            $modal.addClass("simplemodal--show");
        }

        $modal.on("click", ".simplemodal-overlay, .simplemodal-close, .simplemodal-cancel", function (e) {
            if (defaultOptions.onModalCancel) {
                defaultOptions.onModalCancel(e);
            }
            hideModal();
        });

        $modal.on("click", ".simplemodal-confirm", function (e) {
            if (defaultOptions.onModalConfirm) {
                defaultOptions.onModalConfirm(e);
            }
            if (navigateUrl) {
                window.location.replace(navigateUrl);
            }
            hideModal();
        });

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

    function hideModal() {
        $('.simplemodal').removeClass("simplemodal--show");
        $(".simplemodal-overlay").removeClass("simplemodal-overlay--show");
    }



})(window.jQuery);
