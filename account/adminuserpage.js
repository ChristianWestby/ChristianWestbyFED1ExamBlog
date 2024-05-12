// JavaScript-kode for Administrasjonssiden

// Funksjon for å håndtere "Create New Post" -knappen
function createNewPost() {
    // Omdirigerer brukeren til siden for å opprette ny post
    window.location.href = "/account/createpost.html";
}

// Funksjon for å håndtere "Edit & Delete Post" -knappen
function editDeletePost() {
    // Omdirigerer brukeren til siden for å redigere og slette poster
    window.location.href = "/account/editdeletepost.html";
}

// Funksjon for å håndtere "Create New User Account" -knappen
function createNewUserAccount() {
    // Omdirigerer brukeren til siden for å opprette ny brukerkonto
    window.location.href = "/account/createuser.html";
}

// Event-lyttere for knappene på administrasjonssiden
document.getElementById("create-post-btn").addEventListener("click", createNewPost);
document.getElementById("edit-delete-post-btn").addEventListener("click", editDeletePost);
document.getElementById("create-user-btn").addEventListener("click", createNewUserAccount);
