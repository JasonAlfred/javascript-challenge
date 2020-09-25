// from data.js
var tableData = data;

// Set variables
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var form = d3.select("#filters");
var clearButton = d3.select("#clear-filter-btn")


// get events to run functions
button.on("click", runFilter);
form.on("change", runFilter);
clearButton.on("click", clearFilter);

//populate with original data
d3.select(window).on("load", clearFilter());

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
  // this line breaks with version 6 of d3 and doesn't seem like it is needed as the page doesn't reload.
  // d3.event.preventDefault();

  var filteredData = tableData
  var dateFilter = d3.select("#datetime").property("value")
  var stateFilter = d3.select("#state").property("value").toLowerCase()
  var cityFilter = d3.select("#city").property("value").toLowerCase()
  var countryFilter = d3.select("#country").property("value").toLowerCase()
  var shapeFilter = d3.select("#shape").property("value").toLowerCase()

  if (dateFilter) {
      filteredData = filteredData.filter(ufo => ufo.datetime === dateFilter);
  }

  if (stateFilter) {
    var regex =/^[a-zA-Z]{2}$/;
    if (regex.test(stateFilter) == false) {
      d3.select("#state_error").text("Please enter state abbreviation");
    } else {
    filteredData = filteredData.filter(ufo => ufo.state === stateFilter);
      clearErrors();
    }}

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
    tbody.html("");
    clearErrors();
    populateTable(tableData);
}

function clearErrors() {
  d3.select("#state_error").text("");
}