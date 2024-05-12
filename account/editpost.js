document.addEventListener('DOMContentLoaded', function () {
    // Fetcher poster fra API-et
    function fetchPosts() {
        fetch('https://v2.api.noroff.dev/blog/posts/Christian_Westby/', {
            method: 'GET' // Bruk GET-metoden for å hente poster
        })
            .then(response => response.json())
            .then(data => {
                const posts = data.data; // Anta at responsen er en liste med poster
                const postContainer = document.getElementById('post-checkbox-container');

                // Tøm avkryssningsfeltene før du legger til nye poster
                postContainer.innerHTML = '';

                // Gå gjennom hver post og opprett et avkryssningsfelt for den
                posts.forEach(post => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `post-${post.id}`; // Bruk postens ID som identifikator
                    checkbox.name = 'post';
                    checkbox.value = post.id; // Bruk postens ID som verdi
                    const label = document.createElement('label');
                    label.htmlFor = `post-${post.id}`;
                    label.textContent = post.title; // Anta at tittelen til posten er det du ønsker å vise

                    // Legg til avkryssningsfeltet og etiketten i containeren
                    postContainer.appendChild(checkbox);
                    postContainer.appendChild(label);
                    postContainer.appendChild(document.createElement('br')); // Legg til en linjeskift for å separere elementene
                });
            })
            .catch(error => {
                console.error('Feil ved henting av poster:', error);
            });
    }

    // Lytter etter klikk på "Rediger Post" -knappen
    document.getElementById('edit-post-btn').addEventListener('click', () => {
        // Henter valgt post-ID fra det avkryssningsfeltet som er avkrysset
        const selectedPostId = document.querySelector('input[name="post"]:checked').value;
        console.log('Valgt post-ID for redigering:', selectedPostId);

        // Henter postinformasjon basert på post-ID-en og fyller inn skjemaet med denne informasjonen
        fetch(`https://v2.api.noroff.dev/blog/posts/Christian_Westby/${selectedPostId}`)
            .then(response => response.json())
            .then(post => {
                // Fyller inn skjemaet med postens tittel og innhold
                document.getElementById('updated-title').value = post.title;
                document.getElementById('updated-content').value = post.content;
            })
            .catch(error => {
                console.error('Feil ved henting av post for redigering:', error);
            });
    });

    // Lytter etter innsending av skjemaet for redigering av post
    document.getElementById('edit-post-form').addEventListener('submit', event => {
        event.preventDefault(); // Forhindrer standard skjema-innsending

        // Henter valgt post-ID fra det skjulte input-feltet
        const selectedPostId = document.getElementById('selected-post-id').value;
        console.log('Valgt post-ID for redigering:', selectedPostId);

        // Henter redigeringsdata fra skjemaet
        const updatedTitle = document.getElementById('updated-title').value;
        const updatedContent = document.getElementById('updated-content').value;

        // Implementer PUT-metoden for å oppdatere posten basert på post-ID-en og redigeringsdataene
        fetch(`https://v2.api.noroff.dev/blog/posts/Christian_Westby/${selectedPostId}`, {
            method: 'PUT', // Bruk PUT-metoden for å oppdatere posten
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: updatedTitle,
                content: updatedContent
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Posten ble oppdatert vellykket!');
                    // Implementer eventuell videre håndtering etter oppdatering av posten
                } else {
                    throw new Error('Feil ved oppdatering av posten');
                }
            })
            .catch(error => {
                console.error('Feil ved oppdatering av posten:', error);
            });
    });

    // Lytter etter innsending av skjemaet for sletting av post
    document.getElementById('delete-post-btn').addEventListener('submit', event => {
        event.preventDefault(); // Forhindrer standard skjema-innsending

        // Henter valgt post-ID fra det skjulte input-feltet
        const selectedPostId = document.getElementById('selected-post-id').value;
        console.log('Valgt post-ID for sletting:', selectedPostId);

        // Implementer logikken for sletting av post basert på post-ID-en
    });

    // Kaller funksjonen for å hente poster når siden lastes
    fetchPosts();
});
