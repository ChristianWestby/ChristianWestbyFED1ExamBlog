// Funksjon for å håndtere opprettelse av ny bruker
function handleCreateUser() {
    const username = document.getElementById('username').value; 
    const email = document.getElementById('email').value; 
    const password = document.getElementById('password').value; 

    const userData = { 
        name: username,
        email: email,
        password: password
    };

    fetch('https://v2.api.noroff.dev/auth/register', { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(userData) 
    })
        .then(response => {
            if (response.ok) { 
                window.location.href = '/account/adminuserpage.html'; 
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Kunne ikke opprette bruker.'); 
                });
            }
        })
        .catch(error => {
            document.getElementById('error-message').textContent = error.message; 
        });
}
