# The Blog Spot

![The Blog Spot](https://i.ibb.co/f4LWrKn/image.png)

## Overview

The Blog Spot is a responsive web application designed to inspire creativity through nature. This blog aims to showcase spectacular places that will inspire you to be creative and feel the wild nature while you write. It features user pages that display blog posts and admin pages for managing posts and user accounts. This project leverages HTML, CSS, and JavaScript to create an engaging and functional blog interface.

---

## Features

### User Pages

- **Main Page**: Displays a single post, a carousel of the latest 3 posts, and a grid of the latest 12 posts. Users can click on posts to view them in detail.
- **Single Post Page**: Shows the selected post with a similar grid of the latest 12 posts.

### Admin Pages

- **Admin User Page**: Provides options to create a new post, edit/delete existing posts, and create new user accounts. Links to respective pages for these actions.
- **Create Post Page**: Allows the admin to create new blog posts.
- **Edit/Delete Post Page**: Enables the admin to edit or delete existing posts.
- **Create User Page**: Facilitates the creation of new user accounts.

![Admin Page](https://i.ibb.co/zFg03t1/image.png)

---

## Technologies Used

<div style="display: flex; gap: 20px;">
  <div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML5" width="70" height="70">
    <p>HTML5</p>
  </div>
  <div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS3" width="70" height="70">
    <p>CSS3</p>
  </div>
  <div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width="70" height="70">
    <p>JavaScript</p>
  </div>
</div>

---

## API Endpoints

The application interacts with the following API endpoints:

- **GET** /blog/posts/Christian_Westby
- **GET** /blog/posts/Christian_Westby/:id
- **PUT** /blog/posts/Christian_Westby/:id
- **POST** /blog/posts/Christian_Westby/:id
- **DELETE** /blog/posts/Christian_Westby/:id
- **POST** /auth/register
- **POST** /auth/login

---

## Figma Design

The initial design and wireframes were created in Figma. You can view the design assets [here](https://www.figma.com/file/example).

---

## Challenges

Throughout the development process, the following challenges were encountered and addressed:

- **CSS Styling**: Managing CSS for responsive design was particularly challenging. However, the final design ensures a seamless experience across different devices.
- **JavaScript Functions**: Implementing dynamic content loading and API interactions required careful handling of asynchronous operations and error management.

---

## Future Enhancements

- Implement pagination for blog posts.
- Add sorting and filtering options for blog posts.
- Improve authentication and authorization mechanisms.

---

## Author

Christian Westby

All images used in this project were taken by me in the scenic landscapes of Tyin, Vang, at the start of the majestic Jotunheimen in Norway.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- Special thanks to the instructors and peers who provided guidance and feedback throughout the project.

---
