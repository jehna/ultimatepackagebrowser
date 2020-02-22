## Ultimate package browser

##### *This project is a Reaktor summer developer 2020 pre-assignment*

#### Version 2.0
Added unit tests for the backend and refactored it completely. Also few integration tests for the automated status file parsing 


This application lets you browse the `/var/lib/dpkg/status` file that holds information about packages installed on the system.
You can filter the package list and inspect individual packages to see their descriptions as well as forward and
backward dependencies.  

### You can run the app yourself:

1. Make sure you have [Node.js](https://nodejs.org/en/) installed
2. Clone this repository
3. Go to project root and run `npm install`
4. In project root run `npm run build`
5. In `index.js` file in project root you can choose to use mockup status file or the one located in `/var/lib/dpkg/status` by changing the variable `useMockup`
6. Run `npm start` to start the app 
7. Go to (http://localhost:3000/)

### About the design decisions 

The project was designed to use minimal external dependencies as per assignment instructions. 
The only 1st order dependency is react. It of course has a number of transitive dependencies that can't really be avoided if react is used.

### Frontend

React library is used to build the frontend. 
React was chosen due to its relevancy in modern web development as well as its suitability for creating this kind of single page app. 
This project is written in rather modern react, for example component states are done with hooks instead of the traditional class component method. 

### Backend

The backend is a simple solution written in pure nodejs.
This should be sufficient as this application is mainly used to browse packages on one's own machine. 
If this was a public website used by a large audience, a more sophisticated solution should be implemented. 
All the parsing of the status file is done here and frontend is served with json data it can use directly. 
As an added feature, the status file is tracked for any changes and parsing is done only when needed.

### Possible future development directions (not including new features)

* Allow more external dependencies for easier implementation of features.
* TypeScript
* Add tests. 
* Responsive design for frontend to enable mobile support.
* Better error handling, especially if the app was to grow bigger.
* Some of the frontend components might be too big, these could be refactored.
