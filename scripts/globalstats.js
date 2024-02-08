var $loading = $('#loadingDiv').hide();
var $footer = $('#footer').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
    $footer.show();
});




$(document).ready(function () {
    const apiKey = "CwcyKOR5lUGs6RTfUXNeHw==AfTraDK9OjymV4LP";
    const countries = [
        "India",
        "China",
        "United States",
        "Indonesia",
        "Pakistan",
        "Nigeria",
        "Brazil",
        "Bangladesh",
        "Russia",
        "Mexico",
        "Ethiopia",
        "Japan",
        "Philippines",
        "Egypt",
        "DR Congo",
        "Vietnam",
        "Iran",
        "Turkey",
        "Germany",
        "Thailand",
        "United Kingdom",
        "Tanzania",
        "France",
        "South Africa",
        "Italy",
        "Kenya",
        "Myanmar",
        "Colombia",
        "South Korea",
        "Uganda",
        "Sudan",
        "Spain",
        "Argentina",
        "Algeria",
        "Iraq",
        "Afghanistan",
        "Poland",
        "Canada",
        "Morocco",
        "Saudi Arabia",
        "Ukraine",
        "Angola",
        "Uzbekistan",
        "Yemen",
        "Peru",
        "Malaysia",
        "Ghana",
        "Mozambique",
        "Nepal",
        "Madagascar",
        "Côte d'Ivoire",
        "Venezuela",
        "Cameroon",
        "Niger",
        "Australia",
        "North Korea",
        "Mali",
        "Burkina Faso",
        "Syria",
        "Sri Lanka",
        "Malawi",
        "Zambia",
        "Romania",
        "Chile",
        "Kazakhstan",
        "Chad",
        "Ecuador",
        "Somalia",
        "Guatemala",
        "Senegal",
        "Netherlands",
        "Cambodia",
        "Zimbabwe",
        "Guinea",
        "Rwanda",
        "Benin",
        "Burundi",
        "Tunisia",
        "Bolivia",
        "Haiti",
        "Belgium",
        "Jordan",
        "Dominican Republic",
        "Cuba",
        "South Sudan",
        "Sweden",
        "Honduras",
        "Czech Republic (Czechia)",
        "Azerbaijan",
        "Greece",
        "Papua New Guinea",
        "Portugal",
        "Hungary",
        "Tajikistan",
        "United Arab Emirates",
        "Belarus",
        "Israel",
        "Togo",
        "Austria",
        "Switzerland",
        "Sierra Leone",
        "Laos",
        "Serbia",
        "Nicaragua",
        "Libya",
        "Paraguay",
        "Kyrgyzstan",
        "Bulgaria",
        "Turkmenistan",
        "El Salvador",
        "Congo",
        "Singapore",
        "Denmark",
        "Slovakia",
        "Central African Republic",
        "Finland",
        "Norway",
        "Liberia",
        "State of Palestine",
        "Lebanon",
        "New Zealand",
        "Costa Rica",
        "Ireland",
        "Mauritania",
        "Oman",
        "Panama",
        "Kuwait",
        "Croatia",
        "Eritrea",
        "Georgia",
        "Mongolia",
        "Moldova",
        "Uruguay",
        "Bosnia and Herzegovina",
        "Albania",
        "Jamaica",
        "Armenia",
        "Gambia",
        "Lithuania",
        "Qatar",
        "Botswana",
        "Namibia",
        "Gabon",
        "Lesotho",
        "Guinea-Bissau",
        "Slovenia",
        "North Macedonia",
        "Latvia",
        "Equatorial Guinea",
        "Trinidad and Tobago",
        "Bahrain",
        "Timor-Leste",
        "Estonia",
        "Mauritius",
        "Cyprus",
        "Eswatini",
        "Djibouti",
        "Fiji",
        "Comoros",
        "Guyana",
        "Bhutan",
        "Solomon Islands",
        "Luxembourg",
        "Montenegro",
        "Suriname",
        "Cabo Verde",
        "Micronesia",
        "Malta",
        "Maldives",
        "Brunei",
        "Bahamas",
        "Belize",
        "Iceland",
        "Vanuatu",
        "Barbados",
        "Sao Tome & Principe",
        "Samoa",
        "Saint Lucia",
        "Kiribati",
        "Grenada",
        "Tonga",
        "Seychelles",
        "St. Vincent & Grenadines",
        "Antigua and Barbuda",
        "Andorra",
        "Dominica",
        "Saint Kitts & Nevis",
        "Marshall Islands",
        "Liechtenstein",
        "Monaco",
        "San Marino",
        "Palau",
        "Nauru",
        "Tuvalu",
        "Holy See"
    ];
    function fetchData(country) {
        // Loaders (Hide)
        var $loading = $('#loadingDiv').hide();
        var $footer = $('#footer').hide();
        $(document)
        // On ajax start
        .ajaxStart(function () {
            // Show loader
            $loading.show();
        })
        // On ajax return
        .ajaxStop(function () {
            // Hide loader show footer
            $loading.hide();
            $footer.show();
        });
        // Scroll to top
        const tableTop = document.getElementById("mainNav");
        tableTop.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        return $.ajax({
            method: 'GET',
            url: `https://api.api-ninjas.com/v1/covid19?country=${country}`,
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json'
        });
        
    }

    function displayYearlyCases(country, data) {
        const resultContainer = $('#resultContainer');

        if (data && data.cases) {
            const yearlyData = {};

            // Loop through the dates and aggregate total cases for each year
            Object.entries(data.cases).forEach(([date, dailyCases]) => {
                const year = new Date(date).getFullYear();
                if (!yearlyData[year]) {
                    yearlyData[year] = 0;
                }
                yearlyData[year] += dailyCases.total;
            });

            // Sort the yearly data in descending order of the year
            const sortedYearlyData = Object.entries(yearlyData)
                .sort(([yearA], [yearB]) => yearB - yearA);

            const tableHtml = `
                <table class="table">
                    <thead>
                        <tr><th>Year</th><th>Total Cases</th></tr>
                    </thead>
                    <tbody>
                        ${sortedYearlyData.map(([year, totalCases]) =>
                            `<tr><td>${year}</td><td>${totalCases}</td></tr>`
                        ).join('')}
                    </tbody>
                </table>`;

            resultContainer.html(`<h2>${country} Yearly Cases</h2>`).append(tableHtml);
        } else {
            resultContainer.html(`<p>No cases data available for ${country}</p>`);
        }
    }

    function createTextWithClick(country) {
        const textElement = $('<p>', {
            text: country,
            class: 'glamorous-text',
            click: function () {
                fetchData(country)
                    .done(function (result) {
                        displayYearlyCases(country, result[0]);
                    })
                    .fail(function (jqXHR) {
                        console.error('Error: ', jqXHR.responseText);
                        displayYearlyCases(country, null); // Display "Unknown" for failed requests
                    });
            }
        });

        return textElement;
    }

    const flagContainer = $('#flagContainer');
    countries.forEach(function (country) {
        flagContainer.append(createTextWithClick(country));
    });
});