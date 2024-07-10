const stationURL = "https://api.meteostat.net/v2/stations/search";
const dataURL = "https://api.meteostat.net/v2/stations/daily";

const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
  type: 'line',
  data: {
  labels: [],
  datasets: [{
    label: "",
    data: [],
    fill: false,
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1
  }],
  options: {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
            maxTicksLimit:10,
        }
      }],
        yAxes:[{
            scaleLabel: {
                display: true,
                labelString: "Temperature in Celsius",
                padding: 20
            }
        }]
        
    }
  }
});
    
    async function getData() {
    const city = document.getElementById('city').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    if(!(city && startDate && endDate))  {
        alert('Please input all data.');
        return;
    }
    let url = new URL(stationURL);
    url.search = new URLSearchParams({
        query: city
    });
    let promise = await fetch(url, {
        headers: {
            "x-api-key": "lEoCLK3HgFzYU6oqepEkRZN8YolotzkA"
        },
    });
    let data = await promise.json();
    if (!data.data) {
        alert('No data available for the city.');
        return; 
    } 
    const stationID = data.data[0].id;
    const graphData = await retrieveData(stationID, startDate, endDate);
    if (!graphData) return; 
    updateChart(graphData, city);
}
