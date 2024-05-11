// Funksjon for å håndtere "Create Post" -knappen
const createBtn = document.getElementById("create-post-btn")
const backBtn = document.getElementById("go-back-btn")
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2hyaXN0aWFuX1dlc3RieSIsImVtYWlsIjoiY2hyaXN0aWFuLndlc3RieUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxNTA4MDg5OH0.mQNsA2l7uUcw1wju125fK4_lJQC8ax1_g_J-QmT0HE8"

function createPost() {
    // Henter data fra skjemaet
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    // Oppretter et objekt med postdataene
    const postData = {
        title: title,
        content: content
    };

    // Sender postdataene til API-et gjennom auth.js
    fetch('https://v2.api.noroff.dev/blog/posts/Christian_Westby', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer `+ authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Feil ved opprettelse av post');
            }
            return response.json();
        })
        .then(data => {
            console.log('Post opprettet:', data);
            // Etter at posten er opprettet, kan du omdirigere brukeren tilbake til admin-siden
            window.location.href = '/post/index.html';
        })
        .catch(error => {
            console.error('Feil ved opprettelse av post:', error.message);
            // Hvis det oppstår en feil, kan du gi en feilmelding til brukeren
            alert('Feil ved opprettelse av post. Vennligst prøv igjen.');
        });
}

function goBack() {
    // Omdirigerer brukeren tilbake til adminuserpage.html-siden
    window.location.href = "adminuserpage.html";
}

// Event-lytter for "Create Post" -knappen
createBtn.addEventListener("click", createPost);


// Event-lytter for "Go Back" -knappen
backBtn.addEventListener("click", goBack);

// Funksjon for å håndtere "Go Back" -knappen


