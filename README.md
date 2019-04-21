# Angular + Node DCVNPS Application

## Base on Exercise files for Lynda.com course: Angular API Communication and Authentication

#Repsitory: https://dcvnps.visualstudio.com/dcvnps/_git/dcvnps

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.4.

## Using the files

Exercise files for each video can be found in the `exercise-files` folder, which contains the code files at the start state and end state for each video. If at any point you wish to jump in to a specific video's exercise files, be sure to run `npm install` to install your dependencies. Please note that not every video will have exercise files.

**Note**
Always make sure you make a copy of `.env.sample`, rename it to `.env`, and add in the necessary environemtn variables for both the JWT secret and the MongoDB connection string.

## Build tasks

Different `npm` scripts for your workflow:
  * `npm start`: this will run a production build of the Angular app, and place the bundles in `server/public` directory, and then will start the Node + Express app. This is typically what you would want to do if deploying the applicaiton.
  * `npm run watch`: this will utilize webpack-dev-server to run the Angular app in a live development server, watching for any changes, and also start the Express app at port 3000. Since the app is running on port 4200, we supply a proxy config file to proxy all requests to `/api` to `localhost:3000/api`. Making changes to your code will live reload both the client and the server. Use this for development.
  * `npm run sample`: this will seed your database with initial contacts and users.

## Technologies used
  * Angular v7.2.7
  * Angluar CLI v7.3.4
  * Node v10.7.0
  * Express v4.x
  * MongoDB
  * JSON Web Tokens
## Issues
  * popup component give error
   Uncaught TypeError: Failed to construct 'HTMLElement': Please use the 'new' operator, this DOM object constructor cannot be called as a function.
    Two options to fix the issue:
      1- Add in index.html
      <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.1.3/custom-elements-es5-adapter.js"></script>
      2- run npm install --save import @webcomponents/webcomponentsjs
        add to the end of polyfills.ts
        import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';