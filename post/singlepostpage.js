document.addEventListener('DOMContentLoaded', function () {
    const singlePostSection = document.getElementById("single-post");
    const gridContainer = document.getElementById("grid-container");
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Henter enkeltinnlegg basert på ID
    fetch(`https://v2.api.noroff.dev/blog/posts/${postId}`)
        .then(response => response.json()) // Konverterer responsen til JSON
        .then(function appendSinglePost(data) {
            const singlePostData = data.data;
            if (singlePostData) {
                const singlePostDiv = document.createElement("div"); // Oppretter et nytt div-element
                singlePostDiv.classList.add("post"); // Legger til klassen 'post' til div-elementet
                singlePostDiv.innerHTML = `
                    <h1>${singlePostData.title}</h1> <!-- Viser tittelen på innlegget -->
                    <p>By ${singlePostData.author.name} on ${new Date(singlePostData.created).toLocaleDateString()}</p> <!-- Viser forfatter og dato -->
                    <p>${singlePostData.body}</p> <!-- Viser innholdet i innlegget -->
                    ${singlePostData.media ? `<img src="${singlePostData.media.url}" class="post-image">` : ''} <!-- Viser bilde hvis det finnes -->
                `;
                singlePostSection.appendChild(singlePostDiv); // Legger til div-elementet i seksjonen for enkeltinnlegg
            } else {
                console.error("No specific single post found. Data:", data); // Logger feil hvis spesifikk enkeltinnlegg ikke finnes
            }
        })
        .catch(error => {
            console.error("Error fetching single post:", error); // Logger feil ved henting av enkeltinnlegg
        });

    // Henter blogginnleggene for rutenettet
    fetch("https://v2.api.noroff.dev/blog/posts")
        .then(response => response.json()) // Konverterer responsen til JSON
        .then(function appendData(data) {
            const blogData = data.data; // Henter bloggdata
            console.log("Fetched blog posts data:", blogData);

            // Legger til de 12 siste innleggene i rutenettet
            blogData.slice(0, 12).forEach(data => {
                const newDiv = document.createElement("div"); // Oppretter et nytt div-element
                newDiv.classList.add("grid-item"); // Legger til klassen 'grid-item' til div-elementet
                newDiv.innerHTML = `
                    <h2>${data.title}</h2> <!-- Viser tittelen på innlegget -->
                    ${data.media ? `<img src="${data.media.url}" class="post-image">` : ''} <!-- Viser bilde hvis det finnes -->
                    <p>${data.body ? data.body.substring(0, 50) : ''}...</p> <!-- Viser en kort versjon av innholdet -->
                    <a href="singlepost.html?id=${data.id}" class="single-post-link">Les mer</a> <!-- Lenke til enkeltinnlegg -->
                `;
                gridContainer.appendChild(newDiv); // Legger til div-elementet i rutenettet
            });
        })
        .catch(error => {
            console.error("Error fetching blog posts:", error); // Logger feil ved henting av blogginnlegg
        });
});
