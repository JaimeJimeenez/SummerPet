'use strict'

$(document).on('click', '.btn-secondary', function() {
    const id = $(this).data('id');

    $.ajax({
      url: 'getApplication/' + id,
      type: 'GET',
      success: function(response) {
        console.log(response);
        const startDate = response.application.StartDate;
        const finalDate = response.application.FinalDate;
        
        let date = new Date(finalDate);

        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = (date.getDate() - 1).toString().padStart(2, '0');

        let finalFormatted = `${year}-${month}-${day}`;

        date = new Date(startDate);
        year = date.getFullYear();
        month = (date.getMonth() + 1).toString().padStart(2, '0');
        day = (date.getDate() - 1).toString().padStart(2, '0');

        let startFormatted = `${year}-${month}-${day}`; 

        const start = new Date(startFormatted)
        const final = new Date(finalFormatted);
        
        $('#start').datepicker('setDate', start);
        $('#final').datepicker('setDate', final);
        
        $('#acceptButton').data('id', response.application.Id);
        $('#deleteButton').data('id', response.application.Id);

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
});


$(document).on('click', '.btn-success', function() {
  const id = $(this).data('id');

  $.ajax({
    url: 'acceptApplication/' + id,
    type: 'GET',
    success: function(response) {
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
});