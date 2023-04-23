'use strict'

$(document).on('click', '.btn-secondary', function() {
    const id = $(this).data('id');

    $.ajax({
      url: 'getApplication/' + id,
      type: 'GET',
      success: function(response) {
        let start = new Date(response.application.StartDate);
        let end = new Date(response.application.FinalDate);

        start.setDate(start.getDate() - 1);
        start = start.toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' });

        end.setDate(end.getDate() - 1);
        end = end.toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid' });
        
        $('#start').val(start);
        $('#final').val(end);

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