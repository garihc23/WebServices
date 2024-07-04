# Node.js User Registration and Real-Time User List

This project demonstrates a Node.js web application that allows users to register and view a real-time list of connected users using Socket.IO. It uses MongoDB as the database and Express.js for building the API.

## Features

- **User Registration:**
    - A form to collect user details (name, email, address, login ID, password).
    - Form validation on both frontend and backend.
    - Data is stored securely in MongoDB.
- **Real-Time User List:**
    - Uses Socket.IO for real-time communication.
    - Displays a list of currently connected users in a table.
    - Updates the list automatically when users join or leave.
- **User Details Popup:**
    - Click on a user in the list to view their complete details in a popup.

## Technologies Used

- **Backend:**
    - Node.js
    - Express.js
    - MongoDB (with Mongoose)
    - Socket.IO
- **Frontend:**
    - HTML
    - CSS (with Bootstrap)
    - JavaScript (with jQuery)

## Prerequisites

- **Node.js and npm:** Make sure you have Node.js and npm installed on your system.
- **MongoDB:** You need a running MongoDB instance. You can download and install it from [https://www.mongodb.com/](https://www.mongodb.com/).

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://your-repository-url.git
   cd your-project-directory
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the project root.
   - Add the following variable:
     ```
     MONGO_URI=mongodb://localhost:27017/yourdatabase 
     ```

4. **Start the Server:**
   ```bash
   npm start 
   ```

5. **Open in Browser:**
   - Go to `http://localhost:3000` in your browser.

## Usage

1. **Register a User:**
   - Fill out the registration form and click "Save."
   - The new user should appear in the "Live Users" table.
2. **View Live Users:**
   - The table will display all currently connected users.
3. **View User Details:**
   - Click on a user's name in the table to see their details in a popup.

## Project Structure

- `server.js`: The main Node.js server file.
- `models/user.js`: Defines the Mongoose schema for user data.
- `routes.js`: Defines the API routes for handling user data.
- `public/`: Contains frontend assets:
    - `index.html`: The main HTML page.
    - `script.js`: The frontend JavaScript logic.
    - `style.css`: The CSS for styling.

## Additional Notes

- **Password Hashing:** In a production environment, you should hash passwords before storing them in the database for security.
- **Error Handling:** Consider adding more comprehensive error handling to both the frontend and backend.

## Contributing

Feel free to contribute to this project by creating issues or submitting pull requests.

## License

This project is licensed under the MIT License.
```



**Key Points:**

- **Clear Instructions:** The README provides step-by-step instructions on how to set up and run the project.
- **Project Description:**  It explains the purpose of the project and its features.
- **Technology Stack:** Lists the technologies used.
- **Prerequisites:** Clearly states what users need to have installed before running the project.
- **Usage:**  Describes how to interact with the application.
- **Project Structure:**  Gives an overview of the code organization.

