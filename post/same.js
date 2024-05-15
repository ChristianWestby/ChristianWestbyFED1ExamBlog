document.addEventListener('DOMContentLoaded', function () {
    const singlePostSection = document.getElementById("single-post");
    const relatedPostsSection = document.getElementById("related-posts");
    const goBackButton = document.getElementById("go-back-button");
    const nextPostButton = document.getElementById("next-post-button");
    const secondSinglePostSection = document.getElementById("second-single-post");

    // Function to fetch and display related posts
    function fetchAndDisplayRelatedPosts() {
        fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby/")
            .then(response => response.json())
            .then(data => {
                const blogData = data.data.slice(1, 7); // Fetch next 6 posts
                relatedPostsSection.innerHTML = ""; // Clear previous posts
                blogData.forEach(post => {
                    const postDiv = document.createElement("div");
                    postDiv.innerHTML = `
                        <h1>${post.title}</h1>
                        <h2>ID number ${post.id}</h2>
                        <img src="${post.media ? post.media.url : ''}">
                        <p>${post.body}</p>
                        <a href="singlepost.html?id=${post.id}">Read more</a>
                    `;
                    relatedPostsSection.appendChild(postDiv);
                });
            });
    }

    // Fetch the single post
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) {
        fetch(`https://v2.api.noroff.dev/blog/posts/Christian_Westby/${postId}`)
            .then(response => response.json())
            .then(data => {
                const singlePostData = data.data; // Fetch the single post by ID
                const singlePostDiv = document.createElement("div");
                singlePostDiv.innerHTML = `
                    <h1>${singlePostData.title}</h1>
                    <h2>ID number ${singlePostData.id}</h2>
                    <img src="${singlePostData.media ? singlePostData.media.url : ''}">
                    <p>${singlePostData.body}</p>
                    <a href="text.html?id=${singlePostData.id}">Click here to open blog post</a>
                `;
                singlePostSection.appendChild(singlePostDiv);
            })
            .catch(error => {
                console.error("Error fetching single post:", error);
            });
    } else {
        console.error("No post ID found in URL.");
    }

    // Event listeners for buttons
    goBackButton.addEventListener("click", () => {
        window.location.href = "../index.html";
    });

    nextPostButton.addEventListener("click", () => {
        // Fetch and display next post
        fetchAndDisplayRelatedPosts();
    });

    // Call the function to fetch and display related posts when the page loads
    fetchAndDisplayRelatedPosts();
});
