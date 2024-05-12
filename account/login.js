// Funksjon for å håndtere innloggingsskjemaet
function handleLogin() {
    const username = document.getElementById('username').value; // Henter brukernavn fra skjemaet
    const password = document.getElementById('password').value; // Henter passord fra skjemaet

    login(username, password); // Kaller login-funksjonen fra auth.js
}

// Kaller login-funksjonen når dokumentet er lastet
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    // Tømmer brukernavnfeltet ved oppdatering av siden
    document.getElementById('username').value = '';
    // Tømmer passordfeltet ved oppdatering av siden
    document.getElementById('password').value = '';
});
