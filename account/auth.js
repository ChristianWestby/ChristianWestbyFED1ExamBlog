// Steg 7: Feilhåndtering
// Vi inkluderer feilhåndtering i koden vår for å håndtere situasjoner der API-kallet mislykkes eller hvis responsen indikerer ugyldige legitimasjoner.

// Nå kan vi skrive JavaScript-koden:

// Funksjon for å håndtere innloggingsskjemaet
function handleLogin() {
    const username = document.getElementById('username').value; // Henter brukernavn fra skjemaet
    const password = document.getElementById('password').value; // Henter passord fra skjemaet

    login(username, password); // Kaller login-funksjonen fra auth.js
}
