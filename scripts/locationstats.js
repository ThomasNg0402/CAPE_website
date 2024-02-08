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
// On document ready
$(document).ready(function () {
    // API KEY
    const apiKey = "CwcyKOR5lUGs6RTfUXNeHw==AfTraDK9OjymV4LP";
    // Get country
  
    // This section is for choosing country
    var country = prompt("Enter country");
    while (country == ""){
      country = prompt("Country name cannot be empty");
    }
    var countryDisplay = country[0].toUpperCase() + country.slice(1);
    console.log(countryDisplay);
    const displayNameCountry = document.getElementById("countryName");
    displayNameCountry.innerText = countryDisplay +" Statistics";
    // Request the country data
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
  // (async function() {
  //   const data = [
  //     { year: 2010, cases: 10 },
  //     { year: 2011, cases: 20 },
  //     { year: 2012, cases: 15 },
  //     { year: 2013, cases: 25 },
  //     { year: 2014, cases: 22 },
  //     { year: 2015, cases: 30 },
  //     { year: 2016, cases: 28 },
  //   ];
  
  //   new Chart(
  //     document.getElementById('myChart'),
  //     {
  //       type: 'line',
  //       data: {
  //         labels: data.map(row => row.year),
  //         datasets: [
  //           {
  //             label: 'Cases by day',
  //             data: data.map(row => row.cases)
  //           }
  //         ]
  //       }
  //     }
  //   );
  // })();
  