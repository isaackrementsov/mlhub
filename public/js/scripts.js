var ctx;
var sliders;
var labels;
var urlStr = window.location.href.split('/');
var page = urlStr[urlStr.length - 1];
var pages = ['hub'];
var links = document.querySelectorAll('#navbar a');;
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
    }
}
function hub(){
    labels = document.getElementsByClassName('slider-label');
    sliders = document.getElementsByClassName('slider');
    ctx = document.getElementById('graph').getContext('2d');
    for(let i = 0; i < sliders.length; i++){
        //sliders[i].setAttribute('value', vals[i]*10);
        sliders[i].stepUp(vals[i]*10 - 50);
        let slider = sliders[i];
        updateSlider(slider, i);
        slider.addEventListener('change', function(){
            updateSlider(this, i);
        });
    }
    buildChart();
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
    var computers = [
        {name: 'Dell G3', data: data[0]},
        {name: 'Macbook Pro', data: data[1]},
        {name: 'HP Pavilion 360', data: data[2]}
    ];
    var datasets = [];
    for(let i = 0; i < computers.length; i++){
        let computer = computers[i];
        let line = colors[i];
        let fill = `rgba(${line.split('(')[1].split(')')[0]},0.4)`;
        datasets.push({
            label: computer.name,
            showLine: true,
            lineTension: 0.5,
            backgroundColor: fill,
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
            responsive: true
        }
    });
}
