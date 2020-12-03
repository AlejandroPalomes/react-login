# Login Form with React

Hello everyone! This project was developed as a technical test for a job position.

It consists of a basic login form, developed with React. It also uses TypeScript, Styled Components and React Testing Library. The main objective was to create a responsive design, reactive to the changes applied to the inputs.

The form performs several authentications before "sending" the data to a mocked request. It will verify if the email matches an email structure, and if the password is at least 8 characters long, has one uppercase, one lowercase and one special character.

Any breach of those conditions will display a message explaining the error.

To successfully access the Dashboard page you must introduce admin@email.com/Pa$$w0rd in the corresponding inputs.

Any attempt to load the Dashboard page withot a successful login will redirect you back to the login page.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
At this moment, there are being covered 7 different functionalities in the Login component.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\