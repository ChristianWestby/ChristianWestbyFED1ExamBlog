// Funksjon for å håndtere opprettelse av ny bruker
function handleCreateUser() {
    const username = document.getElementById('username').value; // Henter brukernavn fra skjemaet
    const email = document.getElementById('email').value; // Henter e-postadresse fra skjemaet
    const password = document.getElementById('password').value; // Henter passord fra skjemaet

    const userData = { // Oppretter et objekt med brukernavn, e-post og passord
        username: username,
        email: email,
        password: password
    };

    fetch('https://v2.api.noroff.dev/auth/register', { // Sender en fetch()-forespørsel til API-et
        method: 'POST', // Bruker POST-metoden for å sende data
        headers: {
            'Content-Type': 'application/json' // Setter riktig innholdstype for forespørselen
        },
        body: JSON.stringify(userData) // Konverterer userData til JSON-format og sender det som kropp av forespørselen
    })
        .then(response => {
            if (response.ok) { // Sjekker om responsen er vellykket (statuskode 200-299)
                window.location.href = '/account/adminuserpage.html'; // Omdirigerer til administrasjonssiden ved vellykket oppretting av bruker
            } else {
                throw new Error('Kunne ikke opprette bruker.'); // Kaster en feil hvis oppretting av bruker mislykkes
            }
        })
        .catch(error => {
            document.getElementById('error-message').textContent = error.message; // Viser feilmelding til brukeren
        });
}
