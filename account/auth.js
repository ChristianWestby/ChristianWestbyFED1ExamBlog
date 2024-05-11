// auth.js

// Funksjon for å sjekke om brukeren er autentisert
function checkAuthentication() {
    const token = localStorage.getItem('accessToken'); // Henter tilgangstoken fra localStorage

    if (!token) {
        // Hvis tilgangstoken ikke finnes, omdiriger til innloggingssiden
        window.location.href = '/login.html';
    } else {
        // Hvis tilgangstoken finnes, kan du implementere ytterligere logikk for å sjekke gyldigheten og gyldighetstiden til token
        // Her kan du for eksempel dekode og sjekke tokenet
        // Du kan også implementere en metode for å sende tokenet med forespørsler til beskyttede endepunkter
        console.log('Brukeren er autentisert med tilgangstoken:', token);
    }
}

// Funksjon for å logge inn og få tilgangstoken
function login(username, password) {
    const credentials = {
        username: username,
        password: password
    };

    fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Feil ved innlogging');
            }
            return response.json();
        })
        .then(data => {
            const token = data.token; // Få tilgangstoken fra responsen
            // Nå kan du lagre tilgangstoken og bruke den til sikrede forespørsler til andre endepunkter
            // Du kan for eksempel lagre den i localStorage for å beholde brukersesjonen
            localStorage.setItem('accessToken', token);
            console.log('Innlogging vellykket! Tilgangstoken lagret:', token);
            // Omdirigerer til admin-siden når innloggingen er vellykket
            window.location.href = '/adminuserpage.html';
        })
        .catch(error => {
            console.error('Feil ved innlogging:', error.message);
        });
}
