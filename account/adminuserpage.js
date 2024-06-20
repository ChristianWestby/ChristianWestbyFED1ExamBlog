// JavaScript-kode for Administrasjonssiden


function createNewPost() {
    
    window.location.href = "/account/createpost.html";
}


function editDeletePost() {
   
    window.location.href = "/account/editdeletepost.html";
}


function createNewUserAccount() {
   
    window.location.href = "/account/createuser.html";
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("create-post-btn").addEventListener("click", createNewPost);
    document.getElementById("edit-delete-post-btn").addEventListener("click", editDeletePost);
    document.getElementById("create-user-btn").addEventListener("click", createNewUserAccount);
});
