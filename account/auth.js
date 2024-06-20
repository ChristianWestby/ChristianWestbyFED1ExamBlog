// Funksjon for å logge inn og få tilgangstoken
function login(username, password) {
    const credentials = {
        email: username,  
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
            const token = data.data.accessToken; 
            localStorage.setItem('accessToken',token); 
            console.log('Innlogging vellykket! Tilgangstoken lagret:',token);
            window.location.href = '/account/adminuserpage.html'; 
        })
        .catch(error => {
            console.error('Feil ved innlogging:', error.message);
        });
}
