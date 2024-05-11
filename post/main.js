const singlePostSection = document.getElementById("single-post");
const blogSection1 = document.getElementById("blog-list-1");
const blogSection2 = document.getElementById("blog-list-2");

// Fetch a single post before fetching the carousels
fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
    .then(response => response.json())
    .then(function appendSinglePost(data) {
        if(data.data.length > 0) {
            const singlePostData = data.data[0]; // Fetch the first post
            const singlePostDiv = document.createElement("div");
            singlePostDiv.innerHTML = `
                <h1>${singlePostData.title}</h1>
                <p>${singlePostData.body}</p>
                <h2>ID number ${singlePostData.id}</h2>
                ${singlePostData.media ? `<img src="${singlePostData.media.url}">` : ''}
                <a href="/post/text.html?id=${singlePostData.id}">Click here to open blog post</a>
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
            const postId = `post-${postIndex1}`; // Unique ID based on placement order for carousel 1
            newDiv.id = postId; // Set the ID of the div

            newDiv.innerHTML = `
                <h1>${data.title}</h1>
                <p>${data.body}</p>
                <h2>ID number ${data.id}</h2>
                ${data.media ? `<img src="${data.media.url}">` : ''}
                <a href="/post/text.html?id=${data.id}">Click here to open blog post</a>
            `;

            if (postIndex1 <= 6) {
                if (postIndex1 === 1) {
                    const h1Header = document.createElement("h1");
                    h1Header.textContent = "Carousel 1";
                    blogSection1.appendChild(h1Header);
                }
                blogSection1.appendChild(newDiv);
                postIndex1++; // Increment placement order for next post in carousel 1
            } else {
                if (postIndex2 === 1) {
                    const h1Header = document.createElement("h1");
                    h1Header.textContent = "Carousel 2";
                    blogSection2.appendChild(h1Header);
                }
                blogSection2.appendChild(newDiv);
                postIndex2++; // Increment placement order for next post in carousel 2
            }
        });
    })
    .catch(error => {
        console.error("Error fetching blog posts:", error);
    });
