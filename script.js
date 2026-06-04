const state = {
  age: 0,
  sex: '',
  asa: '',
  functionalStatus: '',
  bmi: 0,
  neck: 0,
  creatinine: 0,
  surgeryType: '',
  surgeryDuration: '',
  emergency: false,
  ischemicHeartDisease: false,
  heartFailure: false,
  cerebrovascular: false,
  insulinDiabetes: false,
  recentRespInfection: false,
  hypoxemia: false,
  preopAnemia: false,
  snoring: false,
  tired: false,
  observedApnea: false,
  hypertension: false,
  historyVTE: false,
  activeCancer: false,
  bedRest: false,
  varicoseVeins: false,
  swollenLegs: false,
  hormoneTherapy: false,
  surgeryUnder1month: false,
  // DASI items will be initialized in createDASIControls
  // Caprini items will be initialized in createCapriniControls
};

const elements = {
  age: document.getElementById('age'),
  sex: document.getElementById('sex'),
  asa: document.getElementById('asa'),
  functionalStatus: document.getElementById('functionalStatus'),
  bmi: document.getElementById('bmi'),
  neck: document.getElementById('neck'),
  creatinine: document.getElementById('creatinine'),
  surgeryType: document.getElementById('surgeryType'),
  surgeryDuration: document.getElementById('surgeryDuration'),
  emergency: document.getElementById('emergency'),
  ischemicHeartDisease: document.getElementById('ischemicHeartDisease'),
  heartFailure: document.getElementById('heartFailure'),
  cerebrovascular: document.getElementById('cerebrovascular'),
  insulinDiabetes: document.getElementById('insulinDiabetes'),
  recentRespInfection: document.getElementById('recentRespInfection'),
  hypoxemia: document.getElementById('hypoxemia'),
  preopAnemia: document.getElementById('preopAnemia'),
  snoring: document.getElementById('snoring'),
  tired: document.getElementById('tired'),
  observedApnea: document.getElementById('observedApnea'),
  hypertension: document.getElementById('hypertension'),
  historyVTE: document.getElementById('historyVTE'),
  activeCancer: document.getElementById('activeCancer'),
  bedRest: document.getElementById('bedRest'),
  varicoseVeins: document.getElementById('varicoseVeins'),
  swollenLegs: document.getElementById('swollenLegs'),
  hormoneTherapy: document.getElementById('hormoneTherapy'),
  surgeryUnder1month: document.getElementById('surgeryUnder1month'),
  rcriScore: document.getElementById('rcriScore'),
  rcriText: document.getElementById('rcriText'),
  guptaScore: document.getElementById('guptaScore'),
  guptaText: document.getElementById('guptaText'),
  dasiScore: document.getElementById('dasiScore'),
  dasiText: document.getElementById('dasiText'),
  ariscatScore: document.getElementById('ariscatScore'),
  ariscatText: document.getElementById('ariscatText'),
  stopbangScore: document.getElementById('stopbangScore'),
  stopbangText: document.getElementById('stopbangText'),
  capriniScore: document.getElementById('capriniScore'),
    capriniPercent: document.getElementById('capriniPercent'),
  capriniText: document.getElementById('capriniText'),
};

const dasiItems = [
  { id: 'dasiPersonalCare', label: 'Taking care of self at home (eating, dressing, bathing, using toilet)', mets: 1.0 },
  { id: 'dasiWalkIndoors', label: 'Walking indoors on level ground', mets: 1.0 },
  { id: 'dasiWalkBlock', label: 'Walking 1-2 blocks on level ground at normal pace', mets: 2.41 },
  { id: 'dasiClimbStairs', label: 'Climbing a flight of stairs or walking up a hill', mets: 2.41 },
  { id: 'dasiLightActivity', label: 'Walking more than 2 blocks but not on hills or stairs', mets: 3.13 },
  { id: 'dasiModerateActivity', label: 'Moderate recreational activities (golf, bowling, dancing, doubles tennis)', mets: 4.0 },
  { id: 'dasiStrenuousSport', label: 'Strenuous sports (running, jogging, basketball, singles tennis, football, squash, skiing)', mets: 7.0 },
];

const capriniItems = [
  { id: 'capAge41to60', label: 'Age 41–60', points: 1, depends: s => s.age >= 41 && s.age <= 60 },
  { id: 'capAge61to74', label: 'Age 61–74', points: 2, depends: s => s.age >= 61 && s.age <= 74 },
  { id: 'capAge75over', label: 'Age ≥ 75', points: 3, depends: s => s.age >= 75 },
  { id: 'capBMI', label: 'BMI > 25', points: 1, depends: s => s.bmi > 25 },
  { id: 'capVaricoseVeins', label: 'Varicose veins', points: 1 },
  { id: 'capSwollenLegs', label: 'Swollen legs', points: 1 },
  { id: 'capHormoneTherapy', label: 'Estrogen / OCP / HRT', points: 1 },
  { id: 'capBedRest', label: 'Bed rest > 72 hours', points: 1 },
  { id: 'capSurgery1Month', label: 'Major surgery in last month', points: 1 },
  { id: 'capActiveCancer', label: 'Active cancer', points: 2 },
  { id: 'capHistoryVTE', label: 'History of DVT / PE', points: 3 },
];

function createDASIControls() {
  const section = document.createElement('section');
  section.innerHTML = '<h3>DASI Activities</h3>';
  dasiItems.forEach(item => {
    state[item.id] = false;
    const wrapper = document.createElement('div');
    wrapper.className = 'field-row checkbox-row';
    wrapper.innerHTML = `<label><input id="${item.id}" type="checkbox" /> ${item.label}</label>`;
    section.appendChild(wrapper);
    elements[item.id] = document.getElementById(item.id);
  });
  document.querySelector('.inputs').appendChild(section);
}

function createCapriniControls() {
  const section = document.createElement('section');
  section.innerHTML = '<h3>Caprini VTE Risk Factors</h3>';
  // Initialize all Caprini items in state
  capriniItems.forEach(item => {
    if (!state.hasOwnProperty(item.id)) {
      state[item.id] = false;
    }
  });
  // Add all Caprini items (skip age-based ones that auto-calculate, and BMI which is elsewhere)
  capriniItems.slice(4).forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-row checkbox-row';
    wrapper.innerHTML = `<label><input id="${item.id}" type="checkbox" /> ${item.label}</label>`;
    section.appendChild(wrapper);
    elements[item.id] = document.getElementById(item.id);
  });
  document.querySelector('.inputs').appendChild(section);
}

function bindListeners() {
  Object.keys(elements).forEach(key => {
    const el = elements[key];
    if (!el) return;
    if (el.tagName === 'INPUT' && el.type === 'checkbox') {
      el.addEventListener('input', () => {
        state[key] = el.checked;
        calculateAll();
      });
    } else if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
      el.addEventListener('input', () => {
        if (el.type === 'number') state[key] = parseFloat(el.value) || 0;
        else state[key] = el.value;
        calculateAll();
      });
    }
  });
}

function computeRCRI(data) {
  const highRisk = ['intraperitoneal', 'intrathoracic', 'vascular', 'upperAbdominal'].includes(data.surgeryType);
  let score = 0;
  score += highRisk ? 1 : 0;
  score += data.ischemicHeartDisease ? 1 : 0;
  score += data.heartFailure ? 1 : 0;
  score += data.cerebrovascular ? 1 : 0;
  score += data.insulinDiabetes ? 1 : 0;
  score += data.creatinine > 2.0 ? 1 : 0;
  let text = 'Low risk';
  if (score === 1) text = 'Mild increased risk';
  if (score === 2) text = 'Moderate risk';
  if (score >= 3) text = 'High risk';

  // Map RCRI points to approximate percentage risk of major cardiac complication
  let percent = 0.4;
  if (score === 0) percent = 0.4;
  else if (score === 1) percent = 0.9;
  else if (score === 2) percent = 6.6;
  else if (score >= 3) percent = 11.0;

  return { score, percent, text };
}

function computeGupta(data) {
  // Gupta Perioperative Cardiac Risk Calculator: estimates risk of MI or cardiac arrest
  const intercept = -6.62;
  const ageCoef = 0.027 * data.age;
  let sexCoef = 0;
  if (data.sex === 'female') sexCoef = -0.31;
  const asaCoef = data.asa === 3 ? 0.42 : data.asa === 4 ? 0.92 : data.asa === 5 ? 1.51 : 0;
  const funcCoef = data.functionalStatus === 'partiallyDependent' ? 0.35 : data.functionalStatus === 'totallyDependent' ? 0.77 : 0;
  const highRiskSurgery = ['intraperitoneal', 'intrathoracic', 'vascular'].includes(data.surgeryType) ? 1.15 : 0;
  const creatCoef = data.creatinine > 1.5 ? 0.65 : 0;
  const logit = intercept + ageCoef + sexCoef + asaCoef + funcCoef + highRiskSurgery + creatCoef;
  const probability = 1 / (1 + Math.exp(-logit));
  const percent = Math.round(probability * 1000) / 10;
  let text = 'Risk of MI or cardiac arrest.';
  if (percent < 1) text = 'Low risk';
  else if (percent < 5) text = 'Moderate risk';
  else text = 'Higher risk';
  return { score: percent.toFixed(1) + '%', text };
}

function computeDASI() {
  let maxMets = 1.0;
  dasiItems.forEach(item => {
    if (state[item.id]) {
      maxMets = Math.max(maxMets, item.mets);
    }
  });
  const score = maxMets.toFixed(2);
  return { score, text: `${score} METs (functional capacity)` };
}

function computeARISCAT(data) {
  let score = 0;
  if (data.age > 80) score += 23;
  else if (data.age > 50) score += 16;
  if (data.hypoxemia) score += 8;
  if (data.recentRespInfection) score += 17;
  if (data.preopAnemia) score += 11;
  if (data.surgeryType === 'upperAbdominal') score += 15;
  if (data.surgeryType === 'intrathoracic') score += 24;
  if (data.surgeryDuration === 'long') score += 16;
  if (data.emergency) score += 8;
  let text = 'Low risk';
  if (score >= 45) text = 'High risk';
  else if (score >= 26) text = 'Intermediate risk';
  return { score, text };
}

function computeStopBang(data) {
  let score = 0;
  score += data.snoring ? 1 : 0;
  score += data.tired ? 1 : 0;
  score += data.observedApnea ? 1 : 0;
  score += data.hypertension ? 1 : 0;
  score += data.bmi > 35 ? 1 : 0;
  score += data.age > 50 ? 1 : 0;
  score += data.neck >= 40 ? 1 : 0;
  score += data.sex === 'male' ? 1 : 0;
  let text = 'Low risk';
  if (score >= 5) text = 'High risk';
  else if (score >= 3) text = 'Intermediate risk';
  return { score, text };
}

function computeCaprini(data) {
  let score = 0;
  const age1 = data.age >= 41 && data.age <= 60;
  const age2 = data.age >= 61 && data.age <= 74;
  const age3 = data.age >= 75;
  if (age1) score += 1;
  if (age2) score += 2;
  if (age3) score += 3;
  if (data.bmi > 25) score += 1;
  if (data.varicoseVeins) score += 1;
  if (data.swollenLegs) score += 1;
  if (data.hormoneTherapy) score += 1;
  if (data.bedRest) score += 1;
  if (data.surgeryUnder1month) score += 1;
  if (data.activeCancer) score += 2;
  if (data.historyVTE) score += 3;
  let text = 'Low risk';
  let percent = 0.2;
  if (score >= 5) {
    text = 'Highest risk';
    percent = 10.7;
  } else if (score >= 3) {
    text = 'High risk';
    percent = 4.3;
  } else if (score >= 1) {
    text = 'Moderate risk';
    percent = 1.5;
  }
  return { score, percent, text };
}

function calculateAll() {
  const rcri = computeRCRI(state);
  const gupta = computeGupta(state);
  const dasi = computeDASI();
  const ariscat = computeARISCAT(state);
  const stopbang = computeStopBang(state);
  const caprini = computeCaprini(state);

  elements.rcriScore.textContent = rcri.score;
  elements.rcriText.textContent = `${rcri.text} — ≈${rcri.percent.toFixed(1)}% major cardiac complication`;
  elements.guptaScore.textContent = gupta.score;
  elements.guptaText.textContent = gupta.text;
  elements.dasiScore.textContent = dasi.score;
  elements.dasiText.textContent = dasi.text;
  elements.ariscatScore.textContent = ariscat.score;
  elements.ariscatText.textContent = ariscat.text;
  elements.stopbangScore.textContent = `${stopbang.score}`;
  elements.stopbangText.textContent = stopbang.text;
  elements.capriniScore.textContent = caprini.score;
    elements.capriniPercent.textContent = `${caprini.percent.toFixed(1)}% risk`;
  elements.capriniText.textContent = caprini.text;
}

createDASIControls();
createCapriniControls();
bindListeners();
calculateAll();
