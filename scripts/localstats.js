//////////////////////////////
/////////Data to Chart////////
//////////////////////////////

var $loading = $('#loadingDiv').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });
// I AM NOT ABOUT TO USE ANOTHER API TO GET LOCATION
// Navigator.geolocation.GetCurrentPosition can at most show coordinates but not country

// On document ready
$(document).ready(function () {
  // API KEY
  const apiKey = "CwcyKOR5lUGs6RTfUXNeHw==AfTraDK9OjymV4LP";
  // Get country

  // This section is for choosing country, going to just set it to Singapore for local stats
  /*
  var country = prompt("Enter country");
  while (country == ""){
    country = prompt("Country name cannot be empty");
  }
  */
  // Request the country data
  var country = "Singapore";
  $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/covid19?country=' + country,
      headers: { 'X-Api-Key': apiKey },
      contentType: 'application/json',
      // On success
      success: function (result) {
          console.log(result);
          // Check if the return is valid
          if (result && Array.isArray(result) && result.length > 0) {
              //  Get the data of cases
              //  Original format: 
              //  {
              //    0: {country: 'Singapore', region: '', cases: {…}}
              //    1: { ## Ignore this part }
              //  }
              //  To access cases data enter result[0]:
              //  {country: 'Singapore', region: '', cases: {…}}
              //  data is in cases, which would be accessed by result[0]["cases"]
              //  datatable is now { {$"{date}": {total: $"{total}", new: $"{new}"}}, },{...}... }
              datatable = result[0]["cases"];
              // Creating new array of dicts in data
              var data = [];
              // Loop through every date in the data
              for (let entries in datatable){
                // Create new dict based on the data
                var dict = {
                  // Date: date
                  date: entries,
                  // new: New cases
                  new: datatable[entries]["new"]
                }
                data.push(dict);
              }
              console.log(data);
            
              var myChart = new Chart(
                document.getElementById('myChart'),
                {
                  // Line chart
                  type: 'line',
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        ticks: {
                          color: (c) => {
                            if(document.body.classList == "dark") return 'white'; else return 'black';
                          }
                        }
                      },
                      y: {
                        ticks: {
                          color: (c) => {
                            if(document.body.classList == "dark") return 'white'; else return 'black';
                          }
                        }
                      }
                    },
                    plugins: {
                      tooltip: {
                        // Hides tooltip on hover over any data at 0
                        filter: (label) => {
                          if (typeof (label.raw) === "number")
                            return label.raw > 0
                          else return true
                        }
                      }
                    }
                  },
                  data: {
                    // X axis: Date
                    labels: data.map(row => row.date),
                    datasets: [
                      {
                        label: 'New Cases',
                        // Y axis: New cases
                        data: data.map(row => row.new),
                        fill: true,
                        backgroundColor: "red",
                      }
                    ],
                  }
                }
              );
              window.onclick = e =>{
                myChart.update();
              }
          }
          else {
              // Display a message if there is no data
              var displaymessage = document.getElementById("errormessages");
              displaymessage.innerText = 'No data available.';
          }
      },
      error: function ajaxError(jqXHR) {
          console.error('Error: ', jqXHR.responseText);
          // Display the error in the result-container div
          var displaymessage = document.getElementById("errormessages");
          displaymessage.innerText = jqXHR.responseText;
          document.body.appendChild(displaymessage);
      }
  });
});

// Fit canvas to container
var canvas = document.querySelector('canvas');
fitToContainer(canvas);

function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

