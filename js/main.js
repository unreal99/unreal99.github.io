$(document).ready(function() {
    var resultCon = $('.wpcf7-response-output');
    var form = $('#request-form');

    form.submit(function(e) {
        e.preventDefault();

        var data = form.serialize();
        var el = form.find('.form-btn, .wpcf7-submit');

        $.ajax({
            url: '/mail.php',
            method: 'POST',
            data: data,
            beforeSend: function() {
                el.attr('disabled', 'disabled');
                resultCon.text('Sending...');
            },
            success: function(r) {
                if( r == '1') {
                    resultCon.text('Sent');
                }
                else {
                    resultCon.text('Failed');
                }
            },
            error: function() {
                resultCon.text('Failed');
            },
            complete: function() {
                el.removeAttr('disabled');
            }
        });
    });

});