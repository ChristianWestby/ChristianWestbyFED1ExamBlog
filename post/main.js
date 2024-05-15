document.addEventListener('DOMContentLoaded', function () {
    const singlePostSection = document.getElementById("single-post");
    const blogSection1 = document.querySelector("#blog-list-1 .carousel-inner");
    const blogSection2 = document.querySelector("#blog-list-2 .carousel-inner");

    // Fetch a single post before fetching the carousels
    fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
        .then(response => response.json())
        .then(function appendSinglePost(data) {
            if (data.data.length > 0) {
                const singlePostData = data.data[0]; // Fetch the first post
                const singlePostDiv = document.createElement("div");
                singlePostDiv.classList.add("post");
                singlePostDiv.innerHTML = `
                    <h1>${singlePostData.title}</h1>
                    <p>By ${singlePostData.author.name} on ${new Date(singlePostData.created).toLocaleDateString()}</p>
                    <p>${singlePostData.body}</p>
                    ${singlePostData.media ? `<img src="${singlePostData.media.url}" class="post-image">` : ''}
                    <a href="post/singlepost.html?id=${singlePostData.id}" class="single-post-link">Click here to open blog post</a>
                `;
                singlePostSection.appendChild(singlePostDiv);
            } else {
                console.error("No single post found.");
            }
        })
        .catch(error => {
            console.error("Error fetching single post:", error);
        });

    // Fetch the carousels
    fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
        .then(response => response.json())
        .then(function appendData(data) {
            const blogData = data.data;
            let postIndex1 = 1; // Variable to keep track of placement order for carousel 1
            let postIndex2 = 1; // Variable to keep track of placement order for carousel 2

            blogData.forEach(data => {
                const newDiv = document.createElement("div");
                newDiv.classList.add("post");
                newDiv.innerHTML = `
                    <h2>${data.title}</h2>
                    <p>By ${data.author.name} on ${new Date(data.created).toLocaleDateString()}</p>
                    <p>${data.body}</p>
                    ${data.media ? `<img src="${data.media.url}" class="post-image">` : ''}
                    <a href="post/singlepost.html?id=${data.id}" class="single-post-link">Click here to open blog post</a>
                `;

                if (postIndex1 <= 6) {
                    blogSection1.appendChild(newDiv);
                    postIndex1++; // Increment placement order for next post in carousel 1
                } else {
                    blogSection2.appendChild(newDiv);
                    postIndex2++; // Increment placement order for next post in carousel 2
                }
            });

            // Add event listeners for carousel navigation
            document.getElementById('prev-btn-1').addEventListener('click', () => scrollCarousel('blog-list-1', 'prev'));
            document.getElementById('next-btn-1').addEventListener('click', () => scrollCarousel('blog-list-1', 'next'));
            document.getElementById('prev-btn-2').addEventListener('click', () => scrollCarousel('blog-list-2', 'prev'));
            document.getElementById('next-btn-2').addEventListener('click', () => scrollCarousel('blog-list-2', 'next'));
        })
        .catch(error => {
            console.error("Error fetching blog posts:", error);
        });

    function scrollCarousel(carouselId, direction) {
        const carouselInner = document.querySelector(`#${carouselId} .carousel-inner`);
        const scrollAmount = 300; // Adjust based on the width of each post
        if (direction === 'prev') {
            carouselInner.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            carouselInner.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
});
