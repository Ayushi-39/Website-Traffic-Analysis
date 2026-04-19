/* =============================================
   DATA.JS — All mock analytics data
   Pratinik Infotech · Project 3
   ============================================= */

const DATA = {

  /* ---- Daily traffic (30 days) ---- */
  daily30: [3100,2900,3400,4200,3800,5100,6100,6400,5700,4800,
            4100,3900,4400,5200,5800,5400,6200,5900,5100,4600,
            4200,4800,5300,5700,6000,5500,4900,4400,3800,3200],

  daily14: [4200,4800,5300,5700,6000,5500,4900,4400,3800,3200,4100,4700,5400,6100],

  daily7:  [4900,4400,3800,3200,4100,4700,5400],

  /* ---- Weekly sessions (8 weeks) ---- */
  weekly: [8200,8900,9400,9100,10200,11000,11800,12400],

  /* ---- Traffic sources ---- */
  sources: {
    labels: ['Organic','Direct','Referral','Social'],
    values: [42, 28, 18, 12],
    colors: ['#c9a84c','#3ec9a7','#5b9cf6','#f0924a']
  },

  /* ---- Pages ---- */
  pages: [
    { url:'/home',      views:38200, unique:29100, bounce:42, time:'3m 10s', type:'entry' },
    { url:'/products',  views:27500, unique:21000, bounce:55, time:'2m 45s', type:'top' },
    { url:'/blog',      views:21300, unique:18200, bounce:48, time:'4m 02s', type:'entry' },
    { url:'/pricing',   views:18900, unique:15400, bounce:78, time:'1m 12s', type:'exit' },
    { url:'/contact',   views:11800, unique: 9800, bounce:61, time:'1m 55s', type:'normal' },
    { url:'/about',     views: 8200, unique: 7100, bounce:53, time:'2m 18s', type:'normal' },
    { url:'/faq',       views: 5900, unique: 5100, bounce:44, time:'3m 30s', type:'normal' },
    { url:'/login',     views: 4700, unique: 4400, bounce:35, time:'1m 05s', type:'normal' },
    { url:'/signup',    views: 3100, unique: 3000, bounce:28, time:'2m 40s', type:'top' },
    { url:'/blog/post-1', views: 2800, unique: 2600, bounce:50, time:'5m 15s', type:'normal' },
  ],

  /* ---- Bounce rates ---- */
  bounceByPage: {
    labels: ['/home','/products','/blog','/pricing','/contact','/about'],
    values: [42, 55, 48, 78, 61, 53]
  },

  /* ---- Devices ---- */
  devices: {
    labels: ['Mobile','Desktop','Tablet'],
    values: [58, 33, 9],
    colors: ['#c9a84c','#3ec9a7','#5b9cf6']
  },

  /* ---- Navigation flows ---- */
  flows: [
    { nodes:['Home','Products','Pricing'], end:'Exit',     endType:'bad',  pct:'34%' },
    { nodes:['Home','Blog','Products'],    end:'Contact',  endType:'good', pct:'21%' },
    { nodes:['Blog','Home'],              end:'Exit',     endType:'bad',  pct:'19%' },
    { nodes:['Pricing','Contact'],        end:'Conversion', endType:'good', pct:'11%' },
    { nodes:['Social','Blog','Products'], end:'Contact',  endType:'good', pct:'8%' },
  ],

  /* ---- Conversion funnel ---- */
  funnel: [
    { label:'Total Visitors',   value:43210, color:'#c9a84c' },
    { label:'Engaged (>30s)',   value:18140, color:'#3ec9a7' },
    { label:'Pricing Viewed',   value: 6912, color:'#5b9cf6' },
    { label:'Contacted',        value: 2160, color:'#f0924a' },
    { label:'Converted',        value:  901, color:'#a78bfa' },
  ],

  /* ---- Entry / Exit comparison ---- */
  entryExit: {
    labels: ['/home','/blog','/products','/pricing','/contact'],
    entry: [38, 23, 15, 12, 12],
    exit:  [18, 22, 20, 30, 10]
  },

  /* ---- Browsers ---- */
  browsers: {
    labels: ['Chrome','Safari','Firefox','Edge','Other'],
    values: [62, 19, 9, 6, 4],
    colors: ['#5b9cf6','#3ec9a7','#f0924a','#c9a84c','#9b97a0']
  },

  /* ---- Geographic ---- */
  geo: [
    { flag:'🇮🇳', name:'India',          pct:34 },
    { flag:'🇺🇸', name:'United States',  pct:22 },
    { flag:'🇬🇧', name:'United Kingdom', pct:11 },
    { flag:'🇩🇪', name:'Germany',        pct: 8 },
    { flag:'🇨🇦', name:'Canada',         pct: 6 },
    { flag:'🇦🇺', name:'Australia',      pct: 5 },
    { flag:'🌍', name:'Others',          pct:14 },
  ],

  /* ---- Hourly heatmap (avg visits per hour, 0-23) ---- */
  hourly: [80,40,20,15,12,30,120,280,420,510,560,540,490,510,530,570,580,520,440,380,310,240,180,120],

  /* ---- Recommendations ---- */
  recommendations: [
    {
      num:'01', color:'gold',
      head:'Fix the Pricing page — 78% bounce rate',
      body:'Add a comparison table, FAQ section, and a visible CTA above the fold. A/B test button copy ("Get started" vs "See plans"). Current page loses 4 in 5 visitors.',
      tag:'High Priority', tagClass:'high'
    },
    {
      num:'02', color:'teal',
      head:'Improve the Home → Pricing conversion funnel',
      body:'34% of sessions drop off at Pricing. Add social proof — testimonials, client logos, trust badges — between the Products and Pricing pages to reduce friction.',
      tag:'High Priority', tagClass:'high'
    },
    {
      num:'03', color:'blue',
      head:'Invest more in Blog content',
      body:'Blog drives 23% of organic traffic and is a strong entry point. Add internal links to Products pages. Target 2+ posts per week. Optimize older posts for SEO.',
      tag:'Medium Priority', tagClass:'medium'
    },
    {
      num:'04', color:'orange',
      head:'Scale social traffic from 12%',
      body:'Add share buttons to Blog posts. Launch a LinkedIn + Instagram content calendar with repurposed blog content. Run 1 paid social campaign per month.',
      tag:'Low Priority', tagClass:'low'
    },
  ],

  /* ---- Priority matrix (impact vs effort, 0-10) ---- */
  matrix: [
    { label:'Fix Pricing page',       impact:9.2, effort:3.1 },
    { label:'Funnel optimization',    impact:8.5, effort:5.4 },
    { label:'Blog frequency',         impact:7.0, effort:2.8 },
    { label:'Social scaling',         impact:5.5, effort:6.0 },
    { label:'Mobile optimization',    impact:7.8, effort:4.2 },
    { label:'SEO audit',              impact:8.0, effort:7.5 },
    { label:'Live chat',              impact:6.0, effort:5.0 },
    { label:'Email capture',          impact:6.8, effort:2.5 },
  ],

  /* ---- KPI data per range ---- */
  kpiByRange: {
    7:  { views:'31,200', visitors:'11,400', bounce:'57.1%', duration:'2m 20s' },
    14: { views:'63,800', visitors:'22,900', bounce:'58.0%', duration:'2m 17s' },
    30: { views:'128,450', visitors:'43,210', bounce:'58.3%', duration:'2m 14s' },
  }
};
