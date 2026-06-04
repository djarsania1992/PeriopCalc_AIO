const state = {
  age: null,
  sex: '',
  asa: '',
  functionalStatus: '',
  bmi: null,
  neck: null,
  creatinine: null,
  surgeryType: '',
  surgeryDuration: '',
  emergency: false,
  ischemicHeartDisease: false,
  heartFailure: false,
  cerebrovascular: false,
  insulinDiabetes: false,
  recentRespInfection: false,
  preopAnemia: false,
  snoring: false,
  tired: false,
  observedApnea: false,
  hypertension: false,
  spO2: '',
  historyVTE: false,
  capriniSurgeryType: '',
  capRecentMajorSurgery: false,
  capRecentCHF: false,
  capRecentSepsis: false,
  capRecentPneumonia: false,
  capRecentPlasterCast: false,
  capRecentFracture: false,
  capRecentStroke: false,
  capRecentTrauma: false,
  capRecentSpinalCordInjury: false,
  capCentralAccess: false,
  capFamilyHistory: false,
  capPositiveFactorV: false,
  capProthrombin: false,
  capHomocysteine: false,
  capLupus: false,
  capAnticardiolipin: false,
  capHIT: false,
  capOtherThrombophilia: false,
  capriniMobility: 'normal',
  capIBD: false,
  capAcuteMI: false,
  capCOPD: false,
  capMalignancy: false,
  capOtherRiskFactors: false,
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
  spO2: document.getElementById('spO2'),
  validationMessage: document.getElementById('validationMessage'),
  emergency: document.getElementById('emergency'),
  ischemicHeartDisease: document.getElementById('ischemicHeartDisease'),
  heartFailure: document.getElementById('heartFailure'),
  cerebrovascular: document.getElementById('cerebrovascular'),
  insulinDiabetes: document.getElementById('insulinDiabetes'),
  recentRespInfection: document.getElementById('recentRespInfection'),
  preopAnemia: document.getElementById('preopAnemia'),
  snoring: document.getElementById('snoring'),
  tired: document.getElementById('tired'),
  observedApnea: document.getElementById('observedApnea'),
  hypertension: document.getElementById('hypertension'),
  rcriScore: document.getElementById('rcriScore'),
  rcriText: document.getElementById('rcriText'),
  guptaScore: document.getElementById('guptaScore'),
  guptaText: document.getElementById('guptaText'),
  dasiPoints: document.getElementById('dasiPoints'),
  dasiMets: document.getElementById('dasiMets'),
  ariscatScore: document.getElementById('ariscatScore'),
  ariscatText: document.getElementById('ariscatText'),
  ariscatPct: document.getElementById('ariscatPct'),
  stopbangScore: document.getElementById('stopbangScore'),
  stopbangText: document.getElementById('stopbangText'),
  capriniScore: document.getElementById('capriniScore'),
  capriniPercent: document.getElementById('capriniPercent'),
  capriniText: document.getElementById('capriniText'),
};

const dasiItems = [
  { id: 'dasiPersonalCare', label: 'Take care of self — eating, dressing, bathing, using the toilet', points: 2.75 },
  { id: 'dasiWalkIndoors', label: 'Walk indoors', points: 1.75 },
  { id: 'dasiWalkBlock', label: 'Walk 1–2 blocks on level ground', points: 2.75 },
  { id: 'dasiClimbStairs', label: 'Climb a flight of stairs or walk up a hill', points: 5.5 },
  { id: 'dasiRunShort', label: 'Run a short distance', points: 8.0 },
  { id: 'dasiLightHousework', label: 'Do light work around the house — e.g. dusting, washing dishes', points: 2.7 },
  { id: 'dasiModerateHousework', label: 'Do moderate work around the house — e.g. vacuuming, sweeping floors, carrying groceries', points: 3.5 },
  { id: 'dasiHeavyHousework', label: 'Do heavy work around the house — e.g. scrubbing floors, lifting or moving heavy furniture', points: 8.0 },
  { id: 'dasiYardwork', label: 'Do yardwork — e.g. raking leaves, weeding, pushing a power mower', points: 4.5 },
  { id: 'dasiSexualRelations', label: 'Have sexual relations', points: 5.25 },
  { id: 'dasiModerateRecreation', label: 'Participate in moderate recreational activities — e.g. golf, bowling, dancing, doubles tennis, throwing a baseball or football', points: 6.0 },
  { id: 'dasiStrenuousSport', label: 'Participate in strenuous sports — e.g. swimming, singles tennis, football, basketball, skiing', points: 7.5 },
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
    const input = wrapper.querySelector('input');
    elements[item.id] = input;
    input.addEventListener('input', () => {
      state[item.id] = input.checked;
      calculateAll();
    });
  });
  document.querySelector('.inputs').appendChild(section);
}

function createCapriniControls() {
  const section = document.createElement('section');
  section.innerHTML = `
    <h3>Caprini VTE Risk Factors</h3>
    <div class="field-row"><a href="caprini_input_description.html" target="_blank" rel="noopener">Caprini input definitions</a></div>
  `;

  const addCheckbox = (container, id, label) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-row checkbox-row';
    wrapper.innerHTML = `<label><input id="${id}" type="checkbox" /> ${label}</label>`;
    container.appendChild(wrapper);
    const input = wrapper.querySelector('input');
    elements[id] = input;
    state[id] = false;
  };

  const addSelect = (id, label, options, defaultValue = '') => {
    const row = document.createElement('div');
    row.className = 'field-row';
    row.innerHTML = `
      <label for="${id}">${label}</label>
      <select id="${id}">
        ${options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
      </select>`;
    section.appendChild(row);
    elements[id] = row.querySelector(`#${id}`);
    state[id] = defaultValue;
  };

  addSelect('capriniSurgeryType', 'Type of surgery (Caprini)', [
    { value: '', label: 'Select...' },
    { value: 'minor', label: 'Minor (<45 min)' },
    { value: 'major', label: 'Major >45 min / laparoscopic >45 min / arthroscopic' },
    { value: 'arthroplasty', label: 'Elective major lower extremity arthroplasty' },
  ], '');

  const recentSection = document.createElement('div');
  recentSection.className = 'field-row';
  recentSection.innerHTML = `<strong>Recent (<1 month) events</strong>`;
  section.appendChild(recentSection);
  addCheckbox(section, 'capRecentMajorSurgery', 'Major surgery');
  addCheckbox(section, 'capRecentCHF', 'CHF');
  addCheckbox(section, 'capRecentSepsis', 'Sepsis');
  addCheckbox(section, 'capRecentPneumonia', 'Pneumonia');
  addCheckbox(section, 'capRecentPlasterCast', 'Immobilizing plaster cast');
  addCheckbox(section, 'capRecentFracture', 'Hip, pelvis, or leg fracture');
  addCheckbox(section, 'capRecentStroke', 'Stroke');
  addCheckbox(section, 'capRecentTrauma', 'Multiple trauma');
  addCheckbox(section, 'capRecentSpinalCordInjury', 'Acute spinal cord injury causing paralysis');

  addSelect('capriniMobility', 'Mobility', [
    { value: 'normal', label: 'Normal, out of bed' },
    { value: 'medicalBedRest', label: 'Medical patient currently on bed rest' },
    { value: 'confined72', label: 'Patient confined to bed >72 hours' },
  ], 'normal');

  const warningRow = document.createElement('div');
  warningRow.className = 'field-row';
  warningRow.innerHTML = `<p id="capriniOptionalWarning" class="caprini-warning" style="display:none">Score < 9 — consider reviewing additional Caprini criteria below to reach highest risk threshold.</p>`;
  section.appendChild(warningRow);

  const venousContainer = document.createElement('div');
  venousContainer.className = 'field-row';
  venousContainer.innerHTML = `
    <div class="collapsible collapsed" id="capriniVenous">
      <div class="toggle" id="capriniVenousToggle">Venous disease or clotting disorder <span>▸</span></div>
      <div class="content" id="capriniVenousContent"></div>
    </div>
  `;
  section.appendChild(venousContainer);
  const venousContent = venousContainer.querySelector('#capriniVenousContent');
  addCheckbox(venousContent, 'capVaricoseVeins', 'Varicose veins');
  addCheckbox(venousContent, 'capSwollenLegs', 'Current swollen legs');
  addCheckbox(venousContent, 'capCentralAccess', 'Current central venous access');
  addCheckbox(venousContent, 'historyVTE', 'History of DVT / PE');
  addCheckbox(venousContent, 'capFamilyHistory', 'Family history of thrombosis');
  addCheckbox(venousContent, 'capPositiveFactorV', 'Positive Factor V Leiden');
  addCheckbox(venousContent, 'capProthrombin', 'Positive prothrombin 20210A');
  addCheckbox(venousContent, 'capHomocysteine', 'Elevated serum homocystine');
  addCheckbox(venousContent, 'capLupus', 'Positive lupus anticoagulant');
  addCheckbox(venousContent, 'capAnticardiolipin', 'Elevated anticardiolipin antibody');
  addCheckbox(venousContent, 'capHIT', 'Heparin induced thrombocytopenia');
  addCheckbox(venousContent, 'capOtherThrombophilia', 'Other congenital or acquired thrombophilia');

  const otherContainer = document.createElement('div');
  otherContainer.className = 'field-row';
  otherContainer.innerHTML = `
    <div class="collapsible collapsed" id="capriniOther">
      <div class="toggle" id="capriniOtherToggle">Other present and past history <span>▸</span></div>
      <div class="content" id="capriniOtherContent"></div>
    </div>
  `;
  section.appendChild(otherContainer);
  const otherContent = otherContainer.querySelector('#capriniOtherContent');
  addCheckbox(otherContent, 'capIBD', 'History of inflammatory bowel disease');
  addCheckbox(otherContent, 'capAcuteMI', 'Acute MI');
  addCheckbox(otherContent, 'capCOPD', 'COPD');
  addCheckbox(otherContent, 'capMalignancy', 'Present or previous malignancy');
  addCheckbox(otherContent, 'capOtherRiskFactors', 'Other risk factors');
  const bmiNote = document.createElement('div');
  bmiNote.className = 'field-row';
  bmiNote.textContent = 'BMI > 25 points are calculated automatically from the BMI field above.';
  otherContent.appendChild(bmiNote);

  elements.capriniOptionalWarning = section.querySelector('#capriniOptionalWarning');

  const venToggle = venousContainer.querySelector('#capriniVenousToggle');
  const venBox = venousContainer.querySelector('#capriniVenous');
  const otherToggle = otherContainer.querySelector('#capriniOtherToggle');
  const otherBox = otherContainer.querySelector('#capriniOther');
  const toggleBox = box => {
    box.classList.toggle('collapsed');
    const chevron = box.querySelector('.toggle span');
    chevron.textContent = box.classList.contains('collapsed') ? '▸' : '▾';
  };
  venToggle.addEventListener('click', () => toggleBox(venBox));
  otherToggle.addEventListener('click', () => toggleBox(otherBox));

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
        if (el.type === 'number') {
          state[key] = el.value === '' ? null : parseFloat(el.value);
        } else {
          state[key] = el.value;
        }
        calculateAll();
      });
    }
  });
}

function isBlank(value) {
  return value === null || value === '' || Number.isNaN(value);
}

function getMissingFields(data, definitions) {
  return definitions.filter(field => isBlank(data[field.key])).map(field => field.label);
}

function renderPlaceholderResult(resultElement, textElement, percentElement) {
  if (resultElement) resultElement.textContent = '—';
  if (textElement) textElement.textContent = 'Incomplete inputs';
  if (percentElement) percentElement.textContent = '';
}

function updateFieldValidation(data, definitions) {
  const invalidKeys = new Set(definitions.filter(field => isBlank(data[field.key])).map(field => field.key));
  definitions.forEach(field => {
    const el = elements[field.key];
    if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT')) {
      el.classList.toggle('invalid', invalidKeys.has(field.key));
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
  const highRiskSurgery = ['intraperitoneal', 'intrathoracic', 'vascular', 'upperAbdominal'].includes(data.surgeryType) ? 1.15 : 0;
  const durationCoef = data.surgeryDuration !== 'short' ? 0.2 : 0;
  const creatCoef = data.creatinine > 1.5 ? 0.65 : 0;
  const logit = intercept + ageCoef + sexCoef + asaCoef + funcCoef + highRiskSurgery + durationCoef + creatCoef;
  const probability = 1 / (1 + Math.exp(-logit));
  const percent = Math.round(probability * 1000) / 10;
  let text = 'Risk of MI or cardiac arrest.';
  if (percent < 1) text = 'Low risk';
  else if (percent < 5) text = 'Moderate risk';
  else text = 'Higher risk';
  return { score: percent.toFixed(1) + '%', text };
}

function computeDASI() {
  let totalPoints = 0;
  dasiItems.forEach(item => {
    if (state[item.id]) {
      totalPoints += item.points;
    }
  });
  const vo2Peak = 0.43 * totalPoints + 9.6;
  const mets = vo2Peak / 3.5;
  return {
    points: totalPoints.toFixed(2),
    mets,
  };
}

function computeARISCAT(data) {
  let score = 0;
  if (data.age > 80) score += 16;
  else if (data.age >= 51) score += 3;
  if (data.spO2 === '91-95') score += 8;
  else if (data.spO2 === '<=90') score += 24;
  if (data.recentRespInfection) score += 17;
  if (data.preopAnemia) score += 11;
  if (data.surgeryType === 'upperAbdominal') score += 15;
  else if (data.surgeryType === 'intrathoracic') score += 24;
  if (data.surgeryDuration === 'medium') score += 16;
  else if (data.surgeryDuration === 'long') score += 23;
  if (data.emergency) score += 8;
  let text = 'Low risk';
  let percent = '1.6%';
  if (score >= 45) {
    text = 'High risk';
    percent = '42.1%';
  } else if (score >= 26) {
    text = 'Intermediate risk';
    percent = '13.3%';
  }
  return { score, text, percent };
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
  if (data.age >= 41 && data.age <= 60) score += 1;
  else if (data.age >= 61 && data.age <= 74) score += 2;
  else if (data.age >= 75) score += 3;

  if (data.capriniSurgeryType === 'minor') score += 1;
  else if (data.capriniSurgeryType === 'major') score += 2;
  else if (data.capriniSurgeryType === 'arthroplasty') score += 5;

  if (data.capRecentMajorSurgery) score += 1;
  if (data.capRecentCHF) score += 1;
  if (data.capRecentSepsis) score += 1;
  if (data.capRecentPneumonia) score += 1;
  if (data.capRecentPlasterCast) score += 2;
  if (data.capRecentFracture) score += 5;
  if (data.capRecentStroke) score += 5;
  if (data.capRecentTrauma) score += 5;
  if (data.capRecentSpinalCordInjury) score += 5;

  if (data.capVaricoseVeins) score += 1;
  if (data.capSwollenLegs) score += 1;
  if (data.capCentralAccess) score += 2;
  if (data.historyVTE) score += 3;
  if (data.capFamilyHistory) score += 3;
  if (data.capPositiveFactorV) score += 3;
  if (data.capProthrombin) score += 3;
  if (data.capHomocysteine) score += 3;
  if (data.capLupus) score += 3;
  if (data.capAnticardiolipin) score += 3;
  if (data.capHIT) score += 3;
  if (data.capOtherThrombophilia) score += 3;

  if (data.capriniMobility === 'medicalBedRest') score += 1;
  else if (data.capriniMobility === 'confined72') score += 2;

  if (data.capIBD) score += 1;
  if (data.bmi > 25) score += 1;
  if (data.capAcuteMI) score += 1;
  if (data.capCOPD) score += 1;
  if (data.capMalignancy) score += 2;
  if (data.capOtherRiskFactors) score += 1;

  let text = 'Lowest';
  let percent = 0.0;
  if (score >= 9) {
    text = 'Highest';
    percent = 10.7;
  } else if (score >= 7) {
    text = 'High';
    percent = 4.0;
  } else if (score >= 5) {
    text = 'High';
    percent = 1.8;
  } else if (score >= 3) {
    text = 'Moderate';
    percent = 0.7;
  } else if (score >= 1) {
    text = 'Low';
    percent = 0.0;
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

  const guptaRequired = [
    { key: 'age', label: 'Age' },
    { key: 'sex', label: 'Sex' },
    { key: 'asa', label: 'ASA class' },
    { key: 'functionalStatus', label: 'Functional status' },
    { key: 'surgeryType', label: 'Surgery type' },
    { key: 'surgeryDuration', label: 'Estimated duration' },
    { key: 'creatinine', label: 'Creatinine' },
  ];
  const ariscatRequired = [
    { key: 'age', label: 'Age' },
    { key: 'surgeryType', label: 'Surgery type' },
    { key: 'surgeryDuration', label: 'Estimated duration' },
    { key: 'spO2', label: 'Preoperative SpO₂' },
  ];
  const stopbangRequired = [
    { key: 'age', label: 'Age' },
    { key: 'sex', label: 'Sex' },
    { key: 'neck', label: 'Neck circumference' },
    { key: 'bmi', label: 'BMI' },
  ];
  const capriniRequired = [
    { key: 'age', label: 'Age' },
    { key: 'capriniSurgeryType', label: 'Caprini type of surgery' },
    { key: 'bmi', label: 'BMI' },
  ];
  const rcriRequired = [
    { key: 'surgeryType', label: 'Surgery type' },
    { key: 'creatinine', label: 'Creatinine' },
  ];

  const missing = [...new Set([
    ...getMissingFields(state, guptaRequired),
    ...getMissingFields(state, ariscatRequired),
    ...getMissingFields(state, stopbangRequired),
    ...getMissingFields(state, capriniRequired),
    ...getMissingFields(state, rcriRequired),
  ])];

  if (missing.length > 0) {
    elements.validationMessage.textContent = `Required fields are incomplete: ${missing.join(', ')}. Fill these values to avoid inaccurate scores.`;
  } else {
    elements.validationMessage.textContent = '';
  }

  updateFieldValidation(state, [...guptaRequired, ...ariscatRequired, ...stopbangRequired, ...capriniRequired, ...rcriRequired]);

  if (getMissingFields(state, rcriRequired).length > 0) {
    renderPlaceholderResult(elements.rcriScore, elements.rcriText, null);
  } else {
    elements.rcriScore.textContent = rcri.score;
    elements.rcriText.textContent = `${rcri.text} — ≈${rcri.percent.toFixed(1)}% major cardiac complication`;
  }

  if (getMissingFields(state, guptaRequired).length > 0) {
    renderPlaceholderResult(elements.guptaScore, elements.guptaText, null);
  } else {
    elements.guptaScore.textContent = gupta.score;
    elements.guptaText.textContent = gupta.text;
  }

  elements.dasiPoints.textContent = dasi.points;
  elements.dasiMets.textContent = dasi.mets.toFixed(2);

  if (getMissingFields(state, ariscatRequired).length > 0) {
    renderPlaceholderResult(elements.ariscatScore, elements.ariscatText, elements.ariscatPct);
  } else {
    elements.ariscatScore.textContent = ariscat.score;
    elements.ariscatText.textContent = ariscat.text;
    elements.ariscatPct.textContent = ariscat.percent;
  }

  if (getMissingFields(state, stopbangRequired).length > 0) {
    renderPlaceholderResult(elements.stopbangScore, elements.stopbangText, null);
  } else {
    elements.stopbangScore.textContent = `${stopbang.score}`;
    elements.stopbangText.textContent = stopbang.text;
  }

  if (getMissingFields(state, capriniRequired).length > 0) {
    renderPlaceholderResult(elements.capriniScore, elements.capriniText, elements.capriniPercent);
  } else {
    elements.capriniScore.textContent = caprini.score;
    elements.capriniPercent.textContent = `${caprini.percent.toFixed(1)}% risk`;
    elements.capriniText.textContent = caprini.text;
  }

  if (elements.capriniOptionalWarning) {
    elements.capriniOptionalWarning.style.display = caprini.score < 9 ? 'block' : 'none';
  }
}

createDASIControls();
createCapriniControls();
bindListeners();
calculateAll();
