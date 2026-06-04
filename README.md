# PeriopCalc_AIO

A comprehensive perioperative risk assessment tool that combines multiple evidence-based calculators into one unified interface. Designed to support clinical decision-making for preoperative risk stratification.

Open `index.html` in a browser or host the folder on GitHub Pages for a static, responsive perioperative risk calculator.

---

## Risk Calculators Overview

### RCRI (Revised Cardiac Risk Index)
**Clinical Use:** Predicts the risk of major adverse cardiac events (MACE) in patients undergoing non-cardiac surgery.

**Interpretation:**
- **Score Range:** 0–6 points
- **0 points (0.4%):** Low risk
- **1 point (~0.9%):** Mild increased risk
- **2 points (~6.6%):** Moderate risk
- **≥3 points (~11%):** High risk

Higher scores suggest increased perioperative cardiac complications. Used to guide further cardiac workup and risk mitigation strategies.

---

### Gupta MICA (Myocardial Infarction or Cardiac Arrest)
**Clinical Use:** Predicts 30-day risk of myocardial infarction or cardiac arrest using NSQIP data. More contemporary than RCRI and includes patient sex and better functional status assessment.

**Interpretation:**
- **<1%:** Low risk
- **1–5%:** Moderate risk
- **>5%:** Higher risk

Provides a percentage estimate of cardiac events. Useful for informed consent discussions and determining need for perioperative cardiac monitoring or optimization.

---

### NSQIP Cardiac Risk Calculator
**Clinical Use:** Specifically focuses on cardiac complication risk using variables from the National Surgical Quality Improvement Program (NSQIP) database. Emphasizes factors directly related to cardiac events.

**Interpretation:**
- **<2%:** Low cardiac risk
- **2–5%:** Moderate cardiac risk
- **>5%:** Higher cardiac risk

Considers age, ASA class, functional status, cardiac history, emergency status, and surgery type. Helps determine perioperative cardiac risk stratification and need for additional optimization.

---

### DASI (Duke Activity Status Index)
**Clinical Use:** Estimates functional capacity (METs—metabolic equivalents) based on patient ability to perform daily activities. Higher METs indicate better exercise tolerance and lower perioperative cardiac risk.

**Interpretation:**
- **≥7 METs:** Excellent functional capacity; generally low perioperative cardiac risk
- **4–7 METs:** Moderate functional capacity; intermediate risk
- **<4 METs:** Poor functional capacity; higher perioperative cardiac risk

DASI is based on patient self-reported ability to perform activities (e.g., climbing stairs, running, yard work). METs can guide need for cardiac stress testing or further optimization.

---

### ARISCAT (Assess Respiratory Risk in Surgical Patients in Catalonia)
**Clinical Use:** Predicts postoperative pulmonary complications (PPC) including pneumonia, respiratory failure, and need for prolonged mechanical ventilation.

**Interpretation:**
- **<26 points:** Low risk (<5% PPC)
- **26–44 points:** Intermediate risk (~10–15% PPC)
- **≥45 points:** High risk (>30% PPC)

Incorporates age, oxygenation status, respiratory infection history, hemoglobin level, and surgery characteristics. Used to identify patients needing enhanced pulmonary precautions and postoperative monitoring.

---

### STOP-BANG (Sleep Apnea Screening)
**Clinical Use:** Screens for obstructive sleep apnea (OSA) risk preoperatively, which impacts anesthetic management and perioperative complications.

**Interpretation:**
- **Score 0–2/8:** Low OSA risk
- **Score 3–4/8:** Intermediate OSA risk
- **Score ≥5/8:** High OSA risk

Based on: **S**noring, **T**iredness, **O**bserved apnea, **B**lood pressure (hypertension), **B**MI >35, **A**ge >50, **N**eck circumference, **G**ender (male). Higher scores warrant sleep medicine consultation and modified anesthetic techniques to reduce airway complications.

---

### Caprini Score (VTE Risk Assessment)
**Clinical Use:** Stratifies risk for venous thromboembolism (VTE—deep vein thrombosis and pulmonary embolism) in surgical patients to guide thromboprophylaxis decisions.

**Interpretation:**
- **0 points:** Low risk
- **1 point:** Moderate risk
- **2–4 points:** High risk
- **≥5 points:** Highest risk

Incorporates age, BMI, varicose veins, leg swelling, hormone therapy, bed rest, recent surgery, active cancer, and history of DVT/PE. Higher risk patients require pharmacologic and/or mechanical thromboprophylaxis.

---

## Features
- **Real-time calculation:** All scores update automatically as you enter patient data
- **No default values:** Clean slate for each patient assessment
- **Responsive design:** Works on desktop and mobile devices
- **Educational tool:** Provides quick reference interpretations alongside scores

## Disclaimer
This tool is for **educational and reference purposes only** and does not replace clinical judgment. All perioperative risk assessments should be performed by qualified healthcare professionals in the context of comprehensive patient evaluation.
