# Documentation

This application, created with React, simulates a login with basic validation and displays Forex values in a table.  
It has 2 pages: Login and Home, where the latter can only be accessed after a successful login.  
Some aspects have been considered to keep the application functional on both desktop and mobile devices.  
On mobile, a "burger" menu is available, and you can also log out(just a hidden functionality).  
  
In order to have the full experience, you need to generate an Api key and update API_KEY_HERE with the generated one, create an .env file and it should look like this 

REACT_APP_API_KEY={API_KEY_HERE}<br />
REACT_APP_API_URL=https://www.alphavantage.co/query

## Available Scripts

In this project, the following scripts are available:

### `npm start`

Runs the application in development mode.  
To view it, you can access [http://localhost:3000](http://localhost:3000) in the browser.

### `npm test`

Runs the application's tests and displays the results.

### `npm run build`

Builds the application and prepares a version that can be used for production environments.

## Components

### Login

Component responsible for validating the login data. It redirects to the Home page when authentication is successful, or it shows an error otherwise.  
The validation is basic, requiring that the fields be filled with at least 6 characters.

### Home

Component that displays a table with daily Forex values obtained from an API. When the values from the dropdowns are changed, an API call is made to update the table values.

## Tests

Two files with tests for both developed components were created. These tests check the presence of elements on the page, verify actions, and validate results.  
To test the API, a mock was created to always return the same data for testing purposes.
