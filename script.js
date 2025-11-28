/* --- KEYPAD LOGIC --- */
const keypadDisplay = document.getElementById('keypad-screen');
const keypadButtons = document.querySelectorAll('.keypad-btn');

keypadButtons.forEach(button => {
while (keypadDisplay.value.length <= 4){ // Limits number of values on display to 4
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;
        keypadDisplay.value += value;
    });
}});

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
    const isActive = fireIndicator.classList.contains('is-active');
    setAlarmState(fireIndicator, !isActive);
});

document.getElementById('intruder-alarm-btn').addEventListener('click', () => {
    const isActive = intruderIndicator.classList.contains('is-active');
    setAlarmState(intruderIndicator, !isActive)
});

document.getElementById('dual-alarm-btn').addEventListener('click', () => {
    setAlarmState(fireIndicator, true);
    setAlarmState(intruderIndicator, true);
});

/* --- ENTER BUTTON LOGIC & WARNING MESSAGE --- */
const submitBtn = document.getElementById('submit-btn');
const correctPin = '1234';

submitBtn.addEventListener('click', () => {
    const currentInput = keypadDisplay.value;

    if (currentInput === correctPin) {
        setAlarmState(fireIndicator, false);
        setAlarmState(intruderIndicator, false);
        // Give visual feedback on the screen
        keypadDisplay.value = "PASS";
        setTimeout(() => {
            keypadDisplay.value = "";
        }, 2000);

    } else {
        alert("Incorrect pin!"); // WARNING MESSAGE
        setTimeout(() => {
            keypadDisplay.value = "";
        }, 1000);
    }
});

