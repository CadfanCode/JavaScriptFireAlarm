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
const fireLight = document.getElementById('fire-alarm-indicator');
const intruderLight = document.getElementById('intruder-alarm-indicator');
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
    setAlarmState(fireLight, true);
});

document.getElementById('intruder-alarm-btn').addEventListener('click', () => {
    setAlarmState(intruderLight, true);
});

document.getElementById('dual-alarm-btn').addEventListener('click', () => {
    setAlarmState(fireLight, true);
    setAlarmState(intruderLight, true);
});
