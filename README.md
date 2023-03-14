# Welbi FE Challenge

This project was done in a timespan of 3 hours, using React, Typescript and Tailwind CSS.

***IMPORTANT: This is a Work In Progress / First pass. I plan to find some time to improve the project before the final delivery deadline (March 17th 2023).***

Live version available here: [welbi.surge.sh](https://welbi.surge.sh)

## Requirements

You can find the challenge description [here](https://welbi.org/).

## Considerations

This is a very basic implementation of the API requests in a React /
Typescript / Tailwind application. After inputing your email, you
will receive an authorization token that will be used to make
requests to the API.

Then, you will be able to see a list of programs and residents, and
create new programs. Due to time constraints, I am allowing the
creation of new programs, but not residents, as the UI for that
would required more time for the implementation and testing. As for
the programs, you are able to create them only using the name field,
while the other required fields are set to default values.

Given a few more hours, I would have implemented the UI for creating new
residents and new programs. I would also have moved the API request and state
management to a custom hook, and I would have implemented a more
robust error handling and loading animation handling system, along with testing.

Oh, and by the way, I love Community too.

Let me know if you have any questions! Thanks!

- Bruce

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
