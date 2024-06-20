const createBtn = document.getElementById("create-post-btn");
const backBtn = document.getElementById("go-back-btn");
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2hyaXN0aWFuX1dlc3RieSIsImVtYWlsIjoiY2hyaXN0aWFuLndlc3RieUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxNTA4MDg5OH0.mQNsA2l7uUcw1wju125fK4_lJQC8ax1_g_J-QmT0HE8";

function createPost() {
    const title = document.getElementById("title").value;
    const imageUrl = document.getElementById("image-url").value; 
    const content = document.getElementById("content").value;

    const postData = {
        title: title,
        imageUrl: imageUrl, 
        content: content
    };

    fetch('https://v2.api.noroff.dev/blog/posts/Christian_Westby', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Feil ved opprettelse av post');
            }
            return response.json();
        })
        .then(data => {
            console.log('Post opprettet:', data);
            window.location.href = '/post/index.html';
        })
        .catch(error => {
            console.error('Feil ved opprettelse av post:', error.message);
            alert('Feil ved opprettelse av post. Vennligst prøv igjen.');
        });
}

function goBack() {
    window.location.href = "adminuserpage.html";
}

createBtn.addEventListener("click", createPost);
backBtn.addEventListener("click", goBack);
