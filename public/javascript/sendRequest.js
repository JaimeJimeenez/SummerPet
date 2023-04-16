'use strict'

$(function() {
    let actualDate = new Date();
    let start;
    let end;

    $('#startDate').change(() => {
        start = new Date($('#startDate').val());
        end = new Date($('#endDate').val());
        
        if (end !== null) {
            if (start <= end && actualDate <= start) {
                $('#applicationButton').attr('disabled', false);
                $('#errorApplication').addClass('d-none');
            } else {
                $('#errorApplication').removeClass('d-none');
                $('#applicationButton').attr('disabled', true);
            }
        }
    });

    $('#endDate').change(() => {
        start = new Date($('#startDate').val());
        end = new Date($('#endDate').val());
        
        if (start !== null) {
            if (start <= end && actualDate <= start) {
                $('#applicationButton').attr('disabled', false);
                $('#errorApplication').addClass('d-none');
            } else {
                $('#errorApplication').removeClass('d-none');
                $('#applicationButton').attr('disabled', true);
            }
        }
    })
});