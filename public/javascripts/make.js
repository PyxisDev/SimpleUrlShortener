$('.btn-make').on('click', function() {
    $.ajax({
        url: '/api/makeShort',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#url-field').val()},
        success: function(data) {
            var resultHTML = '<input id="result-field" type="text" class="form-control" placeholder="Provied some link" value="' + data.shortUrl + '"">' +
            '<span class="input-group-btn"> <button class="btn btn-copy" type="button">COPY</button></span>';

            $('#result').html(resultHTML);
        }
    })
});