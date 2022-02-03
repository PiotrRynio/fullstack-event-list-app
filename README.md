# Fullstack Event ListApp

---

## Overview

_Fullstack Event ListApp_ is an application thanks to which you can check registered events and add
new events to registered events base by yourself. The application consists of two sides: backend and frontend one.
Registered events are saved to database.
Using the app you are going to get to know with events data and information about authors (first name, last name and email address).
You can also register new events by yourself using registration form.

Backend side is created with **Hexagonal Architecture** and **Modular Monolith Architecture** (currently single module - ready to expand by further modules).
The app is covered with **tests** both on backend and frontend.
**Data validation** takes place both on browser and server side.
**Error handling** is implemented too.
The application is coded with use of TypeScript, React, Node, Express, MongoDB, Mongoose, Jest - with use of good practice of clean code.
Code formatted with use of Prettier.

Have fun with Event List!

- Repo url: [LINK](https://github.com/PiotrRynio/fullstack-event-list-app.git)

###### The following technologies/libraries/methodologies were used:

**Frontend:**

- React
- react-route
- react-query
- react hooks
- TypeScript
- Regex
- Styled Components
- react testing library
- Jest
- dom testing library
- MSW - Mock Service Worker (backend API queries mocking)
- RWD

**Backend:**

- TypeScript
- Node
- Express
- MongoDB
- Mongoose
- Jest
- Supertest
- Nodemon
- Hexagonal Architecture
- Modular Monolith Architecture (currently single module - ready to expand by further modules)
- Docker Compose
- rest API

**Other:**

- Prettier
- Husky (pre-commit)
- lint-staged
- Full Responsive
- Clean Code
- Git & GitHub
- IntelliJ
- Postman

## Running the project

Running this project locally:

1. Install Docker (version 3.7).
2. Clone this project locally.
3. Run `npm run start` (it is running Docker script) in your bash/command line (in main folder).
4. Go to `http://localhost:3000` in your browser.

Running tests:

1. Run `npm install` in your bash/command line (in main folder).
2. Run `npm run test-fe` in your bash/command line.
3. Run `npm run test-be` in your bash/command line.

   In case of failed MongoDB tests you should run Docker (look above) <br/>
   or install proper version of MongoDB Compass.

Others:

1. API port: 5000.
2. MongoDB port: 27017.
3. Node version: 16.
4. You can start without Docker too <br/>
   (You may need another steps than below ex. installing proper version of MongoDB Compass):
   1. Run `npm install` in your bash/command line (in main folder).
   2. Next `npm run start-fe` (frontend) or `npm run start-be` (backend) in your bash/command line (in main folder).

---

### Authors

_Piotr Rynio_  
Contact:
pwrynio@gmail.com  
github.com/PiotrRynio/
