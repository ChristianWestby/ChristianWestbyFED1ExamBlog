document.addEventListener('DOMContentLoaded', function () {
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2hyaXN0aWFuX1dlc3RieSIsImVtYWlsIjoiY2hyaXN0aWFuLndlc3RieUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxNTA4MDg5OH0.mQNsA2l7uUcw1wju125fK4_lJQC8ax1_g_J-QmT0HE8"; // Sett inn ditt autentiseringstoken her

    // Fetcher poster fra API-et
    function fetchPosts() {
        fetch('https://v2.api.noroff.dev/blog/posts/Christian_Westby/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Noe gikk galt ved henting av poster');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data hentet:', data);

            const posts = data.data; // Bruker data.data som posts
            console.log('Posts:', posts);

            const postContainer = document.getElementById('post-checkbox-container');

            // Tøm avkryssningsfeltene før du legger til nye poster
            postContainer.innerHTML = '';

            if (Array.isArray(posts)) {
                // Gå gjennom hver post og opprett et avkryssningsfelt for den
                posts.forEach((post, index) => {
                    console.log('Post:', post);
                    const checkboxWrapper = document.createElement('div');
                    checkboxWrapper.className = 'checkbox-wrapper';

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `post-${post.id}`;
                    checkbox.name = 'post';
                    checkbox.value = post.id;

                    const label = document.createElement('label');
                    label.htmlFor = `post-${post.id}`;
                    label.textContent = `${index + 1}. ${post.title}`;

                    checkboxWrapper.appendChild(checkbox);
                    checkboxWrapper.appendChild(label);
                    postContainer.appendChild(checkboxWrapper);

                    const underline = document.createElement('hr');
                    postContainer.appendChild(underline);
                });
            } else {
                console.error('Posts er ikke en liste:', posts);
            }
        })
        .catch(error => {
            console.error('Feil ved henting av poster:', error);
        });
    }

    // Funksjon for å hente den avkryssede posten for redigering
    function fetchSelectedPostForEditing() {
        const selectedPostCheckbox = document.querySelector('input[name="post"]:checked');

        if (selectedPostCheckbox) {
            const selectedPostId = selectedPostCheckbox.value;
            console.log('Valgt post-ID for redigering:', selectedPostId);

            fetch(`https://v2.api.noroff.dev/blog/posts/Christian_Westby/${selectedPostId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Feil ved henting av post for redigering');
                }
                return response.json();
            })
            .then(post => {
                console.log('Post hentet for redigering:', post);
                
                const postData = post.data; // Bruker post.data for å få tilgang til postens faktiske data
                console.log('Post Data:', postData);

                // Fyller inn skjemaet med postens tittel, forfatter, innhold og bilde-URL
                document.getElementById('updated-title').value = postData.title || '';
                document.getElementById('updated-author').value = postData.author.name || '';
                document.getElementById('updated-content').value = postData.body || '';
                document.getElementById('edit-image-url').value = postData.media ? postData.media.url : '';

                // Åpne redigeringsvinduet
                document.getElementById('edit-modal').style.display = 'block';
            })
            .catch(error => {
                console.error('Feil ved henting av post for redigering:', error);
            });
        } else {
            console.log('Ingen post er valgt for redigering');
        }
    }

    // Funksjon for å oppdatere posten
    function updatePost(event) {
        event.preventDefault();

        const selectedPostId = document.querySelector('input[name="post"]:checked').value;
        const updatedTitle = document.getElementById('updated-title').value;
        const updatedAuthor = document.getElementById('updated-author').value;
        const updatedContent = document.getElementById('updated-content').value;
        const updatedImageUrl = document.getElementById('edit-image-url').value;

        console.log('Oppdatert tittel:', updatedTitle);
        console.log('Oppdatert forfatter:', updatedAuthor);
        console.log('Oppdatert innhold:', updatedContent);
        console.log('Oppdatert bilde-URL:', updatedImageUrl);

        const updatedPostData = {
            title: updatedTitle,
            body: updatedContent,
            tags: [],
            media: updatedImageUrl ? { url: updatedImageUrl, alt: "" } : null,
            author: { name: updatedAuthor }
        };

        console.log('Oppdaterer post med ID:', selectedPostId);
        console.log('Oppdaterer post med data:', JSON.stringify(updatedPostData));

        fetch(`https://v2.api.noroff.dev/blog/posts/Christian_Westby/${selectedPostId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updatedPostData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            console.log('Post oppdatert:', data);
            document.getElementById('edit-modal').style.display = 'none';
            fetchPosts(); // Oppdater postlisten etter oppdatering
        })
        .catch(error => {
            console.error('Feil ved oppdatering av posten:', error);
        });
    }

    // Funksjon for å slette posten
    function deletePost() {
        const selectedPostCheckbox = document.querySelector('input[name="post"]:checked');
        if (!selectedPostCheckbox) {
            console.log('Ingen post valgt for sletting');
            return;
        }

        const selectedPostId = selectedPostCheckbox.value;
        console.log('Sletter post-ID:', selectedPostId);

        fetch(`https://v2.api.noroff.dev/blog/posts/Christian_Westby/${selectedPostId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Feil ved sletting av posten');
            }
            console.log('Post slettet:', selectedPostId);
            // Oppdater postlisten etter sletting
            fetchPosts();
        })
        .catch(error => {
            console.error('Feil ved sletting av posten:', error);
        });
    }

    document.getElementById('edit-post-btn').addEventListener('click', fetchSelectedPostForEditing);
    document.getElementById('update-post-form').addEventListener('submit', updatePost);
    document.getElementById('delete-post-btn').addEventListener('click', deletePost);
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('edit-modal').style.display = 'none';
    });

    fetchPosts();
});
