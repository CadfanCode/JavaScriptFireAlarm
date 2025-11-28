/* --- SOUNDS --- */
/* A few fun sounds added to enhance the user experience */
const activationSound = new Audio('sounds/access_granted_beep.mp3');
const deniedSound = new Audio('sounds/access_denied.mp3');
const alertSound = new Audio('sounds/alert.mp3');
const keypadSound = new Audio('sounds/keypad_click.mp3');

/* --- KEYPAD LOGIC --- */
const keypadDisplay = document.getElementById('keypad-screen');
const keypadButtons = document.querySelectorAll('.keypad-btn');
const maxDigits = 4;

keypadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;
        keypadSound.play();
        if (keypadDisplay.value.length < maxDigits) {
            keypadDisplay.value += value;
        }
    });
});

/* --- EVENT LOGGING --- */
const eventTableBody = document.querySelector('.event-table tbody');

function logEvent(fireActive, intruderActive, passcodeStatus) {
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();

    const newRow = eventTableBody.insertRow(0);

    newRow.insertCell(0).innerText = dateStr;
    newRow.insertCell(1).innerText = timeStr;
    newRow.insertCell(2).innerText = fireActive ? 'YES' : 'NO';
    newRow.insertCell(3).innerText = intruderActive ? 'YES' : 'NO';

    let statusText;
    if (passcodeStatus === 'N/A') {
        statusText = 'N/A';
    } else {
        statusText = passcodeStatus ? 'SUCCESS' : 'FAIL';
    }
    newRow.insertCell(4).innerText = statusText;
}

/* --- INDICATOR LOGIC --- */
const fireIndicator = document.getElementById('fire-alarm-indicator');
const intruderIndicator = document.getElementById('intruder-alarm-indicator');

function setAlarmState(lightElement, isActive) {
    const isCurrentlyActive = lightElement.classList.contains('is-active');

    if (isActive && isCurrentlyActive) {
        return;
    }
    if (!isActive && !isCurrentlyActive) {
        return;
    }

    if (isActive) {
        lightElement.classList.add('is-active');
        lightElement.setAttribute('aria-label', 'Alarm is Active');
    } else {
        lightElement.classList.remove('is-active');
        lightElement.setAttribute('aria-label', 'Alarm is Inactive');
    }

    logEvent(
        fireIndicator.classList.contains('is-active'),
        intruderIndicator.classList.contains('is-active'),
        'N/A'
    );
}

/* --- AUTHORIZATION LOGIC & WARNING MESSAGE --- */
const submitBtn = document.getElementById('submit-btn');
const correctPin = '1234';
let authUser = false;

submitBtn.addEventListener('click', () => {
    const currentInput = keypadDisplay.value;
    const fireWasActive = fireIndicator.classList.contains('is-active');
    const intruderWasActive = intruderIndicator.classList.contains('is-active');

    keypadDisplay.value = "";

    if (currentInput === correctPin) {
        authUser = true;
        logEvent(fireWasActive, intruderWasActive, true);
        keypadDisplay.value = "PASS";
        activationSound.play();

        setTimeout(() => {
            keypadDisplay.value = "";
        }, 2000);

    } else {
        authUser = false;
        logEvent(fireWasActive, intruderWasActive, false);
        keypadDisplay.value = "INCORRECT";

        alert("INCORRECT PASSWORD! Access Denied.");
        deniedSound.play();

        setTimeout(() => {
            keypadDisplay.value = "";
        }, 1000);
    }
});

/* --- BUTTON TRIGGERS --- */
const deactivationBtn = document.getElementById('deactivation-btn');
const authError = "Please enter the correct PIN first!";

function handleAuthAction(callback) {
    if (authUser) {
        callback();
        authUser = false;
    } else {
        alert(authError);
        alertSound.play();
    }
}

document.getElementById('fire-alarm-btn').addEventListener('click', () => {
    handleAuthAction(() => {
        setAlarmState(fireIndicator, true);
    });
});

document.getElementById('intruder-alarm-btn').addEventListener('click', () => {
    handleAuthAction(() => {
        setAlarmState(intruderIndicator, true);
    });
});

document.getElementById('dual-alarm-btn').addEventListener('click', () => {
    handleAuthAction(() => {
        setAlarmState(fireIndicator, true);
        setAlarmState(intruderIndicator, true);
    });
});

deactivationBtn.addEventListener('click', () => {
    handleAuthAction(() => {
        setAlarmState(fireIndicator, false);
        setAlarmState(intruderIndicator, false);
    });
});

/* --- CLEAR BUTTON LOGIC --- */
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    keypadDisplay.value = "";
});
