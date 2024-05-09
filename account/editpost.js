// Fetcher poster fra API-et
function fetchPosts() {
    fetch('https://v2.api.noroff.dev/blog/posts/Christian_Westby/')
        .then(response => response.json())
        .then(data => {
            // Her kan du behandle de hentede postene, for eksempel legge dem til i avkryssningsfeltene
            // Du må implementere dette basert på din API-struktur
        })
        .catch(error => {
            console.error('Feil ved henting av poster:', error);
        });
}

// Lytter etter klikk på "Rediger Post" -knappen
document.getElementById('edit-post-btn').addEventListener('click', () => {
    // Henter valgt post og viser den i redigerings-skjemaet
    // Du må implementere denne funksjonaliteten basert på din API-struktur
});

// Lytter etter klikk på "Slett Post" -knappen
document.getElementById('delete-post-btn').addEventListener('click', () => {
    // Sletter valgt post fra API-et
    // Du må implementere denne funksjonaliteten basert på din API-struktur
});

// Kaller funksjonen for å hente poster når siden lastes
fetchPosts();
