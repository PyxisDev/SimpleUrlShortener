$('.btn-make').on('click', function() {
    $.ajax({
        url: '/api/makeShort',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#url-field').val()},
        success: function(data) {
            var resultHTML = '<a class="result" href="' + data.shortUrl + '">' + data.shortUrl + '</a>';
            $('#result').html(resultHTML);
        }
    })
});