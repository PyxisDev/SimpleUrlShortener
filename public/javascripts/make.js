$('.btn-make').on('click', function() {
    $.ajax({
        url: '/api/makeShort',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#url-field').val(), alias: $('alias-field').val()},
        success: function(data) {
            var resultHTML = '<h2>This is for YOU!</h2><h3>Url is <a id="result-url" href="' + data.shortUrl + '">' + 
            data.shortUrl + '</a><h3><button type="button" class="btn btn-primary" id="btn-copy">COPY</button>';
            $('#result').html(resultHTML);
        }
    })
});

var clipboard = new Clipboard('.result-url', {

})
clipboard.on('success', function(e) {

});

clipboard.on('error', function(e) {

});