(function () {
  'use strict';

  const TEXT_SIZE_STORAGE_KEY = 'periopcalc.textSize';
  const HIGH_CONTRAST_STORAGE_KEY = 'periopcalc.highContrast';
  const TEXT_SIZE_LEVELS = ['smallest', 'smaller', 'default', 'larger', 'largest'];
  const TEXT_SIZE_LABELS = {
    smallest: 'smallest text (80%)',
    smaller: 'smaller text (90%)',
    default: 'default text (100%)',
    larger: 'larger text (110%)',
    largest: 'largest text (120%)',
  };
  const TEXT_SIZE_STATUS = {
    smallest: 'Text size set to smallest, 80%.',
    smaller: 'Text size set to smaller, 90%.',
    default: 'Text size reset to default, 100%.',
    larger: 'Text size set to larger, 110%.',
    largest: 'Text size set to largest, 120%.',
  };

  const preferences = {
    textSize: 'default',
    highContrast: false,
  };

  function readPreference(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writePreference(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // Display preferences still apply for the current page when storage is blocked.
    }
  }

  function normalizeTextSize(value) {
    return TEXT_SIZE_LEVELS.includes(value) ? value : 'default';
  }

  function getControl(id) {
    return document.getElementById(id);
  }

  function announce(message) {
    const status = getControl('displayPreferenceStatus');
    if (status && message) {
      status.textContent = message;
    }
  }

  function loadPreferences() {
    const savedTextSize = readPreference(TEXT_SIZE_STORAGE_KEY);
    const savedHighContrast = readPreference(HIGH_CONTRAST_STORAGE_KEY);
    preferences.textSize = normalizeTextSize(savedTextSize || document.documentElement.dataset.textSize);
    preferences.highContrast = savedHighContrast === 'true' || document.documentElement.dataset.contrast === 'high';
  }

  function savePreferences() {
    writePreference(TEXT_SIZE_STORAGE_KEY, preferences.textSize);
    writePreference(HIGH_CONTRAST_STORAGE_KEY, String(preferences.highContrast));
  }

  function applyPreferences(message) {
    const root = document.documentElement;
    preferences.textSize = normalizeTextSize(preferences.textSize);
    root.dataset.textSize = preferences.textSize;
    root.dataset.contrast = preferences.highContrast ? 'high' : 'standard';

    const currentIndex = TEXT_SIZE_LEVELS.indexOf(preferences.textSize);
    const decrease = getControl('textSizeDecrease');
    const reset = getControl('textSizeReset');
    const increase = getControl('textSizeIncrease');
    const contrast = getControl('contrastToggle');

    if (decrease) {
      decrease.disabled = currentIndex <= 0;
      decrease.setAttribute('aria-disabled', String(currentIndex <= 0));
      decrease.setAttribute('aria-label', `Decrease text size. Current setting: ${TEXT_SIZE_LABELS[preferences.textSize]}.`);
    }

    if (reset) {
      reset.disabled = preferences.textSize === 'default';
      reset.setAttribute('aria-disabled', String(preferences.textSize === 'default'));
      reset.setAttribute('aria-label', `Reset text size. Current setting: ${TEXT_SIZE_LABELS[preferences.textSize]}.`);
    }

    if (increase) {
      increase.disabled = currentIndex >= TEXT_SIZE_LEVELS.length - 1;
      increase.setAttribute('aria-disabled', String(currentIndex >= TEXT_SIZE_LEVELS.length - 1));
      increase.setAttribute('aria-label', `Increase text size. Current setting: ${TEXT_SIZE_LABELS[preferences.textSize]}.`);
    }

    if (contrast) {
      contrast.setAttribute('aria-pressed', String(preferences.highContrast));
      contrast.setAttribute('aria-label', preferences.highContrast ? 'Turn high contrast off' : 'Turn high contrast on');
      contrast.textContent = preferences.highContrast ? 'Standard Contrast' : 'High Contrast';
    }

    announce(message);
  }

  function setTextSize(level) {
    preferences.textSize = normalizeTextSize(level);
    savePreferences();
    applyPreferences(TEXT_SIZE_STATUS[preferences.textSize]);
  }

  function adjustTextSize(delta) {
    const currentIndex = TEXT_SIZE_LEVELS.indexOf(preferences.textSize);
    const nextIndex = Math.max(0, Math.min(TEXT_SIZE_LEVELS.length - 1, currentIndex + delta));
    setTextSize(TEXT_SIZE_LEVELS[nextIndex]);
  }

  function toggleHighContrast() {
    preferences.highContrast = !preferences.highContrast;
    savePreferences();
    applyPreferences(preferences.highContrast ? 'High contrast enabled.' : 'Standard contrast enabled.');
  }

  function bindControls() {
    const decrease = getControl('textSizeDecrease');
    const reset = getControl('textSizeReset');
    const increase = getControl('textSizeIncrease');
    const contrast = getControl('contrastToggle');

    if (decrease) decrease.addEventListener('click', () => adjustTextSize(-1));
    if (reset) reset.addEventListener('click', () => setTextSize('default'));
    if (increase) increase.addEventListener('click', () => adjustTextSize(1));
    if (contrast) contrast.addEventListener('click', toggleHighContrast);
  }

  function initDisplayPreferences() {
    loadPreferences();
    applyPreferences();
    bindControls();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDisplayPreferences);
  } else {
    initDisplayPreferences();
  }

  window.periopDisplayPreferences = {
    get preferences() {
      return { ...preferences };
    },
    setTextSize,
    toggleHighContrast,
  };
}());
