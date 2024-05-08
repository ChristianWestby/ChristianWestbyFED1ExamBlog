
const blogSingleSection = document.getElementById("single-post");
const blogSection = document.getElementById("blog-list");

fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
    .then(response => response.json())
    .then(function appendData(data){
        const blogData = data.data;

        blogData.forEach(data => {
            const newDiv = document.createElement("div");
            newDiv.innerHTML = `
                <div>
                    <h1>${data.title}</h1>
                    <img src="${data.media.url}" style="height: 100px; width: 100px"> 
                    <p>${data.content}</p>
                      <!-- Assuming 'content' is a property in each blog object -->
                </div>
            `;
            blogSection.appendChild(newDiv);
        });

        // Append a single post before the blog section
        const singlePostDiv = document.createElement("div");
        singlePostDiv.innerHTML = `
            <div>
                <h1>${blogData[0].title}</h1>
                 <img src="${data.media.url}" style="height: 100px; width: 100px"> <!-- Assuming 'title' is a property in each blog object -->
                <p>${blogData[0].content}</p> <!-- Assuming 'content' is a property in each blog object -->
            </div>
        `;
        blogSingleSection.appendChild(singlePostDiv);
    });
