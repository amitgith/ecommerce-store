1. Frontend

I used React.js to build the user interface and React Router for navigation and protected routes. I used Redux Toolkit to manage authentication and product state. Axios was used for communication between the frontend and backend APIs, including sending authentication tokens with protected requests.

2. Backend

I developed the backend using Node.js and Express.js. I used MongoDB as the database and Mongoose for schemas and database operations. I created separate routes, controllers, middleware, and models for better code organization and implemented REST APIs for authentication and product management.

3. Authentication

I implemented complete authentication with Register, Login, Refresh Token, Logout, and /me APIs. Users can create accounts, log in securely, refresh expired access tokens, log out, and retrieve their profile information. Authentication is based on JWT tokens and protected middleware.

4. JWT Authentication

I implemented JWT authentication using Access Tokens and Refresh Tokens. The Access Token is short-lived and used for protected API requests. The Refresh Token is long-lived and stored in an httpOnly cookie. When the Access Token expires, the Refresh Token is used to generate a new Access Token.

5. Secure Passwords

I used bcrypt to securely hash user passwords before storing them in MongoDB. Passwords are never stored or returned as plain text. During login, I use bcrypt.compare() to verify the entered password against the stored password hash.

6. Refresh Token Security

Refresh Tokens are stored in httpOnly cookies and persisted server-side for revocation. During refresh, the token is verified before generating a new Access Token. During logout, the stored Refresh Token is invalidated and the cookie is cleared, preventing the old session from being reused.

7. Protected Routes

I created an authentication middleware that reads the Bearer Access Token from the Authorization header. It verifies the JWT and attaches the authenticated user information to req.user. If the token is missing, invalid, or expired, the request is rejected.

8. Product CRUD APIs

I implemented complete CRUD APIs for products. Users can create, read, update, and delete products through REST APIs. Product creation, updating, and deletion are protected by authentication middleware. Before updating or deleting, the backend verifies that the requested product exists.

9. Authorization

I protected product write operations such as Create, Update, and Delete. Only authenticated users can perform these operations. Public users can access product listing and individual product details. Authentication middleware verifies the user's Access Token before allowing protected operations.

10. Validation

I used express-validator to validate API inputs on the backend. Fields such as name, email, password, confirmPassword, title, description, and price are validated. Invalid inputs return 400 Bad Request with field-level validation errors, preventing incorrect data from being stored in the database.

11. Redux State Management

I used Redux Toolkit to manage authentication and product-related state. I created async actions for APIs such as login, register, logout, refresh token, and product operations. This keeps application state centralized and makes it easier for different React components to access and update shared data.

12. Axios Integration

I used Axios to communicate between the React frontend and Express backend. I created a reusable Axios instance with common configuration. I also used an interceptor to attach the Access Token to protected requests automatically, reducing repetitive API configuration throughout the application.

13. Error Handling

I implemented proper error handling for different API scenarios. Duplicate emails return 409 Conflict, invalid credentials return 401 Unauthorized, and invalid input returns 400 Bad Request. Invalid or expired tokens are also handled appropriately, allowing the frontend to display meaningful errors and manage authentication correctly.
