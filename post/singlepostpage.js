document.addEventListener('DOMContentLoaded', function () {
    const singlePostSection = document.getElementById("single-post");
    const gridContainer = document.getElementById("grid-container");

    const urlParams = new URLSearchParams(window.location.search);
     const postId = urlParams.get('id') || 'Christian_Westby'; 

    if (!postId) {
        singlePostSection.innerHTML = `<p>No post ID provided in the URL.</p>`;
        console.error("No post ID provided in the URL.");
        return;
    }

    console.log("Fetching single post with ID:", postId);

    // Fetch single post based on ID
    fetch(`https://v2.api.noroff.dev/blog/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            console.log("Fetched single post data:", data);
            const singlePostData = data.data;

            if (!singlePostData) {
                console.error('No post found with the provided ID:', postId);
                throw new Error('No post found with the provided ID');
            }

            // Append the single post to the DOM
            const singlePostDiv = document.createElement("div");
            singlePostDiv.classList.add("post");
            singlePostDiv.innerHTML = `
                <h1>${singlePostData.title}</h1>
                ${singlePostData.media ? `<img src="${singlePostData.media.url}" alt="${singlePostData.media.alt}" class="single-post-image">` : ''}
                <p>By ${singlePostData.author?.name || 'Unknown Author'} on ${new Date(singlePostData.created).toLocaleDateString()}</p>
                <p>${singlePostData.body}</p>
                <div class="button-container">
                    <a href="index.html" class="post-button">Go Back</a>
                    <a href="#" class="post-button">Next Post</a>
                    <a href="#" class="post-button">View More</a>
                </div>
            `;
            singlePostSection.appendChild(singlePostDiv);
        })
        .catch(error => {
            console.error("Error fetching single post:", error);
            singlePostSection.innerHTML = `<p>Error fetching post. Please try again later.</p>`;
        });

    // Fetch blog posts for the grid
    console.log("Fetching blog posts for grid");
    fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            console.log("Fetched blog posts data:", data);
            const blogData = data.data;

            if (!Array.isArray(blogData) || blogData.length === 0) {
                throw new Error('No blog posts found');
            }

            blogData.slice(0, 12).forEach(post => {
                const newDiv = document.createElement("div");
                newDiv.classList.add("grid-item");
                const title = post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title;
                newDiv.innerHTML = `
                    <div class="title-container">
                        <h2>${title}</h2>
                    </div>
                    ${post.media ? `<img src="${post.media.url}" class="post-image">` : ''}
                    <p>${post.body ? post.body.substring(0, 50) : ''}...</p>
                    <a href="singlepostpage.html?id=${post.id}" class="single-post-link">Read more</a>
                `;
                gridContainer.appendChild(newDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching blog posts:", error);
        });
});
