document.addEventListener('DOMContentLoaded', function () {
    const singlePostSection = document.getElementById("single-post"); // Henter elementet for enkeltinnlegg
    const carouselInner = document.getElementById("carousel-inner"); // Henter karusellens inner-container
    const gridContainer = document.getElementById("grid-container"); // Henter grid-container for innleggene

    // Henter enkeltinnlegg før karusellene
    fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
        .then(response => response.json()) // Konverterer responsen til JSON
        .then(function appendSinglePost(data) {
            if (data.data.length > 0) { // Sjekker om det er innlegg i data
                const singlePostData = data.data.find(post => post.title.includes("A JOURNEY BEYOND WORDS")); // Finner spesifikk post
                if (singlePostData) {
                    const singlePostDiv = document.createElement("div"); // Oppretter et nytt div-element
                    singlePostDiv.classList.add("post"); // Legger til klassen 'post' til div-elementet
                    singlePostDiv.innerHTML = `
                        <h1>${singlePostData.title}</h1> <!-- Viser tittelen på innlegget -->
                        <p>By ${singlePostData.author.name} on ${new Date(singlePostData.created).toLocaleDateString()}</p> <!-- Viser forfatter og dato -->
                        <p>${singlePostData.body}</p> <!-- Viser innholdet i innlegget -->
                        ${singlePostData.media ? `<img src="${singlePostData.media.url}" class="post-image">` : ''} <!-- Viser bilde hvis det finnes -->
                        <a href="post/singlepost.html?id=${singlePostData.id}" class="single-post-link">Click here to open blog post</a> <!-- Lenke til enkeltinnlegg -->
                    `;
                    singlePostSection.appendChild(singlePostDiv); // Legger til div-elementet i seksjonen for enkeltinnlegg
                } else {
                    console.error("No specific single post found. Data:", data.data); // Logger feil hvis spesifikk enkeltinnlegg ikke finnes
                }
            } else {
                console.error("No single post found. Data:", data); // Logger feil hvis ingen enkeltinnlegg finnes
            }
        })
        .catch(error => {
            console.error("Error fetching single post:", error); // Logger feil ved henting av enkeltinnlegg
        });

    // Henter blogginnleggene for karusellen og rutenettet
    fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
        .then(response => response.json()) // Konverterer responsen til JSON
        .then(function appendData(data) {
            const blogData = data.data; // Henter bloggdata
            console.log("Fetched blog posts data:", blogData);

            // Legger til de 3 nyeste innleggene i karusellen
            const carouselItems = blogData.slice(0, 3).map(data => {
                const newDiv = document.createElement("div"); // Oppretter et nytt div-element
                newDiv.classList.add("carousel-card"); // Legger til klassen 'carousel-card' til div-elementet
                newDiv.innerHTML = `
                    <h2>${data.title}</h2> <!-- Viser tittelen på innlegget -->
                    <p>${new Date(data.created).toLocaleDateString()}</p> <!-- Viser datoen -->
                    ${data.media ? `<img src="${data.media.url}" class="post-image">` : ''} <!-- Viser bilde hvis det finnes -->
                    <p>${data.body ? data.body.substring(0, 25) : ''}...</p> <!-- Viser en kort versjon av innholdet -->
                    <a href="post/singlepost.html?id=${data.id}" class="single-post-link">Les mer</a> <!-- Lenke til enkeltinnlegg -->
                `;
                return newDiv;
            });

            carouselItems.forEach(item => carouselInner.appendChild(item)); // Legger til elementene i karusellen
            carouselItems.forEach(item => carouselInner.appendChild(item.cloneNode(true))); // Legger til klonede elementer i karusellen for uendelig loop

            // Legger til de 12 siste innleggene i rutenettet
            blogData.slice(0, 12).forEach(data => {
                const newDiv = document.createElement("div"); // Oppretter et nytt div-element
                newDiv.classList.add("grid-item"); // Legger til klassen 'grid-item' til div-elementet
                newDiv.innerHTML = `
                    <h2>${data.title}</h2> <!-- Viser tittelen på innlegget -->
                    ${data.media ? `<img src="${data.media.url}" class="post-image">` : ''} <!-- Viser bilde hvis det finnes -->
                    <p>${data.body ? data.body.substring(0, 50) : ''}...</p> <!-- Viser en kort versjon av innholdet -->
                    <a href="post/singlepost.html?id=${data.id}" class="single-post-link">Les mer</a> <!-- Lenke til enkeltinnlegg -->
                `;
                gridContainer.appendChild(newDiv); // Legger til div-elementet i rutenettet
            });

            // Legger til event listeners for karusellnavigasjon
            document.getElementById('prev-btn').addEventListener('click', () => scrollCarousel('prev')); // Legger til event listener for forrige knapp
            document.getElementById('next-btn').addEventListener('click', () => scrollCarousel('next')); // Legger til event listener for neste knapp
        })
        .catch(error => {
            console.error("Error fetching blog posts:", error); // Logger feil ved henting av blogginnlegg
        });

    function scrollCarousel(direction) {
        const cards = document.querySelectorAll('.carousel-card');
        const firstCard = cards[0];
        const lastCard = cards[cards.length - 1];

        if (direction === 'prev') {
            carouselInner.insertBefore(lastCard, firstCard);
            carouselInner.scrollBy({ left: -lastCard.offsetWidth, behavior: 'smooth' });
        } else {
            carouselInner.appendChild(firstCard);
            carouselInner.scrollBy({ left: firstCard.offsetWidth, behavior: 'smooth' });
        }
    }
});
