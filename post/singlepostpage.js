document.addEventListener('DOMContentLoaded', function () {
    const singlePostSection = document.getElementById("single-post");
    const gridContainer = document.getElementById("grid-container");
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Fetch single post based on ID
    fetch(`https://v2.api.noroff.dev/blog/posts/${postId}`)
        .then(response => response.json())
        .then(function appendSinglePost(data) {
            if (data && data.data) {
                const singlePostData = data.data;
                if (singlePostData) {
                    const singlePostDiv = document.createElement("div");
                    singlePostDiv.classList.add("post");
                    singlePostDiv.innerHTML = `
                        <h1>${singlePostData.title}</h1>
                        ${singlePostData.media ? `<img src="${singlePostData.media.url}" alt="${singlePostData.media.alt}" class="single-post-image">` : ''}
                        <p>By ${singlePostData.author.name} on ${new Date(singlePostData.created).toLocaleDateString()}</p>
                        <p>${singlePostData.body}</p>
                        <div class="button-container">
                            <a href="index.html" class="post-button">Go Back</a>
                            <a href="#" class="post-button">Next Post</a>
                            <a href="#" class="post-button">View More</a>
                        </div>
                    `;
                    singlePostSection.appendChild(singlePostDiv);
                } else {
                    console.error("No specific single post found. Data:", data);
                }
            } else {
                console.error("Invalid response data:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching single post:", error);
        });

    // Fetch blog posts for the grid
    fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
        .then(response => response.json())
        .then(function appendData(data) {
            const blogData = data.data;
            console.log("Fetched blog posts data:", blogData);

            if (Array.isArray(blogData) && blogData.length > 0) {
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
                        <a href="singlepost.html?id=${post.id}" class="single-post-link">Read more</a>
                    `;
                    gridContainer.appendChild(newDiv);
                });
            } else {
                console.error("No blog posts found. Data:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching blog posts:", error);
        });
});
