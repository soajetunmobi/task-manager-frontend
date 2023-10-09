#Task Manager UI

**Table of Contents**

- [Development Environment Setup](#development-environment-setup)
    - [Setup](#setup)
        - [Prerequisites](#prerequisites)
        - [Running the App](#running-the-app)
- [Development Workflow](#development-workflow)
- [Useful links](#useful-links)


## Development Environment Setup

### Setup

#### Prerequisites

- Nodejs: Download and install the latest LTS version from [here](https://nodejs.org/en/)
- Create .env file and add `REACT_APP_ENV` and `REACT_APP_API_URI`
- Change `proxy` value in `package.json` then backend endpoint

#### Running the App

`npm install` - Installs all the packages if running the app for the first time

`npm run dev` - Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm start` - Runs the app in the production mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Running the unit and integration tests

`yarn test` - Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`yarn test:contract` - Runs contract tests

`yarn test:coverage` - Run this to check test coverage

**Other scripts you can run**

`yarn build` - Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

`yarn eject` - **Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.




## Useful Links
- React Documentation - https://reactjs.org/
- Create React App Documentation - https://facebook.github.io/create-react-app/docs/getting-started
