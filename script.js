const state = {
  age: 65,
  sex: 'male',
  asa: 2,
  functionalStatus: 'independent',
  bmi: 28,
  neck: 40,
  creatinine: 1.0,
  surgeryType: 'intraperitoneal',
  surgeryDuration: 'long',
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
  nsqipScore: document.getElementById('nsqipScore'),
  nsqipText: document.getElementById('nsqipText'),
  dasiScore: document.getElementById('dasiScore'),
  dasiText: document.getElementById('dasiText'),
  ariscatScore: document.getElementById('ariscatScore'),
  ariscatText: document.getElementById('ariscatText'),
  stopbangScore: document.getElementById('stopbangScore'),
  stopbangText: document.getElementById('stopbangText'),
  capriniScore: document.getElementById('capriniScore'),
  capriniText: document.getElementById('capriniText'),
};

const dasiItems = [
  { id: 'dasiPersonalCare', label: 'Personal care (eat, dress, bathe)', points: 2.75 },
  { id: 'dasiWalkIndoors', label: 'Walk indoors', points: 2.75 },
  { id: 'dasiWalkBlock', label: 'Walk one block', points: 3.5 },
  { id: 'dasiClimbStairs', label: 'Climb one flight of stairs or walk uphill', points: 5.5 },
  { id: 'dasiRunShort', label: 'Run a short distance', points: 8 },
  { id: 'dasiLightActivity', label: 'Light recreational activities', points: 4 },
  { id: 'dasiModerateActivity', label: 'Moderate recreational activities', points: 6 },
  { id: 'dasiStrenuousSport', label: 'Strenuous sports', points: 7.5 },
  { id: 'dasiHeavyHousework', label: 'Heavy work around the house', points: 7.5 },
  { id: 'dasiYardWork', label: 'Yard work or gardening', points: 5.5 },
  { id: 'dasiSexualActivity', label: 'Sexual activity', points: 5 },
  { id: 'dasiHeavyLifting', label: 'Lift heavy objects or move furniture', points: 5.5 },
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
  section.innerHTML = '<h3>Caprini Expanded</h3>';
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
  return { score, text };
}

function computeGupta(data) {
  const intercept = -6.5794;
  const ageCoef = 0.0282 * data.age;
  const asaCoef = data.asa === 3 ? 0.5525 : data.asa === 4 ? 0.9811 : data.asa === 5 ? 1.6287 : 0;
  const funcCoef = data.functionalStatus !== 'independent' ? 0.6647 : 0;
  const surgeryCoef = ['intraperitoneal', 'intrathoracic', 'vascular'].includes(data.surgeryType) ? 1.1609 : 0;
  const creatCoef = data.creatinine > 1.5 ? 0.8304 : 0;
  const logit = intercept + ageCoef + asaCoef + funcCoef + surgeryCoef + creatCoef;
  const probability = 1 / (1 + Math.exp(-logit));
  const percent = Math.round(probability * 1000) / 10;
  let text = 'Estimated risk of MI or cardiac arrest.';
  if (percent < 1) text = 'Low risk';
  else if (percent < 5) text = 'Moderate risk';
  else text = 'Higher risk';
  return { score: percent.toFixed(1) + '%', text };
}

function computeNSQIP(data) {
  let logit = -4.4;
  if (data.age >= 70) logit += 0.6;
  else if (data.age >= 60) logit += 0.3;
  if (data.asa === 4) logit += 0.7;
  if (data.asa === 5) logit += 1.2;
  if (data.functionalStatus !== 'independent') logit += 0.8;
  if (data.emergency) logit += 0.7;
  if (data.recentRespInfection) logit += 0.5;
  if (data.hypertension) logit += 0.2;
  if (data.heartFailure) logit += 0.4;
  if (data.bmi >= 35) logit += 0.4;
  if (data.activeCancer) logit += 0.5;
  if (data.creatinine > 1.5) logit += 0.3;
  if (['intraperitoneal', 'intrathoracic', 'vascular', 'upperAbdominal'].includes(data.surgeryType)) logit += 0.5;
  if (data.surgeryDuration === 'long') logit += 0.3;
  const probability = 1 / (1 + Math.exp(-logit));
  const percent = Math.round(probability * 1000) / 10;
  let text = 'Approximate overall surgical complication risk.';
  if (percent < 5) text = 'Lower risk.';
  else if (percent < 10) text = 'Moderate risk.';
  else text = 'Higher risk.';
  return { score: percent.toFixed(1) + '%', text };
}

function computeDASI() {
  let total = 0;
  dasiItems.forEach(item => {
    const control = document.getElementById(item.id);
    if (control && control.checked) total += item.points;
  });
  const vo2 = 0.43 * total + 9.6;
  const mets = Math.round((vo2 / 3.5) * 10) / 10;
  return { score: total.toFixed(1), text: `${mets.toFixed(1)} METs estimate` };
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
  if (score >= 5) text = 'Highest risk';
  else if (score >= 3) text = 'High risk';
  else if (score >= 1) text = 'Moderate risk';
  return { score, text };
}

function calculateAll() {
  const rcri = computeRCRI(state);
  const gupta = computeGupta(state);
  const nsqip = computeNSQIP(state);
  const dasi = computeDASI();
  const ariscat = computeARISCAT(state);
  const stopbang = computeStopBang(state);
  const caprini = computeCaprini(state);

  elements.rcriScore.textContent = rcri.score;
  elements.rcriText.textContent = rcri.text;
  elements.guptaScore.textContent = gupta.score;
  elements.guptaText.textContent = gupta.text;
  elements.nsqipScore.textContent = nsqip.score;
  elements.nsqipText.textContent = nsqip.text;
  elements.dasiScore.textContent = dasi.score;
  elements.dasiText.textContent = dasi.text;
  elements.ariscatScore.textContent = ariscat.score;
  elements.ariscatText.textContent = ariscat.text;
  elements.stopbangScore.textContent = `${stopbang.score}/8`;
  elements.stopbangText.textContent = stopbang.text;
  elements.capriniScore.textContent = caprini.score;
  elements.capriniText.textContent = caprini.text;
}

createDASIControls();
createCapriniControls();
bindListeners();
calculateAll();
