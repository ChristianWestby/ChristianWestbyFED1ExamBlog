const singlePostSection = document.getElementById("single-post");
const relatedPostsSection = document.getElementById("related-posts");
const goBackButton = document.getElementById("go-back-button");
const nextPostButton = document.getElementById("next-post-button");

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
                    <p>${post.body}</p>
                    <h2>ID number ${post.id}</h2>
                    <img src="${post.media.url}">
                    <a href="/post/text.html?id=${post.id}">Read more</a>
                `;
                relatedPostsSection.appendChild(postDiv);
            });
        });
}

// Fetch the single post
fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby/")
    .then(response => response.json())
    .then(data => {
        const singlePostData = data.data[0]; // Fetch the first post
        const singlePostDiv = document.createElement("div");
        singlePostDiv.innerHTML = `
            <h1>${singlePostData.title}</h1>
            <p>${singlePostData.body}</p>
            <h2>ID number ${singlePostData.id}</h2>
            <img src="${singlePostData.media.url}">
            <a href="/post/text.html?id=${singlePostData.id}">Click here to open blog post</a>
        `;
        singlePostSection.appendChild(singlePostDiv);
    });

// Event listeners for buttons
goBackButton.addEventListener("click", () => {
    window.location.href = "index.html";
});

nextPostButton.addEventListener("click", () => {
    // Fetch and display next post
});

// Call the function to fetch and display related posts when the page loads
fetchAndDisplayRelatedPosts();
