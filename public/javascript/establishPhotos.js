'use strict'

$(function() {

    $('#establishPhotosBtn').on('click', () => {
        const id = $('#establishPhotosBtn').data('id');

        $.ajax({
            type: "get",
            url: "/user/getPhotos/" + id,
      
            success: function (data, textStatus, jqXHR) {
              if (data.photos === 3) {
                $('#noMorePhotos').removeClass('d-none');
                $('#uploadPhotos').addClass('d-none');
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Se ha producido un error: " + errorThrown);
            }
          });
    });
});

$(function() {

    $('#photo').change(() => {
        if ($('#photo').val() !== '') $('#photosButton').attr('disabled', false);
        else $('#photosButton').attr('disabled', true);
    });
});