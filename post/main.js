document.addEventListener('DOMContentLoaded', function () {
    const singlePostSection = document.getElementById("single-post");
    const carouselInner = document.getElementById("carousel-inner");
    const gridContainer = document.getElementById("grid-container");

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id') || 'Christian_Westby';

    
    function fetchPostsForUser(userId) {
        fetch(`https://v2.api.noroff.dev/blog/posts/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function (data) {
                console.log("Fetched posts data:", data); 
                const posts = data.data; // 

                if (posts.length === 0) {
                    singlePostSection.innerHTML = `<p>No posts found for user ${userId}.</p>`;
                    return;
                }

                const randomIndex = Math.floor(Math.random() * posts.length);
                const singlePostData = posts[randomIndex]; 

                const singlePostDiv = document.createElement("div");
                singlePostDiv.classList.add("post");
                singlePostDiv.innerHTML = `
                    <h1>${singlePostData.title}</h1>
                    <p>By ${singlePostData.author?.name || 'Unknown Author'} on ${new Date(singlePostData.created).toLocaleDateString()}</p>
                    ${singlePostData.media ? `<img src="${singlePostData.media.url}" class="post-image" alt="Image for ${singlePostData.title}">` : ''}
                    <p>${singlePostData.body}</p>
                    <a href="singlepostpage.html?id=${singlePostData.id}" class="single-post-link">Read the post</a>
                `;
                singlePostSection.appendChild(singlePostDiv);

               
                appendPostsToCarousel(posts);
                appendPostsToGrid(posts);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                singlePostSection.innerHTML = `<p>Error fetching posts.</p>`;
            });
    }

    
    fetchPostsForUser(postId);

    
    function appendPostsToCarousel(posts) {
        const carouselItems = posts.slice(-3).map(post => {
            const newDiv = document.createElement("div");
            newDiv.classList.add("carousel-card");
            newDiv.innerHTML = `
                <h2>${truncateString(post.title, 80)}</h2>
                <p>${new Date(post.created).toLocaleDateString()}</p>
                ${post.media ? `<img src="${post.media.url}" class="post-image" alt="Image for ${post.title}">` : ''}
                <p>${post.body ? post.body.substring(0, 80) : ''}...</p>
                <button class="post-button" onclick="location.href='singlepostpage.html?id=${post.id}'">Read More</button>
            `;
            return newDiv;
        });

        carouselItems.forEach(item => carouselInner.appendChild(item));
    }

   
    function appendPostsToGrid(posts) {
        posts.slice(0, 12).forEach(post => {
            const newDiv = document.createElement("div");
            newDiv.classList.add("grid-item");
            newDiv.innerHTML = `
                <h2>${truncateString(post.title, 50)}</h2>
                ${post.media ? `<img src="${post.media.url}" class="post-image" alt="Image for ${post.title}">` : ''}
                <p>${post.body ? post.body.substring(0, 80) : ''}...</p>
                <a href="singlepostpage.html?id=${post.id}" class="single-post-link">Read more</a>
            `;
            gridContainer.appendChild(newDiv);
        });
    }

    
    function truncateString(str, num) {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    }

   
    function startInfiniteScroll() {
        const scrollSpeed = 1; 
        let scrollPosition = 0;

        function scrollStep() {
            scrollPosition += scrollSpeed;
            carouselInner.scrollLeft = scrollPosition;

            
            if (scrollPosition >= carouselInner.scrollWidth - carouselInner.clientWidth) {
                scrollPosition = 0;
            }

            requestAnimationFrame(scrollStep);
        }

        requestAnimationFrame(scrollStep);
    }

    startInfiniteScroll();

    
    document.getElementById('carousel-prev').addEventListener('click', function () {
        carouselInner.scrollBy({ left: -300, behavior: 'smooth' });
    });

    document.getElementById('carousel-next').addEventListener('click', function () {
        carouselInner.scrollBy({ left: 300, behavior: 'smooth' });
    });
});
