# Blog List Application (React)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


This is a frontend React application that allows users to view and submit blogs.
Features

- Display a list of blogs
- Handle user login and authentication
- Allow users to submit new blogs

## Technology Used

- React
- Hooks (useState, useEffect, useRef)
- Services (blogService, loginService)

## How to use

Clone the repository and install dependencies by running npm install
Start the development server by running npm start
The app will be available at http://localhost:3000
To run tests, use npm test

## Functionality

The app uses useState and useEffect hooks to manage the state of the app, and the useRef hook to access a specific component.

handleLogin function is used to handle the login logic, it takes the username and password from the state and sends a request to the login service to authenticate the user.

addBlog function is used to handle the logic of adding a new blog, it takes a blogObject as an argument and sends a request to the blog service to add the new blog.

clearLocalStorage function is used to clear the local storage and log out the user.

The app also uses several services such as blogService and loginService to handle communication with the backend.

## Note

The application uses a proxy to connect to a backend server, the backend server should be running on http://localhost:3003 for the application to work correctly.

## Author

Ioannis Kantiloros
## License

This project is licensed under the MIT License.


## Additional info

The package.json file in the root of the project includes more information about the dependencies and scripts used in this project.
