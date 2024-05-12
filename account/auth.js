// Funksjon for å logge inn og få tilgangstoken
function login(username, password) {
    const credentials = {
        email: username,  // Assuming the API expects an email, adjust if it indeed uses username
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
            const token = data.data.accessToken; // Hent tilgangstoken fra responsen
            localStorage.setItem('accessToken',token); // Lagre tilgangstoken i Local Storage
            console.log('Innlogging vellykket! Tilgangstoken lagret:',token);
            window.location.href = '/account/adminuserpage.html'; // Omdiriger til admin-siden når innloggingen er vellykket
        })
        .catch(error => {
            console.error('Feil ved innlogging:', error.message);
        });
}
