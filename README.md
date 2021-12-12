# Ong Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Custom Components/Services:

### Alerts

Service for alerts, made with Sweetalert2.<br/>
All you need to do is pass, as first argument, the `title` of the alert and, as second argument, a `text` description for the alert.

#### The functions are:

- `successAlert()`
- `errorAlert()`
- `infoAlert()`
- `questionAlert()`

#### Examples:

```jsx
import { successAlert, errorAlert, infoAlert, questionAlert } from './Services/alertsService';

<button onClick={() => successAlert('Done', 'Task completed successfully')}>Success</button>

<button onClick={() => errorAlert('Oops...', 'Something went wrong!')}>Error</button>

<button onClick={() => infoAlert('Info', 'A message with information')}>Info</button>

<button onClick={() => questionAlert(
  'Deleting files',
  'Are you sure you want to delete permanently this file?',
).then((isAnswerConfirmed) => {
  if (isAnswerConfirmed) {
    successAlert('Deleted!', 'Your file has been deleted.');
  } else {
    infoAlert('Cancelled', 'Your file is safe');
  }
})}>Question</button>
```
