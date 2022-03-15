## Introduction

### What

- Next JS is a react framework for building full fledged production ready applications.
- In-built support with routing, styling, auth, bundle authentication
- no need to install additional packages
- opinions and conventions need to be followed

### Why

- **File based system:** File based routing simplifies routing without any additional packages.
- **Pre-rendering**: generates HTML in advance, great SEO
- **API Routes:** Full stack framework, can create frontend app with react and provide APIs as well.
- **Supports for CSS modules**
- **Authentication**: different auth patterns based on the requirements
- **Dev and Prof build system**: Focus on code, not on configuration.

### Prerequisites

- HTML, CSS, JS Fundamentals
- ES6+
- React fundamentals

##

```bash
npx create-next-app <app-name>
```

![project structure](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b4742e01-0ef9-4749-bcfc-215b77377d10/Untitled.png)

project structure

1. `package.json`: dependencies and scripts required for the project.
   1. **dev**: development mode
   2. **build**: prepares for prod
   3. **start**: compiles app for prof mode
   4. **lint**: lints files in your app
2. `next.config.js`:
   1. reactStrictMode: true.
   2. Helps to identify unsafe lifecycle, legacy API usages
3. `/.next`: app is served from this
4. `/node_modules/`: dependencies are installed here
5. `styles`: contains the style for an app - could be global or component specific styles.
6. `public`: holds all the public resources for the application.
7. `pages`: responsible for routing feature
   1. `index.js`: entry point for the application
   2. `_app.js`: define layout for the application
   3. `api`: where we can host our APIs.

## Routing

### Introduction to Routing

### Routing in a React app:

1.  install a third party package like react-router-dom
2.  routes.js file to configure the routes.
3.  create a component file for each route, export it, import it in routes.js, and configure the new route with a _path_ property
4.  total headache

### Routing in Next.js:

- File system based routing mechanism
- when a file is added to the `/pages` folder, it automatically becomes available as a route
- we can mix and match filenames with nested folder structures.

### Routing with Pages

<aside>
💡 Every component inside `/paegs` is considered as a route. routes are associated with their filenames.

</aside>

### Home route ‘`/`’

To create a home route that would be displayed on `DOMAIN_NAME`, modify the content in `/pages/index.js`.

### Different routes

Say you want to have two more routes, `/about` and `/profile`, you have to add two files in `/pages` directory vix `about.js` and `profile.js`.

When you check `DOMAIN_NAME/about` and `DOMAIN_NAME/profile`, you can see pages being rendered as routes.
