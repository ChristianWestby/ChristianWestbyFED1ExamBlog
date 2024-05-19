document.addEventListener('DOMContentLoaded', function () {
    const singlePostSection = document.getElementById("single-post"); // Henter elementet for enkeltinnlegg
    const carouselInner = document.getElementById("carousel-inner"); // Henter karusellens inner-container
    const gridContainer = document.getElementById("grid-container"); // Henter grid-container for innleggene

    // Henter enkeltinnlegg før karusellene
    fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
        .then(response => response.json()) // Konverterer responsen til JSON
        .then(function appendSinglePost(data) {
            console.log('Fetched single post data:', data); // Logger dataen for enkel innsjekking
            const posts = data.data; // Henter alle innlegg
            const specificPost = posts.find(post => post.title === "# A JOURNEY BEYOND WORDS: CAPTURING THE ESSENCE OF EPIC NATURE IN YOUR WRITING");

            if (specificPost) { // Sjekker om det spesifikke innlegget finnes
                const singlePostDiv = document.createElement("div"); // Oppretter et nytt div-element
                singlePostDiv.classList.add("post"); // Legger til klassen 'post' til div-elementet
                singlePostDiv.innerHTML = `
                    <h1>${specificPost.title}</h1> <!-- Viser tittelen på innlegget -->
                    <p>By ${specificPost.author.name} on ${new Date(specificPost.created).toLocaleDateString()}</p> <!-- Viser forfatter og dato -->
                    ${specificPost.media ? `<img src="${specificPost.media.url}" class="post-image">` : ''} <!-- Viser bilde hvis det finnes -->
                    <p>${specificPost.body}</p> <!-- Viser innholdet i innlegget -->
                    <a href="post/singlepost.html?id=${specificPost.id}" class="single-post-link">Click here to open blog post</a> <!-- Lenke til enkeltinnlegg -->
                `;
                singlePostSection.appendChild(singlePostDiv); // Legger til div-elementet i seksjonen for enkeltinnlegg
            } else {
                console.error("No specific single post found. Data:", posts); // Logger feil hvis det spesifikke innlegget ikke finnes
            }
        })
        .catch(error => {
            console.error("Error fetching single post:", error); // Logger feil ved henting av enkeltinnlegg
        });

    // Henter blogginnleggene for karusellen og rutenettet
    fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
        .then(response => response.json()) // Konverterer responsen til JSON
        .then(function appendData(data) {
            console.log('Fetched blog posts data:', data); // Logger dataen for enkel innsjekking
            const blogData = data.data; // Henter bloggdata

            if (blogData.length > 0) {
                // Legger til de 3 nyeste innleggene i karusellen
                blogData.slice(0, 3).forEach(data => {
                    const newDiv = document.createElement("div"); // Oppretter et nytt div-element
                    newDiv.classList.add("carousel-card"); // Legger til klassen 'carousel-card' til div-elementet
                    newDiv.innerHTML = `
                        <h2>${data.title}</h2> <!-- Viser tittelen på innlegget -->
                        <p>${new Date(data.created).toLocaleDateString()}</p> <!-- Viser datoen -->
                        ${data.media ? `<img src="${data.media.url}" class="post-image">` : ''} <!-- Viser bilde hvis det finnes -->
                        <p>${data.body ? data.body.substring(0, 25) : ''}...</p> <!-- Viser en kort versjon av innholdet -->
                        <a href="post/singlepost.html?id=${data.id}" class="single-post-link">Les mer</a> <!-- Lenke til enkeltinnlegg -->
                    `;
                    carouselInner.appendChild(newDiv); // Legger til div-elementet i karusellen
                });

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
            } else {
                console.error("No blog posts found. Data:", blogData); // Logger feil hvis ingen blogginnlegg finnes
            }
        })
        .catch(error => {
            console.error("Error fetching blog posts:", error); // Logger feil ved henting av blogginnlegg
        });

    function scrollCarousel(direction) {
        const carouselInner = document.getElementById('carousel-inner'); // Henter karusell-elementet
        const scrollAmount = carouselInner.clientWidth * 0.2; // Justerer basert på 20% av bredden av containeren

        if (direction === 'prev') {
            carouselInner.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); // Scroller til venstre
        } else {
            carouselInner.scrollBy({ left: scrollAmount, behavior: 'smooth' }); // Scroller til høyre
        }

        // Gjenoppretter posisjonen når man når slutten
        if (carouselInner.scrollLeft + carouselInner.clientWidth >= carouselInner.scrollWidth && direction === 'next') {
            carouselInner.scrollTo({ left: 0, behavior: 'smooth' }); // Går til start
        } else if (carouselInner.scrollLeft <= 0 && direction === 'prev') {
            carouselInner.scrollTo({ left: carouselInner.scrollWidth, behavior: 'smooth' }); // Går til slutt
        }
    }
});
