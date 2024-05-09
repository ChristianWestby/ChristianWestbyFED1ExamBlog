// JavaScript-kode for Administrasjonssiden

// Funksjon for å håndtere "Create New Post" -knappen
// JavaScript-kode for Create Post-siden

// Funksjon for å håndtere "Create Post" -knappen
function createPost() {
    // Legg til koden for å opprette en ny post her
    // Dette kan innebære å hente data fra skjemaet og sende det til API-et

    // Etter at posten er opprettet, kan du omdirigere brukeren tilbake til bloggfeed-siden
    window.location.href = "index.html";
}

// Event-lytter for "Create Post" -knappen
document.getElementById("create-post-btn").addEventListener("click", createPost);

// Funksjon for å håndtere "Go Back" -knappen
function goBack() {
    // Omdirigerer brukeren tilbake til bloggfeed-siden
    window.location.href = "index.html";
}

// Event-lytter for "Go Back" -knappen
document.getElementById("go-back-btn").addEventListener("click", goBack);

document.getElementById('go-back-btn').addEventListener('click', () => {
    // Omdirigerer brukeren til index.html-siden
    window.location.href = 'adminuserpage.html';
});
