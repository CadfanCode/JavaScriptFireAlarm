/* --- KEYPAD LOGIC --- */
const keypadDisplay = document.getElementById('keypad-screen');
const keypadButtons = document.querySelectorAll('.keypad-btn');

keypadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;
        keypadDisplay.value += value;
    });
});

/* --- INDICATOR LOGIC --- */
const fireIndicator = document.getElementById('fire-alarm-indicator');
const intruderIndicator = document.getElementById('intruder-alarm-indicator');
function setAlarmState(lightElement, isActive) {
    if (isActive) {
        lightElement.classList.add('is-active');
        lightElement.setAttribute('aria-label', 'Alarm is Active');
    } else {
        lightElement.classList.remove('is-active');
        lightElement.setAttribute('aria-label', 'Alarm is Inactive');
    }
}

/* --- BUTTON TRIGGERS --- */
document.getElementById('fire-alarm-btn').addEventListener('click', () => {
if (fireIndicator == true){
setAlarmState(fireIndicator, false)}
else {
    setAlarmState(fireIndicator, true);
}});

document.getElementById('intruder-alarm-btn').addEventListener('click', () => {
if (intruderIndicator == true){
setAlarmState(intruderIndicator, false)}
else {
    setAlarmState(intruderIndicator, true);
}});

document.getElementById('dual-alarm-btn').addEventListener('click', () => {
    setAlarmState(fireIndicator, true);
    setAlarmState(intruderIndicator, true);
});
