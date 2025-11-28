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

/* --- EVENT LOGGING --- */
const eventTableBody = document.querySelector('.event-table tbody');

function logEvent(fireActive, intruderActive, passcodeStatus) {
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();

    const newRow = eventTableBody.insertRow(0); // Insert at the top

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

/* --- AUTHORIZATION LOGIC & WARNING MESSAGE --- */
const submitBtn = document.getElementById('submit-btn');
const correctPin = '1234';
let authUser = false; // Tracks successful PIN entry for alarm control
submitBtn.addEventListener('click', () => {
    const currentInput = keypadDisplay.value;
    const fireWasActive = fireIndicator.classList.contains('is-active');
    const intruderWasActive = intruderIndicator.classList.contains('is-active');

    if (currentInput === correctPin) {
        authUser = true;
        // Deactivate both alarms
        setAlarmState(fireIndicator, false);
        setAlarmState(intruderIndicator, false);
        // Log the successful PIN attempt and alarm deactivation
        logEvent(false, false, true); // Alarms are now inactive
        keypadDisplay.value = "PASS";
        setTimeout(() => {
            keypadDisplay.value = "";
        }, 2000);

    } else {
        authUser = false;

        logEvent(fireWasActive, intruderWasActive, false);

        alert("INCORRECT PASSWORD!"); // WARNING MESSAGE
        setTimeout(() => {
            keypadDisplay.value = "";
        }, 1000);
    }
});


/* --- INDICATOR LOGIC --- */
const fireIndicator = document.getElementById('fire-alarm-indicator');
const intruderIndicator = document.getElementById('intruder-alarm-indicator');

function setAlarmState(lightElement, shouldBeActive, callerIsButton = false) {
    const isCurrentlyActive = lightElement.classList.contains('is-active');

    if (shouldBeActive) {
        if (isCurrentlyActive) {
            // Already active, no change needed
            return;
        }

        if (callerIsButton && !authUser) {
            alert("Please enter the correct passcode first!");
            return;
        }

        lightElement.classList.add('is-active');
        lightElement.setAttribute('aria-label', 'Alarm is Active');

        // When an alarm is manually activated, reset authUser
        if (callerIsButton) {
            authUser = false;
            logEvent(
                fireIndicator.classList.contains('is-active'),
                intruderIndicator.classList.contains('is-active'),
                'N/A'
            );
        }

    } else {
        // Attempting to DEACTIVATE (only done via submitBtn success or if already inactive)
        lightElement.classList.remove('is-active');
        lightElement.setAttribute('aria-label', 'Alarm is Inactive');
    }
}


/* --- BUTTON TRIGGERS --- */
document.getElementById('fire-alarm-btn').addEventListener('click', () => {
    const isActive = fireIndicator.classList.contains('is-active');
    setAlarmState(fireIndicator, !isActive, true);
});

document.getElementById('intruder-alarm-btn').addEventListener('click', () => {
    const isActive = intruderIndicator.classList.contains('is-active');
    setAlarmState(intruderIndicator, !isActive, true);
});

document.getElementById('dual-alarm-btn').addEventListener('click', () => {
    setAlarmState(fireIndicator, true, true);
    setAlarmState(intruderIndicator, true, true);
});

/* --- CLEAR BUTTON LOGIC --- */
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    keypadDisplay.value = "";
})