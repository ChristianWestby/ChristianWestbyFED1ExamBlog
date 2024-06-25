function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    login(username, password);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-form').addEventListener('submit', handleLogin);

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
});
