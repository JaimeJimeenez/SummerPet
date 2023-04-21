'use strict'

$(function() {
    
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
            let array = [];

            let day = moment(element.StartDate).date()-1;
            let month = moment(element.StartDate).month();
            let year = moment(element.StartDate).year();
            let fecha = moment(new Date(year, month, day));

            array.push(fecha);
            
            let dayF=moment(element.EndDate).date()-1;
            let monthF=moment(element.EndDate).month();
            let yearF=moment(element.EndDate).year();
            let fechaF= moment(new Date(yearF,monthF,dayF));
            
            array.push(fechaF);
            
            ranges[moment(fecha).format('DD/MM/YYYY') + ' - ' + moment(fechaF).format('DD/MM/YYYY')]=array;
            i++;
          }); 
          
          function isDateInRange(date) {
            for (let rangeName in ranges) {
              let range = ranges[rangeName];
              if (date.isBetween(range[0], range[1])) {
                return true;
              }
            }
            return false;
          }

          $('#calendar').daterangepicker({
            autoUpdateInput: true,
            locale: {
              cancelLabel: 'Clear',
              format: "DD/MM/YYYY",
              separator: " - ",
              
              cancelLabel: "Cancelar",
              fromLabel: "De",
              toLabel: "A",
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
            ranges: ranges,
            alwaysShowCalendars: true,
            isInvalidDate : function(date) {
              return !isDateInRange(date);
            },
            showCustomRangeLabel: false
          });
        
          $('.drp-selected').remove();
          $('#calendar').data('daterangepicker').show();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
      });
  })
});
  
