document.addEventListener('DOMContentLoaded', function () {
    const singlePostSection = document.getElementById("single-post");
    const carouselInner = document.getElementById("carousel-inner");
    const gridContainer = document.getElementById("grid-container");

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id') || 'Christian_Westby'; // Use a default post ID for testing

    // Function to fetch posts for a specific user
    function fetchPostsForUser(userId) {
        fetch(`https://v2.api.noroff.dev/blog/posts/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function (data) {
                console.log("Fetched posts data:", data); // Log fetched data for debugging
                const posts = data.data; // Extract posts from response

                if (posts.length === 0) {
                    singlePostSection.innerHTML = `<p>No posts found for user ${userId}.</p>`;
                    return;
                }

                const singlePostData = posts[0]; // Assuming we want the first post
                const singlePostDiv = document.createElement("div");
                singlePostDiv.classList.add("post");
                singlePostDiv.innerHTML = `
                    <h1>${singlePostData.title}</h1>
                    <p>By ${singlePostData.author?.name || 'Unknown Author'} on ${new Date(singlePostData.created).toLocaleDateString()}</p>
                    ${singlePostData.media ? `<img src="${singlePostData.media.url}" class="post-image">` : ''}
                    <p>${singlePostData.body}</p>
                    <a href="singlepostpage.html?id=${singlePostData.id}" class="single-post-link">Read the post</a>
                `;
                singlePostSection.appendChild(singlePostDiv);

                // Add posts to carousel and grid
                appendPostsToCarousel(posts);
                appendPostsToGrid(posts);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                singlePostSection.innerHTML = `<p>Error fetching posts.</p>`;
            });
    }

    // Fetch posts for a specific user
    fetchPostsForUser(postId);

    // Function to append posts to the carousel
    function appendPostsToCarousel(posts) {
        const carouselItems = posts.slice(0, 6).map(post => {
            const newDiv = document.createElement("div");
            newDiv.classList.add("carousel-card");
            newDiv.innerHTML = `
                <h2>${truncateString(post.title, 30)}</h2>
                <p>${new Date(post.created).toLocaleDateString()}</p>
                ${post.media ? `<img src="${post.media.url}" class="post-image">` : ''}
                <p>${post.body ? post.body.substring(0, 25) : ''}...</p>
                <a href="singlepostpage.html?id=${post.id}" class="single-post-link">Read more</a>
            `;
            return newDiv;
        });

        // Clone the last 3 items to enable infinite scroll
        const carouselClones = carouselItems.map(item => item.cloneNode(true));
        carouselItems.push(...carouselClones);

        carouselItems.forEach(item => carouselInner.appendChild(item));
    }

    // Function to append posts to the grid
    function appendPostsToGrid(posts) {
        posts.slice(0, 12).forEach(post => {
            const newDiv = document.createElement("div");
            newDiv.classList.add("grid-item");
            newDiv.innerHTML = `
                <h2>${truncateString(post.title, 50)}</h2>
                ${post.media ? `<img src="${post.media.url}" class="post-image">` : ''}
                <p>${post.body ? post.body.substring(0, 50) : ''}...</p>
                <a href="singlepostpage.html?id=${post.id}" class="single-post-link">Read more</a>
            `;
            gridContainer.appendChild(newDiv);
        });
    }

    // Function to truncate strings to a specified length
    function truncateString(str, num) {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    }

    // Infinite scroll functionality for the carousel
    function startInfiniteScroll() {
        const scrollSpeed = 1; // Adjust scroll speed as needed
        let scrollPosition = 0;

        function scrollStep() {
            scrollPosition += scrollSpeed;
            carouselInner.scrollLeft = scrollPosition;

            // Loop the scroll position if it reaches the end
            if (scrollPosition >= carouselInner.scrollWidth / 2) {
                scrollPosition = 0;
            }

            requestAnimationFrame(scrollStep);
        }

        requestAnimationFrame(scrollStep);
    }

    startInfiniteScroll();
});
