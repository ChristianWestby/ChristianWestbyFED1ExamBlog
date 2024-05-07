const blogSection = document.getElementById("blog-list");

fetch("https://v2.api.noroff.dev/blog/posts/Christian_Westby")
    .then(response => response.json())
    .then(function appendData(data){
        const blogData = data.data;

        blogData.forEach(data => {
            const newDiv = document.createElement("div");
            newDiv.innerHTML = `
                <div style="background-color: grey">
                    <h1>${data.title}</h1>
                    <p>${data.body}</p>
                    <h2>ID number ${data.id}</h2>
                     <img src="${data.media.url}" style="height: 100px; width: 100px">
                     <a href="/post/text.html?id=${data.id}">Click here to open blog post</a>
                </div>
            `;
            blogSection.appendChild(newDiv);
        });
    });
