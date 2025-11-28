/* --- KEYPAD LOGIC --- */
const keypadDisplay = document.getElementById('keypad-screen');
const keypadButtons = document.querySelectorAll('.keypad-btn');

keypadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;
        if (keypadDisplay.value.length < 4) {   // limits display to max 4 digits
            keypadDisplay.value += value;
        }
    });
});

/* --- AUTHORIZATION LOGIC & WARNING MESSAGE --- */
const submitBtn = document.getElementById('submit-btn');
const correctPin = '1234';
let authUser = false;

submitBtn.addEventListener('click', () => {
    const currentInput = keypadDisplay.value;

    if (currentInput === correctPin) {
        setAlarmState(fireIndicator, false);
        setAlarmState(intruderIndicator, false);
        authUser = true;

        keypadDisplay.value = "PASS";
        setTimeout(() => {
            keypadDisplay.value = "";
        }, 2000);

    } else {
    authUser = false;
        alert("INCORRECT PASSWORD!"); // WARNING MESSAGE
        setTimeout(() => {
            keypadDisplay.value = "";
        }, 1000);
    }
});

/* --- INDICATOR LOGIC --- */
const fireIndicator = document.getElementById('fire-alarm-indicator');
const intruderIndicator = document.getElementById('intruder-alarm-indicator');
function setAlarmState(lightElement, isActive, authUser) {
    if (isActive && authUser) {
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
    setAlarmState(fireIndicator, !isActive); // the !isActive will toggle the state with each click.
});

document.getElementById('intruder-alarm-btn').addEventListener('click', () => {
    const isActive = intruderIndicator.classList.contains('is-active');
    setAlarmState(intruderIndicator, !isActive)
});

document.getElementById('dual-alarm-btn').addEventListener('click', () => {
    setAlarmState(fireIndicator, true);
    setAlarmState(intruderIndicator, true);
});

/* --- CLEAR BUTTON LOGIC --- */
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    keypadDisplay.value = "";
})

