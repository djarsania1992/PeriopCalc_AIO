const CHEVRON_CLOSED = '\u25b8';
const CHEVRON_OPEN = '\u25be';
const BULLET = '\u2022';
const APPROX = '\u2248';
const EM_DASH = '\u2014';

const state = {
  age: null,
  sex: '',
  asa: '',
  functionalStatus: '',
  bmi: null,
  neck: null,
  creatinine: null,
  surgeryType: '',
  ariscatIncision: '',
  guptaProcedureType: '',
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
  capVaricoseVeins: false,
  capSwollenLegs: false,
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
  ariscatIncision: document.getElementById('ariscatIncision'),
  guptaProcedureType: document.getElementById('guptaProcedureType'),
  surgeryDuration: document.getElementById('surgeryDuration'),
  spO2: document.getElementById('spO2'),
  validationMessage: document.getElementById('validationMessage'),
  appError: document.getElementById('appError'),
  riskForm: document.getElementById('riskForm'),
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
  dasiText: document.getElementById('dasiText'),
  ariscatScore: document.getElementById('ariscatScore'),
  ariscatText: document.getElementById('ariscatText'),
  ariscatPct: document.getElementById('ariscatPct'),
  stopbangScore: document.getElementById('stopbangScore'),
  stopbangText: document.getElementById('stopbangText'),
  capriniScore: document.getElementById('capriniScore'),
  capriniPercent: document.getElementById('capriniPercent'),
  capriniText: document.getElementById('capriniText'),
  exportButton: document.getElementById('exportButton'),
  exportPreviewText: document.getElementById('exportPreviewText'),
  exportStatus: document.getElementById('exportStatus'),
};

const fieldRules = {
  age: { label: 'Age', required: true, min: 18, max: 120 },
  sex: { label: 'Sex', required: true },
  asa: { label: 'ASA class', required: true },
  functionalStatus: { label: 'Functional status', required: true },
  bmi: { label: 'BMI', required: true, min: 10, max: 80 },
  neck: { label: 'Neck circumference', required: true, min: 20, max: 60 },
  creatinine: { label: 'Creatinine', required: true, min: 0, max: 10 },
  surgeryType: { label: 'RCRI surgery category', required: true },
  ariscatIncision: { label: 'ARISCAT surgical incision/location', required: true },
  guptaProcedureType: { label: 'Gupta MICA procedure type', required: true },
  surgeryDuration: { label: 'Estimated duration', required: true },
  spO2: { label: 'Preoperative SpO2', required: true },
  capriniSurgeryType: { label: 'Caprini type of surgery', required: true },
};

const scoreRequirements = {
  rcri: ['surgeryType', 'creatinine'],
  gupta: ['age', 'asa', 'functionalStatus', 'guptaProcedureType', 'creatinine'],
  ariscat: ['age', 'ariscatIncision', 'surgeryDuration', 'spO2'],
  stopbang: ['age', 'sex', 'neck', 'bmi'],
  caprini: ['age', 'capriniSurgeryType', 'bmi'],
};

const dasiItems = [
  { id: 'dasiPersonalCare', label: 'Take care of self - eating, dressing, bathing, using the toilet', points: 2.75 },
  { id: 'dasiWalkIndoors', label: 'Walk indoors', points: 1.75 },
  { id: 'dasiWalkBlock', label: 'Walk 1-2 blocks on level ground', points: 2.75 },
  { id: 'dasiClimbStairs', label: 'Climb a flight of stairs or walk up a hill', points: 5.5 },
  { id: 'dasiRunShort', label: 'Run a short distance', points: 8.0 },
  { id: 'dasiLightHousework', label: 'Do light work around the house - e.g., dusting, washing dishes', points: 2.7 },
  { id: 'dasiModerateHousework', label: 'Do moderate work around the house - e.g., vacuuming, sweeping floors, carrying groceries', points: 3.5 },
  { id: 'dasiHeavyHousework', label: 'Do heavy work around the house - e.g., scrubbing floors, lifting or moving heavy furniture', points: 8.0 },
  { id: 'dasiYardwork', label: 'Do yardwork - e.g., raking leaves, weeding, pushing a power mower', points: 4.5 },
  { id: 'dasiSexualRelations', label: 'Have sexual relations', points: 5.25 },
  { id: 'dasiModerateRecreation', label: 'Participate in moderate recreational activities - e.g., golf, bowling, dancing, doubles tennis, throwing a baseball or football', points: 6.0 },
  { id: 'dasiStrenuousSport', label: 'Participate in strenuous sports - e.g., swimming, singles tennis, football, basketball, skiing', points: 7.5 },
];

function isBlank(value) {
  return value === null || value === '' || Number.isNaN(value);
}

function formatPercent(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return EM_DASH;
  if (numericValue > 0 && numericValue < 0.1) return '<0.1%';
  return `${numericValue.toFixed(1)}%`;
}

function isFormControl(el) {
  return Boolean(el && typeof el.matches === 'function' && el.matches('input, select, textarea'));
}

function updateStateFromElement(key, el) {
  if (!isFormControl(el)) return;

  if (el.type === 'checkbox') {
    state[key] = el.checked;
    return;
  }

  if (el.type === 'number') {
    state[key] = el.value.trim() === '' ? null : Number.parseFloat(el.value);
    return;
  }

  state[key] = el.value;
}

function validateField(key) {
  const rule = fieldRules[key];
  if (!rule) return null;

  const value = state[key];
  if (rule.required && isBlank(value)) {
    return { key, label: rule.label, type: 'required', message: `${rule.label} is required` };
  }

  if (!isBlank(value) && (typeof rule.min === 'number' || typeof rule.max === 'number')) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
      return { key, label: rule.label, type: 'range', message: `${rule.label} must be a number` };
    }
    if (typeof rule.min === 'number' && numericValue < rule.min) {
      return { key, label: rule.label, type: 'range', message: `${rule.label} must be at least ${rule.min}` };
    }
    if (typeof rule.max === 'number' && numericValue > rule.max) {
      return { key, label: rule.label, type: 'range', message: `${rule.label} must be no more than ${rule.max}` };
    }
  }

  return null;
}

function getUniqueKeys(keys) {
  return [...new Set(keys)];
}

function getValidationErrors(keys = Object.keys(fieldRules)) {
  return getUniqueKeys(keys)
    .map(validateField)
    .filter(Boolean);
}

function scoreIsComplete(scoreKey) {
  return getValidationErrors(scoreRequirements[scoreKey] || []).length === 0;
}

function updateFieldValidation() {
  Object.keys(fieldRules).forEach(key => {
    const el = elements[key];
    if (!isFormControl(el)) return;

    const error = validateField(key);
    el.classList.toggle('invalid', Boolean(error));
    if (error) {
      el.setAttribute('aria-invalid', 'true');
    } else {
      el.removeAttribute('aria-invalid');
    }
  });
}

function updateValidationMessage() {
  const errors = getValidationErrors();
  const required = errors.filter(error => error.type === 'required').map(error => error.label);
  const ranges = errors.filter(error => error.type !== 'required').map(error => error.message);
  const messages = [];

  if (required.length > 0) {
    messages.push(`Required fields are incomplete: ${required.join(', ')}`);
  }
  if (ranges.length > 0) {
    messages.push(`Please correct: ${ranges.join('; ')}`);
  }

  elements.validationMessage.textContent = messages.join('. ');
}

function setAppError(message) {
  if (!elements.appError) return;
  elements.appError.textContent = message;
  elements.appError.hidden = false;
}

function clearAppError() {
  if (!elements.appError) return;
  elements.appError.hidden = true;
}

function createFieldRow() {
  const wrapper = document.createElement('div');
  wrapper.className = 'field-row';
  return wrapper;
}

function createCheckboxRow(id, labelText) {
  state[id] = Boolean(state[id]);

  const wrapper = createFieldRow();
  wrapper.classList.add('checkbox-row');

  const label = document.createElement('label');
  const input = document.createElement('input');
  input.id = id;
  input.name = id;
  input.type = 'checkbox';

  label.append(input, document.createTextNode(` ${labelText}`));
  wrapper.appendChild(label);
  elements[id] = input;

  return wrapper;
}

function createSelectRow(id, labelText, options, defaultValue = '', required = false, helpText = '') {
  state[id] = defaultValue;

  const wrapper = createFieldRow();
  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = labelText;
  if (required) {
    const requiredMarker = document.createElement('span');
    requiredMarker.setAttribute('aria-label', 'required');
    requiredMarker.textContent = ' *';
    label.appendChild(requiredMarker);
  }

  const select = document.createElement('select');
  select.id = id;
  select.name = id;
  if (required) {
    select.required = true;
    select.setAttribute('aria-required', 'true');
  }

  options.forEach(option => {
    const optionEl = document.createElement('option');
    optionEl.value = option.value;
    optionEl.textContent = option.label;
    select.appendChild(optionEl);
  });

  wrapper.append(label, select);
  if (helpText) {
    const help = document.createElement('small');
    help.id = `${id}-help`;
    help.textContent = helpText;
    select.setAttribute('aria-describedby', help.id);
    wrapper.appendChild(help);
  }

  elements[id] = select;
  return wrapper;
}

function createDASIControls() {
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = 'DASI Activities';
  fieldset.appendChild(legend);

  const help = document.createElement('p');
  help.className = 'help-text';
  help.textContent = 'Select all activities the patient can perform. If none are selected, DASI remains incomplete rather than assuming poor function.';
  fieldset.appendChild(help);

  dasiItems.forEach(item => {
    const row = createCheckboxRow(item.id, `${item.label} (${item.points} points)`);
    fieldset.appendChild(row);
  });

  document.querySelector('.inputs').appendChild(fieldset);
}

function createCollapsible(id, labelText) {
  const box = document.createElement('div');
  box.className = 'collapsible collapsed';
  box.id = id;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'toggle';
  toggle.id = `${id}Toggle`;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', `${id}Content`);

  const label = document.createElement('span');
  label.textContent = labelText;

  const chevron = document.createElement('span');
  chevron.className = 'chevron';
  chevron.setAttribute('aria-hidden', 'true');
  chevron.textContent = CHEVRON_CLOSED;

  const content = document.createElement('div');
  content.className = 'content';
  content.id = `${id}Content`;
  content.hidden = true;

  toggle.append(label, chevron);
  box.append(toggle, content);

  toggle.addEventListener('click', () => toggleCollapsible(box));

  return { box, content };
}

function toggleCollapsible(box) {
  const toggle = box.querySelector('.toggle');
  const content = box.querySelector('.content');
  const chevron = box.querySelector('.chevron');
  const willExpand = box.classList.contains('collapsed');

  box.classList.toggle('collapsed', !willExpand);
  toggle.setAttribute('aria-expanded', String(willExpand));
  content.hidden = !willExpand;
  chevron.textContent = willExpand ? CHEVRON_OPEN : CHEVRON_CLOSED;
}

function createCapriniControls() {
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = 'Caprini VTE Risk Factors';
  fieldset.appendChild(legend);

  const help = document.createElement('p');
  help.className = 'help-text';
  help.innerHTML = 'Use the <a href="caprini_input_description.html" target="_blank" rel="noopener">Caprini input definitions</a> for factor definitions.';
  fieldset.appendChild(help);

  fieldset.appendChild(createSelectRow('capriniSurgeryType', 'Type of surgery (Caprini)', [
    { value: '', label: 'Select...' },
    { value: 'minor', label: 'Minor (<45 min)' },
    { value: 'major', label: 'Major >45 min / laparoscopic >45 min / arthroscopic' },
    { value: 'arthroplasty', label: 'Elective major lower extremity arthroplasty' },
  ], '', true, 'Select independently; this field is not auto-filled from Surgery type.'));

  const recentHeading = document.createElement('p');
  recentHeading.className = 'subsection-label';
  recentHeading.textContent = 'Recent (<1 month) events';
  fieldset.appendChild(recentHeading);
  fieldset.appendChild(createCheckboxRow('capRecentMajorSurgery', 'Major surgery'));
  fieldset.appendChild(createCheckboxRow('capRecentCHF', 'CHF'));
  fieldset.appendChild(createCheckboxRow('capRecentSepsis', 'Sepsis'));
  fieldset.appendChild(createCheckboxRow('capRecentPneumonia', 'Pneumonia'));
  fieldset.appendChild(createCheckboxRow('capRecentPlasterCast', 'Immobilizing plaster cast'));
  fieldset.appendChild(createCheckboxRow('capRecentFracture', 'Hip, pelvis, or leg fracture'));
  fieldset.appendChild(createCheckboxRow('capRecentStroke', 'Stroke'));
  fieldset.appendChild(createCheckboxRow('capRecentTrauma', 'Multiple trauma'));
  fieldset.appendChild(createCheckboxRow('capRecentSpinalCordInjury', 'Acute spinal cord injury causing paralysis'));

  fieldset.appendChild(createSelectRow('capriniMobility', 'Mobility', [
    { value: 'normal', label: 'Normal, out of bed' },
    { value: 'medicalBedRest', label: 'Medical patient currently on bed rest' },
    { value: 'confined72', label: 'Patient confined to bed >72 hours' },
  ], 'normal'));

  const warning = document.createElement('p');
  warning.id = 'capriniOptionalWarning';
  warning.className = 'caprini-warning';
  warning.hidden = true;
  warning.textContent = 'Score < 9 - consider reviewing the optional Caprini criteria below before finalizing VTE risk.';
  fieldset.appendChild(warning);
  elements.capriniOptionalWarning = warning;

  const venous = createCollapsible('capriniVenous', 'Venous disease or clotting disorder');
  venous.content.appendChild(createCheckboxRow('capVaricoseVeins', 'Varicose veins'));
  venous.content.appendChild(createCheckboxRow('capSwollenLegs', 'Current swollen legs'));
  venous.content.appendChild(createCheckboxRow('capCentralAccess', 'Current central venous access'));
  venous.content.appendChild(createCheckboxRow('historyVTE', 'History of DVT / PE'));
  venous.content.appendChild(createCheckboxRow('capFamilyHistory', 'Family history of thrombosis'));
  venous.content.appendChild(createCheckboxRow('capPositiveFactorV', 'Positive Factor V Leiden'));
  venous.content.appendChild(createCheckboxRow('capProthrombin', 'Positive prothrombin 20210A'));
  venous.content.appendChild(createCheckboxRow('capHomocysteine', 'Elevated serum homocysteine'));
  venous.content.appendChild(createCheckboxRow('capLupus', 'Positive lupus anticoagulant'));
  venous.content.appendChild(createCheckboxRow('capAnticardiolipin', 'Elevated anticardiolipin antibody'));
  venous.content.appendChild(createCheckboxRow('capHIT', 'Heparin-induced thrombocytopenia'));
  venous.content.appendChild(createCheckboxRow('capOtherThrombophilia', 'Other congenital or acquired thrombophilia'));
  fieldset.appendChild(venous.box);

  const other = createCollapsible('capriniOther', 'Other present and past history');
  other.content.appendChild(createCheckboxRow('capIBD', 'History of inflammatory bowel disease'));
  other.content.appendChild(createCheckboxRow('capAcuteMI', 'Acute MI'));
  other.content.appendChild(createCheckboxRow('capCOPD', 'COPD'));
  other.content.appendChild(createCheckboxRow('capMalignancy', 'Present or previous malignancy'));
  other.content.appendChild(createCheckboxRow('capOtherRiskFactors', 'Other risk factors'));

  const bmiNote = document.createElement('p');
  bmiNote.className = 'help-text';
  bmiNote.textContent = 'BMI >25 points are calculated automatically from the BMI field above.';
  other.content.appendChild(bmiNote);
  fieldset.appendChild(other.box);

  document.querySelector('.inputs').appendChild(fieldset);
}

function bindListeners() {
  Object.keys(elements).forEach(key => {
    const el = elements[key];
    if (!isFormControl(el)) return;

    updateStateFromElement(key, el);

    const eventName = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input';
    el.addEventListener(eventName, () => {
      updateStateFromElement(key, el);
      calculateAll();
    });
  });

  if (elements.riskForm) {
    elements.riskForm.addEventListener('submit', event => event.preventDefault());
  }

  if (elements.exportButton) {
    elements.exportButton.addEventListener('click', copyRiskAssessment);
    elements.exportButton.addEventListener('mouseenter', updateExportPreview);
    elements.exportButton.addEventListener('focus', updateExportPreview);
  }
}

function computeRCRI(data) {
  const highRisk = data.surgeryType === 'rcriHighRisk';
  let score = 0;
  score += highRisk ? 1 : 0;
  score += data.ischemicHeartDisease ? 1 : 0;
  score += data.heartFailure ? 1 : 0;
  score += data.cerebrovascular ? 1 : 0;
  score += data.insulinDiabetes ? 1 : 0;
  score += data.creatinine > 2.0 ? 1 : 0;

  let text = 'Low risk';
  if (score === 1) text = 'Mildly increased risk';
  if (score === 2) text = 'Moderate risk';
  if (score >= 3) text = 'High risk';

  let percent = 0.4;
  if (score === 1) percent = 0.9;
  else if (score === 2) percent = 6.6;
  else if (score >= 3) percent = 11.0;

  return { score, percent, percentText: formatPercent(percent), text };
}

function computeGupta(data) {
  const asa = Number(data.asa);
  const functionalStatusCoefficients = {
    independent: 0,
    partiallyDependent: 0.65,
    totallyDependent: 1.03,
  };
  const asaCoefficients = {
    1: -5.17,
    2: -3.29,
    3: -1.92,
    4: -0.95,
    5: 0,
  };
  const procedureCoefficients = {
    anorectal: -0.16,
    aortic: 1.6,
    bariatric: -0.25,
    brain: 1.4,
    breast: -1.61,
    cardiac: 1.01,
    ent: 0.71,
    foregutHpb: 1.39,
    gallbladderAppendixAdrenalSpleen: 0.59,
    hernia: 0,
    intestinal: 1.14,
    neck: 0.18,
    obGyn: 0.76,
    orthopedic: 0.8,
    otherAbdominal: 1.13,
    peripheralVascular: 0.86,
    skin: 0.54,
    spine: 0.21,
    nonEsophagealThoracic: 0.4,
    vein: -1.09,
    urology: -0.26,
  };

  const ageCoef = 0.02 * Number(data.age);
  const asaCoef = asaCoefficients[asa] ?? 0;
  const funcCoef = functionalStatusCoefficients[data.functionalStatus] ?? 0;
  const creatCoef = data.creatinine > 1.5 ? 0.61 : 0;
  const procedureCoef = procedureCoefficients[data.guptaProcedureType] ?? 0;
  const logit = -5.25 + ageCoef + asaCoef + funcCoef + creatCoef + procedureCoef;
  const probability = Math.exp(logit) / (1 + Math.exp(logit));
  const percent = Math.round(probability * 1000) / 10;

  let text = 'Low risk';
  if (percent >= 5) text = 'Higher risk';
  else if (percent >= 1) text = 'Moderate risk';

  return { percent, percentText: formatPercent(percent), text };
}

function computeDASI() {
  const selectedItems = dasiItems.filter(item => state[item.id]);
  if (selectedItems.length === 0) {
    return { points: null, pointsText: EM_DASH, mets: null, metsText: EM_DASH, text: 'Incomplete - select at least one activity', isEmpty: true };
  }

  const points = selectedItems.reduce((sum, item) => sum + item.points, 0);
  const vo2Peak = 0.43 * points + 9.6;
  const mets = vo2Peak / 3.5;

  let text = 'Poor functional capacity';
  if (mets >= 7) text = 'Excellent functional capacity';
  else if (mets >= 4) text = 'Moderate functional capacity';

  return { points, pointsText: points.toFixed(2), mets, metsText: mets.toFixed(2), text, isEmpty: false };
}

function computeARISCAT(data) {
  let score = 0;
  if (data.age > 80) score += 16;
  else if (data.age >= 51) score += 3;

  if (data.spO2 === '91-95') score += 8;
  else if (data.spO2 === 'le90') score += 24;

  if (data.recentRespInfection) score += 17;
  if (data.preopAnemia) score += 11;
  if (data.ariscatIncision === 'upperAbdominal') score += 15;
  else if (data.ariscatIncision === 'intrathoracic') score += 24;

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

  return { score, percent, percentText: formatPercent(percent), text };
}

function setText(el, text) {
  if (el) el.textContent = text;
}

function renderIncomplete(scoreEl, textEl, percentEl) {
  setText(scoreEl, EM_DASH);
  setText(textEl, 'Incomplete inputs');
  if (percentEl) setText(percentEl, '');
}

function updateResults() {
  const rcriComplete = scoreIsComplete('rcri');
  const guptaComplete = scoreIsComplete('gupta');
  const ariscatComplete = scoreIsComplete('ariscat');
  const stopbangComplete = scoreIsComplete('stopbang');
  const capriniComplete = scoreIsComplete('caprini');

  if (rcriComplete) {
    const rcri = computeRCRI(state);
    setText(elements.rcriScore, String(rcri.score));
    setText(elements.rcriText, `${rcri.text} - ${APPROX}${rcri.percentText} major cardiac complication`);
  } else {
    renderIncomplete(elements.rcriScore, elements.rcriText);
  }

  if (guptaComplete) {
    const gupta = computeGupta(state);
    setText(elements.guptaScore, gupta.percentText);
    setText(elements.guptaText, `${gupta.text} - estimated MI/cardiac arrest within 30 days`);
  } else {
    renderIncomplete(elements.guptaScore, elements.guptaText);
  }

  const dasi = computeDASI();
  setText(elements.dasiPoints, dasi.pointsText);
  setText(elements.dasiMets, dasi.metsText);
  setText(elements.dasiText, dasi.text);

  if (ariscatComplete) {
    const ariscat = computeARISCAT(state);
    setText(elements.ariscatScore, String(ariscat.score));
    setText(elements.ariscatText, ariscat.text);
    setText(elements.ariscatPct, `${ariscat.percent} PPC risk`);
  } else {
    renderIncomplete(elements.ariscatScore, elements.ariscatText, elements.ariscatPct);
  }

  if (stopbangComplete) {
    const stopbang = computeStopBang(state);
    setText(elements.stopbangScore, String(stopbang.score));
    setText(elements.stopbangText, stopbang.text);
  } else {
    renderIncomplete(elements.stopbangScore, elements.stopbangText);
  }

  if (capriniComplete) {
    const caprini = computeCaprini(state);
    setText(elements.capriniScore, String(caprini.score));
    setText(elements.capriniPercent, `${caprini.percentText} risk`);
    setText(elements.capriniText, caprini.text);
    if (elements.capriniOptionalWarning) {
      elements.capriniOptionalWarning.hidden = caprini.score >= 9;
    }
  } else {
    renderIncomplete(elements.capriniScore, elements.capriniText, elements.capriniPercent);
    if (elements.capriniOptionalWarning) {
      elements.capriniOptionalWarning.hidden = true;
    }
  }
}

function formatPointLabel(value) {
  return `${value} ${Number(value) === 1 ? 'point' : 'points'}`;
}

function formatRCRIForExport() {
  if (!scoreIsComplete('rcri')) return 'Incomplete inputs';
  const rcri = computeRCRI(state);
  return `${formatPointLabel(rcri.score)} (${APPROX}${rcri.percentText}, ${rcri.text})`;
}

function formatGuptaForExport() {
  if (!scoreIsComplete('gupta')) return 'Incomplete inputs';
  const gupta = computeGupta(state);
  return `${gupta.percentText} (${gupta.text})`;
}

function formatDASIForExport() {
  const dasi = computeDASI();
  if (dasi.isEmpty) return 'Incomplete - no activities selected';
  return `${dasi.pointsText} total points, ${dasi.metsText} METs (${dasi.text})`;
}

function formatARISCATForExport() {
  if (!scoreIsComplete('ariscat')) return 'Incomplete inputs';
  const ariscat = computeARISCAT(state);
  return `${formatPointLabel(ariscat.score)} (${ariscat.text}, ${ariscat.percent} PPC risk)`;
}

function formatStopBangForExport() {
  if (!scoreIsComplete('stopbang')) return 'Incomplete inputs';
  const stopbang = computeStopBang(state);
  return `${stopbang.score}/8 points (${stopbang.text})`;
}

function formatCapriniForExport() {
  if (!scoreIsComplete('caprini')) return 'Incomplete inputs';
  const caprini = computeCaprini(state);
  return `${formatPointLabel(caprini.score)}, ${caprini.percentText} risk, ${caprini.text} risk level`;
}

function getRiskAssessmentRows() {
  return [
    { type: 'heading', text: 'Risk assessment:' },
    { type: 'section', text: 'Cardiovascular risk' },
    { type: 'subitem', text: `RCRI: ${formatRCRIForExport()}` },
    { type: 'subitem', text: `Gupta Score (Risk of MI or arrest within 30 days): ${formatGuptaForExport()}` },
    { type: 'subitem', text: `DASI: ${formatDASIForExport()}` },
    { type: 'section', text: 'Pulmonary risk' },
    { type: 'subitem', text: `ARISCAT score: ${formatARISCATForExport()}` },
    { type: 'subitem', text: `STOP-BANG score: ${formatStopBangForExport()}` },
    { type: 'section', text: 'VTE risk' },
    { type: 'subitem', text: `Caprini score (Risk of perioperative DVT): ${formatCapriniForExport()}` },
  ];
}

function generateRiskAssessmentText() {
  const subBullet = '    - ';
  return getRiskAssessmentRows().map(row => {
    if (row.type === 'heading') return `**${row.text}**`;
    if (row.type === 'section') return `${BULLET} ${row.text}`;
    return `${subBullet}${row.text}`;
  }).join('\n');
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateRiskAssessmentHTML() {
  return getRiskAssessmentRows().map(row => {
    const text = escapeHTML(row.text);
    if (row.type === 'heading') return `<div><strong>${text}</strong></div>`;
    if (row.type === 'section') return `<div class="preview-section">${BULLET} ${text}</div>`;
    return `<div class="preview-subitem" style="margin-left: 28px;">- ${text}</div>`;
  }).join('');
}

function updateExportPreview() {
  if (elements.exportPreviewText) {
    elements.exportPreviewText.innerHTML = generateRiskAssessmentHTML();
  }
}

function showExportStatus(message, isError = false) {
  if (!elements.exportStatus) return;
  elements.exportStatus.textContent = message;
  elements.exportStatus.classList.toggle('copy-status-error', isError);
  window.clearTimeout(showExportStatus.timer);
  showExportStatus.timer = window.setTimeout(() => {
    elements.exportStatus.textContent = '';
    elements.exportStatus.classList.remove('copy-status-error');
  }, 3000);
}

function fallbackCopyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-1000px';
  textarea.style.left = '-1000px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const copied = document.execCommand('copy');
    if (!copied) throw new Error('execCommand copy failed');
  } finally {
    textarea.remove();
  }
}

async function writeRiskAssessmentToClipboard(text, html) {
  if (navigator.clipboard && window.isSecureContext && window.ClipboardItem) {
    const item = new ClipboardItem({
      'text/plain': new Blob([text], { type: 'text/plain' }),
      'text/html': new Blob([html], { type: 'text/html' }),
    });
    await navigator.clipboard.write([item]);
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  fallbackCopyToClipboard(text);
}

async function copyRiskAssessment(event) {
  if (event) event.preventDefault();

  const text = generateRiskAssessmentText();
  const html = generateRiskAssessmentHTML();
  updateExportPreview();

  try {
    await writeRiskAssessmentToClipboard(text, html);
    showExportStatus('Results copied to clipboard.');
  } catch (error) {
    console.error('Failed to copy risk assessment:', error);
    showExportStatus('Unable to copy automatically. Use the preview text to copy manually.', true);
  }
}

function calculateAll() {
  try {
    clearAppError();
    updateFieldValidation();
    updateValidationMessage();
    updateResults();
    updateExportPreview();
  } catch (error) {
    console.error('Error in calculation:', error);
    setAppError('A calculation error occurred. Check the inputs and refresh the page if the problem persists.');
  }
}

function init() {
  createDASIControls();
  createCapriniControls();
  bindListeners();
  calculateAll();
}

window.addEventListener('error', () => {
  setAppError('A JavaScript error occurred. The calculator may not be reliable until the page is refreshed.');
});

window.addEventListener('unhandledrejection', () => {
  setAppError('A JavaScript error occurred. The calculator may not be reliable until the page is refreshed.');
});

init();

window.periopCalc = {
  state,
  calculateAll,
  generateRiskAssessmentText,
  generateRiskAssessmentHTML,
  computeRCRI,
  computeGupta,
  computeDASI,
  computeARISCAT,
  computeStopBang,
  computeCaprini,
};
