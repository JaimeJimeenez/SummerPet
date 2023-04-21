'use strict'
$(function() {$('#ejemplo').daterangepicker()}),
$(function() {

  $('#calendar').daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: 'Clear',
      format: "DD/MM/YYYY",
      separator: " - ",
      
      cancelLabel: "Cancelar",
      fromLabel: "De",
      toLabel: "A",
      showCustomRangeLabel: false,
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
    minDate: moment().startOf('day'),
    autoApply: true,
    ranges: {},
    alwaysShowCalendars: true
    });

    $('.drp-selected').remove();
    
});

$(function() {
  $('#btn-calendar').on('click', () => {
    const id = $('#btn-calendar').data('id');
    console.log(id)
    $.ajax({
        url: 'getDisponibility/' + id,
        type: 'GET',
        success: function(response) {
          console.log(response);
          let ranges={};
          let i=1;

           response.disponibilities.forEach(element => {
            console.log(element);
           let array=[];
            let day=moment(element.StartDate).date()-1;
            let month=moment(element.StartDate).month();
            let year=moment(element.StartDate).year();
            
            let fecha= moment(new Date(year,month,day)).format("DD/MM/YYYY");
            let dayF=moment(element.EndDate).date()-1;
            let monthF=moment(element.EndDate).month();
            let yearF=moment(element.EndDate).year();
            
            let fechaF= moment(new Date(yearF,monthF,dayF)).format("DD/MM/YYYY");
            array.push(fecha);
            array.push(fechaF);
           ranges["semana"+i]=array;
            i++;
           }); 
            console.log(ranges);
        
        //$('#calendar').data('daterangepicker').updateOption("ranges", ranges);
        $('#calendar').daterangepicker({ranges: ranges,  alwaysShowCalendars: true});
       /* $('#calendar').on('apply.daterangepicker', function(ev, picker) {
            // Obtener el objeto Daterangepicker y actualizar la opción 'ranges'
            var daterangepicker = $('#calendar').data('daterangepicker');
            daterangepicker.updateOption('ranges', {
              'Últimos 7 días': [moment().subtract(9, 'days'), moment()],
              'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
              'Este mes': [moment().startOf('month'), moment().endOf('month')],
              'Último mes': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            });
          });*/

        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
      });
    $('#calendar').data('daterangepicker').show();
  })
});
  
