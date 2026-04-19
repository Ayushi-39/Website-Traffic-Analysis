/* =============================================
   CHARTS.JS — All Chart.js initializations
   Pratinik Infotech · Project 3
   ============================================= */

const CHART_DEFAULTS = {
  gridColor: 'rgba(255,255,255,0.05)',
  tickColor: '#5e5b65',
  tickSize: 10,
};

function getGridColor() {
  return document.body.classList.contains('light-theme')
    ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)';
}
function getTickColor() {
  return document.body.classList.contains('light-theme') ? '#9b968f' : '#5e5b65';
}

const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
}

/* ---- TRAFFIC LINE CHART ---- */
function buildTrafficChart(canvasId, days, values, labelText) {
  destroyChart(canvasId);
  const labels = days === 7  ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] :
                 days === 14 ? Array.from({length:14}, (_,i) => `D${i+1}`) :
                               Array.from({length:30}, (_,i) => i+1);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  chartInstances[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Page views',
        data: values,
        borderColor: '#c9a84c',
        backgroundColor: 'rgba(201,168,76,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#c9a84c',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1e29',
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          titleColor: '#c9a84c',
          bodyColor: '#9b97a0',
          callbacks: { label: ctx => ` ${ctx.parsed.y.toLocaleString()} views` }
        }
      },
      scales: {
        x: { ticks: { font:{size:10}, color: getTickColor(), maxTicksLimit:10 }, grid: { color: getGridColor() }, border:{color:'rgba(128,128,128,0.1)'} },
        y: { ticks: { font:{size:10}, color: getTickColor(), callback: v => v>=1000?(v/1000).toFixed(0)+'k':v }, grid: { color: getGridColor() }, border:{color:'rgba(128,128,128,0.1)'} }
      }
    }
  });
}

/* ---- SOURCE DONUT ---- */
function buildSourceChart() {
  destroyChart('sourceChart');
  const ctx = document.getElementById('sourceChart');
  if (!ctx) return;

  // Build legend
  const legend = document.getElementById('sourceLegend');
  if (legend) {
    legend.innerHTML = DATA.sources.labels.map((l,i) =>
      `<div class="legend-item"><div class="legend-dot" style="background:${DATA.sources.colors[i]};"></div>${l} ${DATA.sources.values[i]}%</div>`
    ).join('');
  }

  chartInstances['sourceChart'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: DATA.sources.labels,
      datasets: [{ data: DATA.sources.values, backgroundColor: DATA.sources.colors, borderWidth: 0, hoverOffset: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1e29', borderColor:'rgba(201,168,76,0.3)', borderWidth:1,
          titleColor:'#c9a84c', bodyColor:'#9b97a0',
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` }
        }
      }
    }
  });
}

/* ---- WEEKLY BAR ---- */
function buildWeekChart() {
  destroyChart('weekChart');
  const ctx = document.getElementById('weekChart');
  if (!ctx) return;
  chartInstances['weekChart'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'],
      datasets: [{
        data: DATA.weekly,
        backgroundColor: 'rgba(201,168,76,0.22)',
        borderColor: '#c9a84c',
        borderWidth: 1.5,
        borderRadius: 5,
        hoverBackgroundColor: 'rgba(201,168,76,0.4)',
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks:{font:{size:10},color:getTickColor()}, grid:{display:false}, border:{color:'rgba(128,128,128,0.1)'} },
        y: { ticks:{font:{size:10},color:getTickColor(),callback:v=>(v/1000).toFixed(0)+'k'}, grid:{color:getGridColor()}, border:{color:'rgba(128,128,128,0.1)'} }
      }
    }
  });
}

/* ---- DEVICE DONUT ---- */
function buildDeviceChart() {
  destroyChart('deviceChart');
  const ctx = document.getElementById('deviceChart');
  if (!ctx) return;
  chartInstances['deviceChart'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: DATA.devices.labels,
      datasets: [{ data: DATA.devices.values, backgroundColor: DATA.devices.colors, borderWidth: 0, hoverOffset: 5 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '62%',
      plugins: {
        legend: {
          display: true, position: 'bottom',
          labels: { font:{size:11}, color: getTickColor(), padding:12, boxWidth:10, boxHeight:10 }
        },
        tooltip: {
          backgroundColor:'#1a1e29', borderColor:'rgba(201,168,76,0.3)', borderWidth:1,
          titleColor:'#c9a84c', bodyColor:'#9b97a0',
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` }
        }
      }
    }
  });
}

/* ---- BOUNCE HORIZONTAL BAR ---- */
function buildBounceChart() {
  destroyChart('bounceChart');
  const ctx = document.getElementById('bounceChart');
  if (!ctx) return;
  const colors = DATA.bounceByPage.values.map(v => v>=70?'#e05c5c':v>=55?'#f0924a':'#3ec9a7');
  chartInstances['bounceChart'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: DATA.bounceByPage.labels,
      datasets: [{ label:'Bounce %', data: DATA.bounceByPage.values, backgroundColor: colors, borderWidth: 0, borderRadius: 4 }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { min:0, max:100, ticks:{font:{size:10},color:getTickColor(),callback:v=>v+'%'}, grid:{color:getGridColor()}, border:{color:'rgba(128,128,128,0.1)'} },
        y: { ticks:{font:{size:10},color:getTickColor()}, grid:{display:false}, border:{color:'rgba(128,128,128,0.1)'} }
      }
    }
  });
}

/* ---- TRAFFIC BIG (traffic section) ---- */
function buildTrafficBig() {
  buildTrafficChart('trafficBig', 30, DATA.daily30, 'LAST 30 DAYS');
}

/* ---- ENTRY/EXIT CHART ---- */
function buildEntryExitChart() {
  destroyChart('entryExitChart');
  const ctx = document.getElementById('entryExitChart');
  if (!ctx) return;
  chartInstances['entryExitChart'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: DATA.entryExit.labels,
      datasets: [
        { label:'Entry %', data: DATA.entryExit.entry, backgroundColor:'rgba(62,201,167,0.7)', borderRadius:4 },
        { label:'Exit %',  data: DATA.entryExit.exit,  backgroundColor:'rgba(224,92,92,0.7)',  borderRadius:4 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display:true, position:'top', labels:{font:{size:11},color:getTickColor(),boxWidth:10} }
      },
      scales: {
        x: { ticks:{font:{size:10},color:getTickColor()}, grid:{display:false}, border:{color:'rgba(128,128,128,0.1)'} },
        y: { ticks:{font:{size:10},color:getTickColor(),callback:v=>v+'%'}, grid:{color:getGridColor()}, border:{color:'rgba(128,128,128,0.1)'} }
      }
    }
  });
}

/* ---- BROWSER CHART ---- */
function buildBrowserChart() {
  destroyChart('browserChart');
  const ctx = document.getElementById('browserChart');
  if (!ctx) return;
  chartInstances['browserChart'] = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: DATA.browsers.labels,
      datasets: [{ data: DATA.browsers.values, backgroundColor: DATA.browsers.colors, borderWidth: 0, hoverOffset: 5 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display:true, position:'right', labels:{font:{size:11},color:getTickColor(),padding:10,boxWidth:10} },
        tooltip: {
          backgroundColor:'#1a1e29', borderColor:'rgba(201,168,76,0.3)', borderWidth:1,
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` }
        }
      }
    }
  });
}

/* ---- PRIORITY MATRIX (bubble chart) ---- */
function buildMatrixChart() {
  destroyChart('matrixChart');
  const ctx = document.getElementById('matrixChart');
  if (!ctx) return;
  const colors = ['#e05c5c','#e05c5c','#c9a84c','#f0924a','#5b9cf6','#5b9cf6','#3ec9a7','#3ec9a7'];
  chartInstances['matrixChart'] = new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: DATA.matrix.map((d,i) => ({
        label: d.label,
        data: [{ x: d.effort, y: d.impact, r: 12 }],
        backgroundColor: colors[i] + 'aa',
        borderColor: colors[i],
        borderWidth: 1.5,
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display:true, position:'bottom', labels:{font:{size:10},color:getTickColor(),padding:10,boxWidth:8,boxHeight:8} },
        tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label} — Impact: ${ctx.parsed.y}, Effort: ${ctx.parsed.x}` } }
      },
      scales: {
        x: { min:0, max:10, title:{display:true,text:'Effort →',color:getTickColor(),font:{size:11}}, ticks:{font:{size:10},color:getTickColor()}, grid:{color:getGridColor()}, border:{color:'rgba(128,128,128,0.1)'} },
        y: { min:0, max:10, title:{display:true,text:'Impact →',color:getTickColor(),font:{size:11}}, ticks:{font:{size:10},color:getTickColor()}, grid:{color:getGridColor()}, border:{color:'rgba(128,128,128,0.1)'} }
      }
    }
  });
}

/* ---- INIT ALL ---- */
function initAllCharts(days) {
  const data = days===7 ? DATA.daily7 : days===14 ? DATA.daily14 : DATA.daily30;
  buildTrafficChart('trafficChart', days, data);
  buildSourceChart();
  buildWeekChart();
  buildDeviceChart();
  buildBounceChart();
  buildTrafficBig();
  buildEntryExitChart();
  buildBrowserChart();
  buildMatrixChart();
}
