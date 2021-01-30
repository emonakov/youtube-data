Run in the browser without page refresh (react routing)<br />
Must be written in React using at least the required tech stack defined above<br />
Must have a following views/pages/routes: home page with search bar to search for videos, page presenting clickable video iframe (received from API)<br />
Video search page (home): shows an input field where the user will type the title of the video, after querying the API it should show the list of found or suggested<br /> videos. If cleared, the page should reset the results and instead show the grid of most popular videos<br />
Video details page: should show the received from API iframe with the youtube video. Additionally, it should present the video metrics such as views count, likes<br /> count, dislikes count, comments count. There should also be an “add to favourites” heart button icon which should add the video id into favourites locally (in <br />react data store & save it in browsers localStorage). If the video is already in favourites, the heart icon should be filled. Clicking on the “add to <br />favourites” heart icon again should trigger its removal from the favourite list.<br />
The app must be runnable from a single command on a command-line (for example: preferably npm run start)<br />

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Guide

Run `yarn`<br />
Copy `.env.example` to `.env.local`<br />
Add your `YOUTUBE_API_KEY` to `.env.local`<br />
Run the app with `yarn dev`<br />

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

### `yarn test:coverage`
Launches the test runner with the coverage report.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn fake:server`

Runs the proxy app for development mode on port 8081.<br />

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Runs the proxy app for development mode on port 8081.<br />


The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
