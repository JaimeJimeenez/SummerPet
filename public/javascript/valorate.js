'use strict'

$(function() {

    $('#valorateBtn').on('click', () => {
        const id = $('#valorateBtn').data('id');

        $.ajax({
            url: 'valorate/' + id,
            type: 'get',
            success: function(response) {
              console.log(response.applications[0]);
              if (response.applications.length === 0) {
                $('#noValorate').removeClass('d-none');
                $('#valorateUser').addClass('d-none');
              } else {
                console.log('EH');
                $('#sendValorationBtn').data('id', response.applications[0].Id + '-' + id);
              }

            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
            }
          });
    });
});

$(function() {

  $('.stars').on('click', function() {
    const id = $(this).data('id');

    for (let i = 1; i <= 5; i++) {
      let star = $('span[data-id=' + i + ']');
      star.css('color', 'black');
    }

    for (let i = 1; i <= id; i++) {
      let star = $('span[data-id=' + i + ']');
      star.css('color', 'rgba(255, 255, 0, 0.759)')
    }

    $('#sendValorationBtn').attr('disabled', false);
  });
});

$(function() {

  $('#sendValorationBtn').on('click', function() {
    let i = 1;
    let span = $('span[data-id=' + i + ']');

    while (i <= 5 && span.css('color') !== 'rgb(0, 0, 0)') {
      i++;
      span = $('span[data-id=' + i + ']');
    }

    i--;

    let ids = $('#sendValorationBtn').data('id');
    let description = $('textarea[name=descriptionValoration]').val();

    $.ajax({
      type: "POST",
      url: "/user/valorateUser",
      contentType: "application/json",
      data: JSON.stringify({ ids : ids, valoration : i, description : description }),

      success: function (data, textStatus, jqXHR) {
        location.reload();
      },
      error: function (jqXHR, textStatus, errorThrown) {
          alert("Se ha producido un error: " + errorThrown);
      }
    });
  });
});