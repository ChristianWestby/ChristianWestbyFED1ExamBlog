document.addEventListener('DOMContentLoaded', function() {
    const singlePostSection = document.getElementById('single-post');
    const goBackButton = document.getElementById('go-back-button');

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch(`https://v2.api.noroff.dev/blog/posts/Christian_Westby/${postId}`)
        .then(response => response.json())
        .then(data => {
            const post = data.data;
            singlePostSection.innerHTML = `
                <h1>${post.title}</h1>
                ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ''}
                <p>${post.body}</p>
            `;
        })
        .catch(error => console.error('Error fetching the post:', error));

    goBackButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
