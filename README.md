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

> 💡 Every component inside `/paegs` is considered as a route. routes are associated with their filenames.

### Home route ‘`/`’

**Senario 1:**
If have a single page application, we can use the `/` route as the home route.

To create a home route that would be displayed on `DOMAIN_NAME`, modify the content in `/pages/index.js`.

### Different routes

**Scenario 2:**
If we have multiple pages, we can create different routes for each page. For example, we can have a `/about` route and a `/contact` route. These routes must be defined in `/pages/about.js` and `/pages/contact.js` respectively.

Say you want to have two more routes, `/about` and `/profile`, you have to add two files in `/pages` directory vix `about.js` and `profile.js`.

When you check `DOMAIN_NAME/about` and `DOMAIN_NAME/profile`, you can see pages being rendered as routes.

### Nested Routes

To create nested routes, you need to create a folder with the same name as your route and add nested pages inside it.

**Scenario 3:**
We want to render a page, when the user visits the URL `/blog`. However, we also need to render a page, when user navigates to `/blog/first` and `/blog/two`.
Here’s how you can create `/blog`, `/blog/first` and`/blog/second`:

1. Create `/blog` inside `/pages`
2. Create `index.js` inside blog directory, it would serve as `/blog` route.

> 💡 **Recall: `index.js` gets mapped to its route domain.**

1. create `first.js` and `second.js` inside blog directory.

### Dynamic Routes

**Scenario 4:**
We have to create a product listing and details page. If user navigates to `/product` they should see list of available products. If they click on a product, they should see details of that product, ie `/product/product1`.

We can create a `/products` route and a `/products/:productId` route.
create folder `/product` and `index.js`.

now, to create a dynamic route, create a file having square brackets to its name: `[productId].js` (in product dir, okay?)

now if you visit `/product/1`, you’d see content mentioned in `[productId].js` .

> 💡 Next.js considers files in `/pages` having square brackets as dynamic routes. the string within the brackets is considered as a query parameter.

In a typical application, you’d want to extract the content in a dynamic route and do something with it.

Let’s display productId in a page. We have to import a hook from next.js:

```jsx
import { useRouter } from "next/router";

const router = useRouter();
const productId = router.query.productId;
```

**Things to note:**

1. useRouter hook returns a router object, we can access query param objects.
2. `productId` parameter in `router.query.productId` corresponds to dynamic segments we have specified as a filename, i.e. `[productId].js`

The query parameter could be anything, not just a number or string. Suppose you already have a page in your directory that you have entered as dynamic route, instead of dynamic route, next will render the existing page.

> 💡 Next.js will always try to match the route path with existing pages first, nested or not, before trying to match dynamic routes.

### Nested Dynamic Routes

**Scenario 5:**
If user navigates to `/product/1` they should see information about the first product. But if they navigate to `/product/1/review/1` they should see review 1 for product 1.

Having dynamic segments in the folder as well as file names is the way to go.

### Catch All Route

**Scenario 6:**
Suppose we are creating a docs page with multiple features. Each feature has multiple concepts in it.
Say we have 20 features with 20 concepts each, we'd have to create 400 pages. But, since Next.js supports dynamic nested routes, we can create only 1 folder, `/[featureId]` and create one file `[conceptId].js` inside it.

_Catch all routes_ catches all the URL segments and maps it to one single file in our project.

### Link Component Navigation

Until now, we are navigating by changing the URL. And this is not how we want to do it in production. Next.js has a built-in feature to navigate by changing the URL, `Link`.

The `Link` component is used for client side routing. That means, routing within the application. For routing to external pages, we use `<a>` tag.

```bash
import Link from "next/link";

   <Link href="/about">
      <a>About</a>
   </Link>
```

If we provide `replace` props with the Link component, it replaces the current history state instead of adding a new URL into the stack. Default value is false.

### Navigating Programmatically

**Scenario 7:**
We want to navigate to a page based on a certain event or action.

```bash
import { useRouter } from "next/router";

   const router = useRouter();
   const handleClick = () => {
      router.push("/product/");
   };
```

This will navigate to `/product/` route by pushing the `/product/` route into the history stack. If we want to replace the stack entirely, we can use `router.replace()` instead.

You can pass any valid string that you can pass to href attribute of `Link` component.
