# Snippet Sphere - Backend

Welcome to the backend of our Code Snippet Manager! This backend handles the logic and data operations for managing snippets and collections.

## Features

- **Authentication:** User authentication using tokens for secure access to the system.
- **CRUD Operations:** Create, Read, Update, and Delete functionalities for both snippets and collections.
- **Public and Private Access:** Ability to mark collections and snippets as public or private.
- **Associations:** Snippets associated with collections for better organization.

## Technologies Used

- **Node.js:** Backend runtime environment.
- **Express.js:** Web application framework for routing and handling HTTP requests.
- **MongoDB:** Database for storing collections and snippets.
- **Mongoose:** MongoDB object modeling for Node.js.
- **JWT:** JSON Web Tokens for user authentication.

## Setup Instructions

1. **Clone the Repository:** `git clone https://github.com/Vanvirsinh/snippet_sphere_backend`
2. **Install Dependencies:** `npm install`
3. **Environment Variables:** Set up environment variables for MongoDB URI, JWT Secret, etc.
4. **Start the Server:** `npm start`

## API Endpoints

- `/api/collections`: Manages collections (GET, POST, PUT, DELETE).
- `/api/snippets`: Manages snippets (GET, POST, PUT, DELETE).
- `/api/auth`: Handles user authentication (POST login, POST register).

## Usage

- Register a user using `/api/auth/register`.
- Login to receive an authentication token using `/api/auth/login`.
- Use the obtained token to access protected endpoints for managing collections and snippets.

## Contribution

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT.

