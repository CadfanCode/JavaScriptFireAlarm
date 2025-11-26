const light_1 = document.getElementById('fire-alarm-indicator');

// Function to turn alarm ON
function activateAlarm() {
  light.classList.add('is-active');
  // Optional: Update text or accessible label
  light.setAttribute('aria-label', 'Alarm is Active');
}

// Function to turn alarm OFF
function deactivateAlarm() {
  light.classList.remove('is-active');
  light.setAttribute('aria-label', 'Alarm is Inactive');
}

const light_2 = document.getElementById('intruder-alarm-indicator');

// Function to turn alarm ON
function activateAlarm() {
  light.classList.add('is-active');
  // Optional: Update text or accessible label
  light.setAttribute('aria-label', 'Alarm is Active');
}

// Function to turn alarm OFF
function deactivateAlarm() {
  light.classList.remove('is-active');
  light.setAttribute('aria-label', 'Alarm is Inactive');
}