$('.btn-make').on('click', function() {
    $.ajax({
        url: '/api/makeShort',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#url-field').val(), alias: $('#alias-field').val()},
        success: function(data) {
            var resultHTML = '<h2>This is for YOU!</h2><h3>Url is <a id="result-url" href="' + data.shortUrl + '" value="' + data.shortUrl + '">' + 
            data.shortUrl + '</a></h3>';
            $('#result').html(resultHTML);

             BootstrapAlert.success({
                title: "Your url is Ready!",
                message: "Your new URL is " + data.shortUrl,
                hideTimeout: 3000,
                autoHide:true,
                dismissible:true,
            });
        }
    })
});