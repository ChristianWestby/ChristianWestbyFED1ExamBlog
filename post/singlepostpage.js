document.addEventListener('DOMContentLoaded', function () {
    const singlePostSection = document.getElementById("single-post");
    const gridContainer = document.getElementById("grid-container");

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    let currentPostIndex = null;
    let blogData = [];

    console.log("URL Parameters:", window.location.search); 
    console.log("Post ID:", postId); 

    if (!postId) {
        singlePostSection.innerHTML = `<p>No post ID provided in the URL.</p>`;
        console.error("No post ID provided in the URL.");
        return;
    }

    console.log("Fetching single post with ID:", postId);

    fetch(`https://v2.api.noroff.dev/blog/posts/Christian_Westby/${postId}`)
        .then(response => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(function (data) {
            console.log("Fetched single post data:", data);
            const singlePostData = data.data; 

            if (!singlePostData) {
                console.error('No post found with the provided ID:', postId);
                singlePostSection.innerHTML = `<p>No post found with the provided ID.</p>`;
                return;
            }

            appendSinglePost(singlePostData);
        })
        .catch(error => {
            console.error("Error fetching single post:", error);
            singlePostSection.innerHTML = `<p>Error fetching post. Please try again later.</p>`;
        });

    console.log("Fetching blog posts for grid");
    fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
        .then(response => {
            console.log("Grid response status:", response.status);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(function (data) {
            console.log("Fetched blog posts data:", data);
            blogData = data.data; 

            if (!Array.isArray(blogData) || blogData.length === 0) {
                throw new Error('No blog posts found');
            }

            currentPostIndex = blogData.findIndex(post => post.id === postId);

            appendGridPosts(blogData);
        })
        .catch(error => {
            console.error("Error fetching blog posts:", error);
        });

    function appendSinglePost(postData) {
        singlePostSection.innerHTML = `
            <h1>${postData.title}</h1>
            ${postData.media ? `<img src="${postData.media.url}" alt="${postData.media.alt}" class="single-post-image">` : ''}
            <p>By ${postData.author?.name || 'Unknown Author'} on ${new Date(postData.created).toLocaleDateString()}</p>
            <p>${postData.body}</p>
            <div class="button-container">
                <button class="post-button" onclick="history.back()">Go Back</button>
                <button class="post-button" id="next-post-button">Next Post</button>
            </div>
        `;

        document.getElementById("next-post-button").addEventListener("click", function () {
            if (currentPostIndex !== null && blogData.length > 0) {
                currentPostIndex = (currentPostIndex + 1) % blogData.length;
                appendSinglePost(blogData[currentPostIndex]);
            }
        });
    }

    function appendGridPosts(posts) {
        posts.slice(0, 12).forEach(post => {
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
    }
});
