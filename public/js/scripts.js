var ctx;
var sliders;
var labels;
var urlStr = window.location.href.split('/');
var page = urlStr[urlStr.length - 1];
var pages = ['hub', 'performance'];
var links = document.querySelectorAll('#navbar a');
var colors = ['rgb(233,30,99)', 'rgb(255,152,0)', 'rgb(0,188,212)'];
var vals = [2.3, 4.1, 5.5];
setUp();
function setUp(){
    var idx = pages.indexOf(page);
    if(idx >= 0 && idx < links.length) links[idx].style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    switch (idx) {
        case 0:
            hub();
            break;
        case 1:
            perf();
            donut();
            break;
        }
}
function hub(){
    labels = document.getElementsByClassName('slider-label');
    sliders = document.getElementsByClassName('slider');
    ctx = document.getElementById('graph').getContext('2d');
    for(let i = 0; i < sliders.length; i++){
        sliders[i].stepUp(computers[i].lr*10 - 50);
        let slider = sliders[i];
        updateSlider(slider, i);
        slider.addEventListener('change', function(){
            updateSlider(this, i);
        });
    }
    buildChart();
}

function perf() {
    labels = document.getElementsByClassName('slider-label');
    sliders = document.getElementsByClassName('slider');
    ctx = document.getElementById('graph').getContext('2d');
    for(let i = 0; i < sliders.length; i++){
        sliders[i].stepUp(computers[i].lr*10 - 50);
        let slider = sliders[i];
        updateSlider(slider, i);
        slider.addEventListener('change', function(){
            updateSlider(this, i);
        });
    }

    buildPerfChart();

}

function donut() {
    ctx = document.getElementById('minimaDonut').getContext('2d');
    buildMinimaDonut();
}


function updateSlider(s, i){
    let val = s.value/100;
    labels[i].innerHTML = Math.round(val*1000)/100;
    sliders[i].style.backgroundImage = `-webkit-gradient(linear, left top, right top,
            color-stop(${val}, ${colors[i]}),
            color-stop(${val + 0.01}, #C5C5C5)
    )`;
}
function chooseColor(i){
    if(i < 0 || i >= colors.length){
        return i - colors.length;
    }else{
        return i;
    }
}
function buildChart(){
    var datasets = [];
    for(let i = 0; i < computers.length; i++){
        let computer = computers[i];
        let line = colors[i];
        let fill = `rgba(${line.split('(')[1].split(')')[0]},0.6)`;
        let gradient = ctx.createLinearGradient(800,0,0,0);
        gradient.addColorStop(0, fill);
        gradient.addColorStop(1, `rgba(${line.split('(')[1].split(')')[0]},0.1)`);
        datasets.push({
            label: computer.name,
            showLine: true,
            lineTension: 0.5,
            backgroundColor: gradient,
            borderColor: line,
            pointBorderColor: line,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointBorderRadius: 5,
            pointHoverBackgroundColor: line,
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: computer.data
        });
    }
    var stackedLine = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Minutes Ago'
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: '-∇C'
                }
              }]
            }
        }
    });
}

function buildPerfChart() {
    var datasets = [];
    for(let i = 0; i < computersPerf.length; i++){
        let computerPerf = computersPerf[i];
        let line = colors[chooseColor(i)];
        let fill = `rgba(${line.split('(')[1].split(')')[0]},0.6)`;
        let gradient = ctx.createLinearGradient(800,0,0,0);
        gradient.addColorStop(0, fill);
        gradient.addColorStop(1, `rgba(${line.split('(')[1].split(')')[0]},0.1)`);
        datasets.push({
            label: computer.name,
            showLine: true,
            lineTension: 0.5,
            backgroundColor: gradient,
            borderColor: line,
            pointBorderColor: line,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointBorderRadius: 5,
            pointHoverBackgroundColor: line,
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: computerPerf.data
        });
    }
    var stackedLine = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Minutes Ago'
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: '-∇C'
                }
              }]
            }
        }
    });    
}

function buildMinimaDonut() {

    let data = [];
    let donutColors = [];
    let labels = [];
    let sum = 0;


    for(let i = 0; i < computersMinima.length; i++) {
        let obj = computersMinima[i];
        donutColors.push(colors[chooseColor(i)]);
        data.push(obj.minima);
        labels.push(obj.name);
        sum += obj.minima;
    }

    //Code from JSFiddle

    Chart.pluginService.register ({

        beforeDraw: function(chart) {
            var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx,
            type = chart.config.type;

            if (type == 'doughnut') {
                var oldFill = ctx.fillStyle;
                var fontSize = ((height - chart.chartArea.top) / 100).toFixed(2);
      
                ctx.restore();
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle"

                var text = sum;
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = (height + chart.chartArea.top) / 2;
            
                ctx.fillStyle = chart.config.data.datasets[0].backgroundColor[0];
                ctx.fillText(text, textX, textY);
                ctx.fillStyle = oldFill;
                ctx.save();
            }
        }
    });

    //End code


    var minimaDonut = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          backgroundColor: colors,
          data: data
        }]
      },
      options: {
        maintainAspectRatio : false,
        legend: {
            display: true
        }
      }
    });
}

