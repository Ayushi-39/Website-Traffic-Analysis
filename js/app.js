/* =============================================
   APP.JS — Navigation, UI, Interactions
   Pratinik Infotech · Project 3
   ============================================= */

/* ---- SECTION NAVIGATION ---- */
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const sec = document.getElementById('section-' + id);
  if (sec) sec.classList.add('active');

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(id)) {
      item.classList.add('active');
    }
  });

  // Lazy-init section-specific charts
  if (id === 'traffic') { buildBounceChart(); buildTrafficBig(); buildHeatmap(); }
  if (id === 'behavior') { buildEntryExitChart(); buildBrowserChart(); buildGeo(); buildFlows(); }
  if (id === 'recommendations') { buildRecos(); buildMatrixChart(); }
}

/* ---- DATE RANGE SELECTOR ---- */
function updateRange() {
  const days = parseInt(document.getElementById('rangeSelect').value);
  const data = days === 7 ? DATA.daily7 : days === 14 ? DATA.daily14 : DATA.daily30;

  // Update KPI cards
  const kpi = DATA.kpiByRange[days];
  document.getElementById('kpi-views').textContent    = kpi.views;
  document.getElementById('kpi-visitors').textContent = kpi.visitors;
  document.getElementById('kpi-bounce').textContent   = kpi.bounce;
  document.getElementById('kpi-duration').textContent = kpi.duration;

  // Update traffic label
  document.getElementById('trafficLabel').textContent = `LAST ${days} DAYS`;

  // Rebuild traffic chart
  buildTrafficChart('trafficChart', days, data);

  // Update report date badge
  const dateEl = document.getElementById('reportDate');
  if (days === 7)  dateEl.textContent = 'Apr 13–19, 2026';
  if (days === 14) dateEl.textContent = 'Apr 6–19, 2026';
  if (days === 30) dateEl.textContent = 'Apr 1–30, 2026';
}

/* ---- THEME TOGGLE ---- */
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');

  // Re-render all charts with updated colors
  const days = parseInt(document.getElementById('rangeSelect').value);
  initAllCharts(days);
  buildHeatmap();
}

function loadTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
  }
}

/* ---- PAGES TABLE ---- */
let sortKey = 'views';
let sortAsc = false;
let pagesData = [...DATA.pages];

function renderPagesTable(data) {
  const tbody = document.getElementById('pagesTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map((p, i) => {
    const pillMap = {
      entry:  `<span class="pill pill-entry">Entry</span>`,
      exit:   `<span class="pill pill-exit">Exit</span>`,
      top:    `<span class="pill pill-top">Top</span>`,
      normal: `<span class="pill pill-normal">—</span>`
    };
    const bounceColor = p.bounce >= 70 ? '#e05c5c' : p.bounce >= 55 ? '#f0924a' : '#3ec9a7';
    return `<tr>
      <td style="color:var(--text3);">${i+1}</td>
      <td style="font-family:monospace;color:var(--text);">${p.url}</td>
      <td style="color:var(--text);">${p.views.toLocaleString()}</td>
      <td>${p.unique.toLocaleString()}</td>
      <td style="color:${bounceColor};font-weight:500;">${p.bounce}%</td>
      <td>${p.time}</td>
      <td>${pillMap[p.type]}</td>
    </tr>`;
  }).join('');
}

function sortTable(key) {
  if (sortKey === key) sortAsc = !sortAsc; else { sortKey = key; sortAsc = false; }
  const sorted = [...pagesData].sort((a, b) => {
    const va = key === 'url' ? a[key] : typeof a[key] === 'string' ? parseFloat(a[key]) : a[key];
    const vb = key === 'url' ? b[key] : typeof b[key] === 'string' ? parseFloat(b[key]) : b[key];
    return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
  });
  renderPagesTable(sorted);
}

function filterPages() {
  const q = document.getElementById('pageSearch').value.toLowerCase();
  const filtered = DATA.pages.filter(p => p.url.includes(q));
  pagesData = filtered;
  renderPagesTable(filtered);
}

/* ---- FUNNEL VIZ ---- */
function buildFunnel() {
  const el = document.getElementById('funnelViz');
  if (!el) return;
  const max = DATA.funnel[0].value;
  el.innerHTML = DATA.funnel.map(step => {
    const pct = Math.round(step.value / max * 100);
    return `<div class="funnel-step">
      <div class="funnel-label-row">
        <span class="funnel-label">${step.label}</span>
        <span class="funnel-val">${step.value.toLocaleString()}</span>
      </div>
      <div class="funnel-bar-bg">
        <div class="funnel-bar-fill" style="width:${pct}%;background:${step.color};">${pct}%</div>
      </div>
    </div>`;
  }).join('');
}

/* ---- HEATMAP ---- */
function buildHeatmap() {
  const el = document.getElementById('heatmapViz');
  if (!el) return;
  const max = Math.max(...DATA.hourly);
  const isLight = document.body.classList.contains('light-theme');
  const hours = DATA.hourly.map((v, i) => {
    const intensity = v / max;
    const alpha = 0.1 + intensity * 0.85;
    const bg = isLight
      ? `rgba(154,122,40,${alpha})`
      : `rgba(201,168,76,${alpha})`;
    const label = i < 10 ? `0${i}h` : `${i}h`;
    return `<div class="heatmap-cell" style="background:${bg};" title="${label}: ${v} avg visits">${label}</div>`;
  });

  el.innerHTML = `
    <p style="font-size:11px;color:var(--text3);margin-bottom:8px;">Darker = more traffic. Hover for details.</p>
    <div class="heatmap-grid" style="grid-template-columns:repeat(8,1fr);">
      ${hours.join('')}
    </div>
    <p style="font-size:11px;color:var(--text3);margin-top:8px;">Peak hour: <span style="color:var(--gold2);">${DATA.hourly.indexOf(max)}:00 – ${DATA.hourly.indexOf(max)+1}:00</span></p>
  `;
}

/* ---- NAVIGATION FLOWS ---- */
function buildFlows() {
  const el = document.getElementById('flowViz');
  if (!el) return;
  el.innerHTML = DATA.flows.map(f => {
    const nodes = f.nodes.map(n => `<div class="flow-node">${n}</div>`).join('<div class="flow-arrow">→</div>');
    const endClass = f.endType === 'bad' ? 'end-bad' : 'end-good';
    return `<div class="flow-row">
      ${nodes}
      <div class="flow-arrow">→</div>
      <div class="flow-node ${endClass}">${f.end}</div>
      <span class="flow-pct">${f.pct} of sessions</span>
    </div>`;
  }).join('');
}

/* ---- GEO VIZ ---- */
function buildGeo() {
  const el = document.getElementById('geoViz');
  if (!el) return;
  el.innerHTML = DATA.geo.map(g => `
    <div class="geo-row">
      <div class="geo-flag">${g.flag}</div>
      <div class="geo-name">${g.name}</div>
      <div class="geo-bar-bg"><div class="geo-bar-fill" style="width:${g.pct}%;"></div></div>
      <div class="geo-pct">${g.pct}%</div>
    </div>
  `).join('');
}

/* ---- RECOMMENDATIONS ---- */
function buildRecos() {
  const el = document.getElementById('recoGrid');
  if (!el || el.children.length > 0) return;
  el.innerHTML = DATA.recommendations.map(r => `
    <div class="reco-card ${r.color}">
      <div class="reco-num ${r.color}">${r.num}</div>
      <div class="reco-head">${r.head}</div>
      <div class="reco-body">${r.body}</div>
      <span class="reco-tag ${r.tagClass}">${r.tag}</span>
    </div>
  `).join('');
}

/* ---- CSV EXPORT ---- */
function exportCSV() {
  const headers = ['Page URL','Views','Unique Visitors','Bounce Rate','Avg Time','Type'];
  const rows = DATA.pages.map(p => [p.url, p.views, p.unique, p.bounce+'%', p.time, p.type]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'traffic_analysis_pratinik.csv';
  a.click();
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initAllCharts(30);
  renderPagesTable(DATA.pages);
  buildFunnel();
  buildHeatmap();
  buildFlows();
  buildGeo();
});
