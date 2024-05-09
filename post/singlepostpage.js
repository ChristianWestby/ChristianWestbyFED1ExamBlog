// const singlePostSection = document.getElementById("single-post");
// const relatedPostsSection = document.getElementById("related-posts");
// const goBackButton = document.getElementById("go-back-button");
// const nextPostButton = document.getElementById("next-post-button");
//
// // Function to fetch and display related posts
// function fetchAndDisplayRelatedPosts() {
//     fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby/")
//         .then(response => response.json())
//         .then(data => {
//             const blogData = data.data.slice(1, 7); // Fetch next 6 posts
//             relatedPostsSection.innerHTML = ""; // Clear previous posts
//             blogData.forEach(post => {
//                 const postDiv = document.createElement("div");
//                 postDiv.innerHTML = `
//                     <h1>${post.title}</h1>
//                     <h2>ID number ${post.id}</h2>
//                     <img src="${post.media.url}">
//                      <p>${post.body}</p>
//                     <a href="/post/text.html?id=${post.id}">Read more</a>
//                 `;
//                 relatedPostsSection.appendChild(postDiv);
//             });
//         });
// }
//
// // Fetch the single post
// fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby/")
//     .then(response => response.json())
//     .then(data => {
//         const singlePostData = data.data[0]; // Fetch the first post
//         const singlePostDiv = document.createElement("div");
//         singlePostDiv.innerHTML = `
//             <h1>${singlePostData.title}</h1>
//             <h2>ID number ${singlePostData.id}</h2>
//             <img src="${singlePostData.media.url}">
//              <p>${singlePostData.body}</p>
//             <a href="/post/text.html?id=${singlePostData.id}">Click here to open blog post</a>
//         `;
//         singlePostSection.appendChild(singlePostDiv);
//     });
//
// // Event listeners for buttons
// goBackButton.addEventListener("click", () => {
//     window.location.href = "index.html";
// });
//
// nextPostButton.addEventListener("click", () => {
//     // Fetch and display next post
// });
//
// // Call the function to fetch and display related posts when the page loads
// fetchAndDisplayRelatedPosts();
//
// const secondSinglePostSection = document.getElementById("second-single-post");
//
// // Function to fetch and display a random post
// function fetchAndDisplayRandomPost() {
//     fetch("https://v2.api.noroff.dev/blog/posts/random/")
//         .then(response => response.json())
//         .then(data => {
//             const randomPostData = data.data; // Fetch the random post
//             const randomPostDiv = document.createElement("div");
//             randomPostDiv.innerHTML = `
//                 <h1>${randomPostData.title}</h1>
//                 <h2>ID number ${randomPostData.id}</h2>
//                 <img src="${randomPostData.media.url}">
//                 <p>${randomPostData.body}</p>
//                 <a href="/post/text.html?id=${randomPostData.id}">Click here to open blog post</a>
//             `;
//             secondSinglePostSection.innerHTML = ""; // Clear previous post
//             secondSinglePostSection.appendChild(randomPostDiv);
//         });
// }
//
// // Call the function to fetch and display a random post when the page loads
// fetchAndDisplayRandomPost();
//
// const singlePostSection = document.getElementById("single-post");
// const relatedPostsSection = document.getElementById("related-posts");
// const goBackButton = document.getElementById("go-back-button");
// const nextPostButton = document.getElementById("next-post-button");
// const secondSinglePostSection = document.getElementById("second-single-post");
//
// // Function to fetch and display related posts
// function fetchAndDisplayRelatedPosts() {
//     fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby/")
//         .then(response => response.json())
//         .then(data => {
//             const blogData = data.data.slice(1, 7); // Fetch next 6 posts
//             relatedPostsSection.innerHTML = ""; // Clear previous posts
//             blogData.forEach(post => {
//                 const postDiv = document.createElement("div");
//                 postDiv.innerHTML = `
//                     <h1>${post.title}</h1>
//                     <h2>ID number ${post.id}</h2>
//                     <img src="${post.media.url}">
//                     <p>${post.body}</p>
//                     <a href="/post/text.html?id=${post.id}">Read more</a>
//                 `;
//                 relatedPostsSection.appendChild(postDiv);
//             });
//         });
// }
//
// // Fetch the single post
// fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby/")
//     .then(response => response.json())
//     .then(data => {
//         const singlePostData = data.data[0]; // Fetch the first post
//         const singlePostDiv = document.createElement("div");
//         singlePostDiv.innerHTML = `
//             <h1>${singlePostData.title}</h1>
//             <h2>ID number ${singlePostData.id}</h2>
//             <img src="${singlePostData.media.url}">
//             <p>${singlePostData.body}</p>
//             <a href="/post/text.html?id=${singlePostData.id}">Click here to open blog post</a>
//         `;
//         singlePostSection.appendChild(singlePostDiv);
//     });
//
// // Event listeners for buttons
// goBackButton.addEventListener("click", () => {
//     window.location.href = "index.html";
// });
//
// nextPostButton.addEventListener("click", () => {
//     // Fetch and display next post
// });
//
// // Call the function to fetch and display related posts when the page loads
// fetchAndDisplayRelatedPosts();
//
// // Function to fetch and display a random post
// function fetchAndDisplayRandomPost() {
//     fetch("https://v2.api.noroff.dev/blog/posts/random/")
//         .then(response => response.json())
//         .then(data => {
//             const randomPostData = data.data; // Fetch the random post
//             const randomPostDiv = document.createElement("div");
//             randomPostDiv.innerHTML = `
//                 <h1>${randomPostData.title}</h1>
//                 <h2>ID number ${randomPostData.id}</h2>
//                 <img src="${randomPostData.media.url}">
//                 <p>${randomPostData.body}</p>
//                 <a href="/post/text.html?id=${randomPostData.id}">Click here to open blog post</a>
//             `;
//             secondSinglePostSection.innerHTML = ""; // Clear previous post
//             secondSinglePostSection.appendChild(randomPostDiv);
//         });
// }
//
// // Call the function to fetch and display a random post when the page loads
// fetchAndDisplayRandomPost();
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
                    <img src="${post.media.url}">
                    <p>${post.body}</p>
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
            <h2>ID number ${singlePostData.id}</h2>
            <img src="${singlePostData.media.url}">
            <p>${singlePostData.body}</p>
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

// Function to fetch and display a random post
function fetchAndDisplayRandomPost() {
    console.log("Fetching and displaying random post...");
    fetch("https://v2.api.noroff.dev/blog/posts/random/")
        .then(response => response.json())
        .then(data => {
            console.log("Received random post data:", data);
            const randomPostData = data.data; // Fetch the random post
            const randomPostDiv = document.createElement("div");
            randomPostDiv.innerHTML = `
                <h1>${randomPostData.title}</h1>
                <h2>ID number ${randomPostData.id}</h2>
                <img src="${randomPostData.media.url}">
                <p>${randomPostData.body}</p>
                <a href="/post/text.html?id=${randomPostData.id}">Click here to open blog post</a>
            `;
            secondSinglePostSection.innerHTML = ""; // Clear previous post
            secondSinglePostSection.appendChild(randomPostDiv);
        })
        .catch(error => {
            console.error("Error fetching random post:", error);
        });
}

// Call the function to fetch and display a random post when the page loads
fetchAndDisplayRandomPost();
