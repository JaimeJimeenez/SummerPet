'use strict'

$(function() {

  $('input[name="datefilter"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: 'Clear',
      format: "DD/MM/YYYY",
      separator: " - ",
      applyLabel: "Aplicar",
      cancelLabel: "Cancelar",
      fromLabel: "De",
      toLabel: "A",
      customRangeLabel: "Personalizar",
      weekLabel: "S",
      daysOfWeek: [
        "Do",
        "Lu",
        "Ma",
        "Mi",
        "Ju",
        "Vi",
        "Sa"
    ],
    monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ],
    firstDay: 1
    },
    minDate: moment().startOf('day')    
    });

    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
      $('#establishButton').attr('disabled', false);
    });

    $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
      $('#establishButton').attr('disabled', true);
    });

    $('.drp-selected').remove();
});

$(function() {
  $('#establishButton').on('click', () => {
    let date = $('#datefilter').val();
    let id = $('#idDogWatcher').val();
    
    $.ajax({
      type: "POST",
      url: "/user/establishDisponibility",
      contentType: "application/json",
      data: JSON.stringify({ date: date, id : id }),

      success: function (data, textStatus, jqXHR) {
        console.log(textStatus);
        $('#datefilter').val('');
        $('#establishButton').attr('disabled', true);
        alert('Periodo: ' + date + ' recogido');
      },
      error: function (jqXHR, textStatus, errorThrown) {
          alert("Se ha producido un error: " + errorThrown);
      }
    });
  });
});
