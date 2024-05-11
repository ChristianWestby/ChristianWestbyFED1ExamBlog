// Funksjon for å håndtere innloggingsskjemaet
function handleLogin() {
    const username = document.getElementById('username').value; // Henter brukernavn fra skjemaet
    const password = document.getElementById('password').value; // Henter passord fra skjemaet

    const loginData = { // Oppretter et objekt med brukernavn og passord
        username: username,
        password: password
    };

    fetch('https://v2.api.noroff.dev/blog/login', { // Sender en fetch()-forespørsel til API-et
        method: 'POST', // Angir metoden til POST
        headers: {
            'Content-Type': 'application/json' // Angir at dataene er i JSON-format
        },
        body: JSON.stringify(loginData) // Konverterer loginData til JSON og sender det med forespørselen
    })
        .then(response => {
            if (!response.ok) { // Sjekker om responsen er ok
                throw new Error('Feil ved innlogging. Sjekk brukernavn og passord.'); // Kaster en feilmelding hvis responsen ikke er ok
            }
            return response.json(); // Returnerer JSON-data hvis responsen er ok
        })
        .then(data => {
            // Håndterer responsen her, for eksempel omdirigerer til administrasjonspanelet
            window.location.href = '/admin-panel.html';
        })
        .catch(error => {
            // Håndterer feil her, for eksempel viser en feilmelding til brukeren
            console.error('Feil ved innlogging:', error.message);
            alert('Feil ved innlogging. Sjekk brukernavn og passord.');
        });
}

// Kaller login-funksjonen når dokumentet er lastet
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    // Tømmer brukernavnfeltet ved oppdatering av siden
    document.getElementById('username').value = '';
    // Tømmer passordfeltet ved oppdatering av siden
    document.getElementById('password').value = '';
});
