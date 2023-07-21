## Blogsio App with MERN Stack (React.js, Node.js, Express.js, MongoDB)

## Start

**1. Install Dependencies**

The project contains two basic folders: `client` and `server`. Client is the front end of the application and is written in React.js. Server is the back end of the application and is written in Node.js. To run this project, download it to your computer and open it with a code editor:

For both main files in the project folder, you have to go to the terminal and install the NPM dependencies. To do this:

+ `cd client` and then `npm install`

+ `cd server` and then `npm install`

**2. Run**

Now, you already installed the NPM dependencies. Now you can run the client and server. 

**Run Client**: Client will run at `localhost:3000`. To run the client, use the commands:

   + `cd client` and then `npm run start`

**Run Server**: Server will run at `localhost:8800`. To run the server, use the commands:

   + `cd server` and then `npm run start`


## Project Informations

The project has two main folders named client and server. Client is React.js. Server is Node.js and Express.js. Server side has got Express server. Express server is loaded in `app` variable:

**Client**

React.js is used here. It has folders named Pages, components and redux. The Components folder holds the components in this application like Topbar. Pages, on the other hand, hold pages such as Home page, blog detail page. Components are rendered in certain parts of the pages. React Router DOM is used for page redirection. Redux Toolkit is used for state management. In components and pages, requests are made to the api addresses written on the server side. If the request results are positive, the incoming results are printed on the screen.

**Server**

Node.js, Express.js and MongoDB is used here. Database schema models were made in the models folder. API endpoints are written in the routes folder. Controller functions for routes are written in the controllers folder. Middlewares for routes are written in the Middlewares folder.

**Database Models**

User, Blog

**Authentication - Authorization**

This project uses JSON Web Token for authentication and authorization. You will receive a token when you log in. That token is sent to the user's browser and stored as a local storage. When you want to reach certain routes, the middleware takes the token from the headers and decrypts it. If the token is valid, it allows you to use the controller valid for that route.

Note: Your information resolved in the token will be kept in the `req.user` object.

**Routes**

    + `localhost:8800/api/auth/signup`: register (http post method)
    + `/api/auth/signin`: login  (http post method)

    + `localhost:8800/api/blog/createblog`: create a blog (http get method)
    + `localhost:8800/api/blog/`: get blogs (http get method)
    + `localhost:8800/api/blog/trendingblogs`: get trending blogs (http get method)
    + `localhost:8800/api/blog/:id`: get blog by id (http get method)
    + `localhost:8800/api/blog/search/:query`: search blog by their title (http get method)
    + `localhost:8800/api/blog/:id`: update blog (http put method)
    + `localhost:8800/api/blog/:id`: delete blog (http delete method)

## Snapshots

+ **Sign Up Page**:

![sign up](https://i.ibb.co/n1G1mCb/Screenshot-20230720-172207.png)

+ **Sign In Page**

![sign in](https://i.ibb.co/8XPDg4K/Screenshot-20230720-172244.png)

+ **Home Page**:

![home](https://i.ibb.co/Y2SjLwV/Screenshot-20230720-172317.png)

+ **Create Blog Page**:

![create blog](https://i.ibb.co/qBYWX2J/Screenshot-20230720-172335.png)

+ **Blog Detail Page**

![blog detail](https://i.ibb.co/s26ZMqF/Screenshot-20230720-172417.png)

+ **Edit Blog Page**

![edit blog](https://i.ibb.co/y5SCQVt/Screenshot-20230720-174335.png)

+ **Search Page**:

![search](https://i.ibb.co/zRq6YRR/Screenshot-20230720-172451.png)