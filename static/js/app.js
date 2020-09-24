// from data.js
var tableData = data;

// Set variables
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var form = d3.select("#form");
var clearButton = d3.select("#clear-filter-btn")

// get events to run functions
button.on("click", runFilter);
form.on("submit", runFilter);
clearButton.on("click", clearFilter);

//populate with original data
populateTable(tableData);

//function to populate data table
function populateTable(dataTable) {
    if (dataTable.length === 0) {
        tbody.html("No data to display; try another filter value.")

    } else {

    dataTable.forEach((dataTable) => {
      var row = tbody.append("tr");
      Object.entries(dataTable).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value); 
      });
    });}
}

//function to filter data with filters
function runFilter() {
  d3.event.preventDefault();

  var filteredData = tableData
  var dateFilter = d3.select("#datetime").property("value")
  var stateFilter = d3.select("#state").property("value")
  var cityFilter = d3.select("#city").property("value")
  var countryFilter = d3.select("#country").property("value")
  var shapeFilter = d3.select("#shape").property("value")

  if (dateFilter) {
      filteredData = filteredData.filter(ufo => ufo.datetime === dateFilter);
  }

  if (stateFilter) {
    filteredData = filteredData.filter(ufo => ufo.state === stateFilter);
  }

  if (cityFilter) {
    filteredData = filteredData.filter(ufo => ufo.city === cityFilter);
  }

  if (countryFilter) {
    filteredData = filteredData.filter(ufo => ufo.country === countryFilter);
  }

  if (shapeFilter) {
    filteredData = filteredData.filter(ufo => ufo.shape === shapeFilter);
  }

    tbody.html("");
    populateTable(filteredData);
}

function clearFilter() {
    document.getElementById("datetime").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    document.getElementById("country").value = "";
    document.getElementById("shape").value = "";
}