

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/covid19?country=' + country,
    headers: { 'X-Api-Key': apiKey },
    contentType: 'application/json',
    success: function (data) {
        // Handle success, 'data' contains the response from the server
        console.log(data);
    },
    error: function (error) {
        // Handle error
        console.error(error);
    }
});
