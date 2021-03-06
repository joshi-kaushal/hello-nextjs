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

> ???? Every component inside `/paegs` is considered as a route. routes are associated with their filenames.

### Home route ???`/`???

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
Here???s how you can create `/blog`, `/blog/first` and`/blog/second`:

1. Create `/blog` inside `/pages`
2. Create `index.js` inside blog directory, it would serve as `/blog` route.

> ???? **Recall: `index.js` gets mapped to its route domain.**

1. create `first.js` and `second.js` inside blog directory.

### Dynamic Routes

**Scenario 4:**
We have to create a product listing and details page. If user navigates to `/product` they should see list of available products. If they click on a product, they should see details of that product, ie `/product/product1`.

We can create a `/products` route and a `/products/:productId` route.
create folder `/product` and `index.js`.

now, to create a dynamic route, create a file having square brackets to its name: `[productId].js` (in product dir, okay?)

now if you visit `/product/1`, you???d see content mentioned in `[productId].js` .

> ???? Next.js considers files in `/pages` having square brackets as dynamic routes. the string within the brackets is considered as a query parameter.

In a typical application, you???d want to extract the content in a dynamic route and do something with it.

Let???s display productId in a page. We have to import a hook from next.js:

```jsx
import { useRouter } from "next/router";

const router = useRouter();
const productId = router.query.productId;
```

**Things to note:**

1. useRouter hook returns a router object, we can access query param objects.
2. `productId` parameter in `router.query.productId` corresponds to dynamic segments we have specified as a filename, i.e. `[productId].js`

The query parameter could be anything, not just a number or string. Suppose you already have a page in your directory that you have entered as dynamic route, instead of dynamic route, next will render the existing page.

> ???? Next.js will always try to match the route path with existing pages first, nested or not, before trying to match dynamic routes.

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

## Pre-rendering

**Try this:**
Open a simpler react application and open page source by right clicking it. Do the same for simple next app too. You'd see that react source is completely empty and has only one div with id `root`. Whereas, next app will have everything that is rendered on the page.

That's the main difference between react and next.js
In next.js, pages are **pre-rendered**. That means, HTML is already generated in the server and sent to the client.

Pre-rendering refers to the process of generating HTML with the necessary data for a page in our application.

### Why pre-rendering?

- Improves performance
- Improves SEO
- Improves accessibility

Next.js supports to forms of pre-rendering.

1. Static Generation
2. Server-side Generation

## Static Generation

- HTML pages are generated at build time.
- The HTML with all the data that makes up the page is generated at build time.
- This is recommended to pre-render pages whenever possible.
- Pages can be built once, cached by a CDN and served to the client almost instantly.
- eg: blog, e-commerce, product page, documentation and marketing pages.

Next.js will pre-render every app.

Here's something important:
When in production, a page will be pre-rendered once when we run the `build` command.
In development mode, page is pre-rendered after every request you made. This to ensure that code changes are reflected on every browser.

> Next.js, by default, without any configuration, statically generates every page when we build our app in production. This allows page to be cached by a CDN and indexed by search engines.

### getStaticProps()

You can export an async function `getStaticProps()` with the default export of the page component. This function will run at build time, in production, and it can fetch external data and send it as props to the page.

getStaticProps() must be in the **same file** as the page component. And it must **return a an object** with `props` key.

```js
export default function PageComponent(props) {
  return <div>{props.foo}</div>;
}

export async function getStaticProps() {
  const res = await fetch("https://api.example.com/products/1");
  const product = await res.json();
  return {
    props: {
      product,
    },
  };
}
```

**Few things to remember**:

1. `getStaticProps()` runs on build time. When in development, it runs after every request. When in production, it runs only once, ie during the build time.
2. `getStaticProps()` must return an object with `props` key, which is an object itself.
3. `getStaticProps()` must be in the same file as the page component. You can have this function in regular component file, or in a separate file.
4. It only runs on the server side. The code inside the function won't even be included in the JS bundle that is sent to the client.
5. You can write server side code directly in `getStaticProps()`function. This allows you to use Node.js features like accessing file system. You can also use API keys without any hesitation, since it is only run on the server side.

## How Next.js handles Static Generations Build

As you know by now, Next.js pre-renders every page on build time. This is done by default. During development, this is done on each request.
When you run `yarn dev` for the first time, Next.js creates a folder called `.next` in the root of your project. This folder is where all the static files are generated.
Delete this folder and run `yarn build`.

```js
yarn build
```

A new `.next` folder is created. But it has different content than the previous one. Now let's check the console.

### Terminal

**Information about the each route**:
We have three columns in the Page section: _page_, _size_, _first load JS_.
Page refers to the route, size refers to the size of assets downloaded to navigating to the page, whereas first load JS refers to the size of JS bundle downloaded to navigating to the page.

**First Load JS Shared By All**
This files are downloaded irrespective of the route. It contains CSS, webpack, framework code, node modules code etc.

**Legend**:
Beside each page in the console, next.js provides a way to understand the way it was pre-rendered.
The hollow circle represents static generation. That means, the page is automatically generated as static HTML without using any initial props.
The filled circle indicates Server Side Generation using `getStaticProps()`. It is generated as HTML and JS bundle.
There is also server and ISR (Incremental Static Generation) but it is out of the scope for now.

### Build output

Build output is seen in the `.next` folder. It contains three folders: cache, server and static, along with a few files.

Within the `/server` folder, we have a few files. Let's understand those:
static HTML pages generated by Next.js. If you are following the same tutorial as I am explaining, you'd see `users.html` and `users.json` files. These are statically generated files during the build.

### Link Pre-fetching

watch [this](https://youtu.be/QcUU89xKu70) video if you don't understand anything.

> Any `<Link />` component in the viewpoint will be pre-fetched by default along with its data for pages using static generation.

Start the build server by `npm start`. Open networks tabs in developer tools.

In our current app, there is no way to render `/users` route without explicitly typing it in the URL, which is not the way how normal user interacts with the application.
And that's why, you would not see data related to `/users` route fetched from the server. However, if you navigate to `/users` route, you would see that necessary data is fetched from the server.
Now, in your home route, `/`, add a link to `/users` route. You would see the data related to `/users` route fetched from the server on the rendering of Home route itself. This is one of the special feature of Next.js, called as pre-fetching.

### Context

function `getStaticProps()` receives a parameter - context. It has information about the request. One of it is `params` which contains the parameters passed in the URL. You can access it by `context.params`.

### Summering Static Generation

- pre-rendering method where HTML pages are generated at build time.
- it can be done with or without external data.
- if we want external data to be fetched, we use `getStaticProps()` function.
- At the build time, HTML, CSS and JS bundles are generated.
- If you navigate to the page route, HTML file is served.
- If you navigate to the page route from a different route, the page is created client side using the JS and JSON pre-fetched from the server.

### `getStaticPaths()`

Rerendering a page with dynamic parameters is not possible with `getStaticProps()`.
Since it is a dynamic path, there could me multiple pages for values. We need to provide the possible values for the dynamic parameters via `getStaticPaths()`.

In the same file as `[postId].js` component and `getStaticProps()`, we can define the async function `getStaticPaths()`.
It returns an object with `pass` key. It tells us which paths will be statically generated at build time. The value of `pass` key is an array of objects. Each object has `params` key. The value of `params` key is an object with the dynamic parameters.

```js
export async function getStaticPaths() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: {
      postId: post.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
```

#### Fallback key

Compulsory value. Three possible values:

#### false

- paths returned from `getStaticPaths()`will be rendered to HTML at build time by `getStaticProps()`.
- if the requested path is not found, the page will not be rendered, and 404 page will be shown instead.

#### true

- if the requested path is not found, the page will be rendered with the fallback data.

- paths returned from `getStaticPaths()`will be rendered to HTML at build time by `getStaticProps()`.
- if the page requested is not built at the build time, the fallback data will be rendered instead.

```js
import { useRouter } from "next/router";

const router = useRouter();
if (router.isFallback) {
  return <h1>Loading...</h1>;
}
```

- In the background, Next.js will statically generate the requested HTML and JSON files, using `getStaticProps()`.

- The server initially loads the fallback content and then the server will fetch the data from the API and replace the fallback content with the actual content.

- If the requested data is not present in the database itself, the server will render 404 page.

**When**

- Most suitable if your app has a very large number of static pages that depend on data, eg e-commerce website

#### blocking

- if the requested path is not found, the page will be rendered with the fallback data. But the page will be blocked until the data is fetched.

- suppose a page needs to be rendered from the server. Unlike `fallback: true`, next.js will render the page on the server and return the generated HTML page.

- until then, the page is blank and in the loading state, ie you could see the favicon loading in the browser.
- no need to use `useRouter`.

If you check the network tab for loading page, you would see more time than prefetched pages. this is because next.js builds the page at run time and sends it back.
**When**

- Sometimes user may prefer a page to be loaded without loading indicator if the wait time is a few milliseconds longer.
- Next.js recommends `fallback: true` whenever possible.
- some crawlers did not support JS. fallback true was causing some problems.

### Issues with Static Generation

- SSG is a pre-rendering method where HTML pages are generated at build time.
- pre-rendered static pages can be pushed to a CDN, cached and serve to clients across the globe.
- content is fast and better for SEO as they immediately indexed by search engines.
- SSG with `getStaticProps()` for data fetching and `getStaticPaths()` for dynamic pages is good option.

BUT,

1. The build time is proportional to the number of pages in the app.

2. The page contains stale data till the time you rebuild the app.

### Incremental Static Side Generation (ISR)

The problem with SSG is, if you change the data after the build, pages won't reflect latest data and will be stale. The only way to fix this in SSG is rebuild the app.

With ISR, we can update static pages after they are built.
Statically generating individual pages without needing to rebuild the entire site solves issue of dealing with state data.

### How?

In the `getStaticProps()` function, apart from the props key, we can specify a `revalidate` key.

The value of revalidate is the number fo seconds after which the page re-generation can occur.

```js
export async function getStaticProps() {
  ...
  return {
    props: {
     ...
    },
    revalidate: 10,
  };
}
```

If you add a `console.log()` in the `getStaticProps()` function, you would see one log at the time of build and then every time you're using the app.
While you are using the app, `getStaticProps()` will be called after every seconds passed with `revalidate` key.
If you try to refresh the page after 10 seconds, you would see the log again.
However, if you refresh the page before 10 seconds, you would not see the log.

---

Re-generation is the time after which if a user makes a request, the page is re-generated.
Re-generation is initiated only if a user makes a request after the `revalidate` time.
The re-generation won't happen if no user visits the page.
Re-generation does not mean that page is automatically generated after every `revalidate` time.
It might fail sometimes and in such cases, old cached HTML is served.

--- Summing up
Static generation is a pre-rendering method where HTML pages are generated at build time. This leads to two major problems:

1. Cannot fetch data at request time:

- we run into a problem on stale data
- suppose a site like news website or stock website, where data is updated every few seconds.
- Even though we use ISR, we still might not always see the most up to date data.
- you can fetch the data on client side using `useEffect()` but you have to sacrifice SEO.

2. We don't get access to the incoming request.

- Problem arises when the data needs to be fetched as per a specific user.
- assume a social media website where feed is personalized based on user's interest.

To overcome this problems, Next.js has a second way of rendering the page, **server side rendering** or SSR.
The HTML page is generated for every incoming request.
SSR is helpful when you need to fetch data per request and also when you need to fetch personalized data keeping in mind SEO.

## Server Side Rendering (SSR)

1. Runs only runs on the server side, so the code you write in `getServerSideProps()` will not be included in the JS bundle that is sent to the browser.
2. You can write server side code directly in `getServerSideProps()`. Meaning, you can use Node.js APIs like file system or even query databases directly.
3. Allowed only in a page, not in components.
4. Used only for pre-rendering and not for data fetching.
5. `getServerSideProps()` will run at request time. Hence it is slower than `getStaticProps()`.
6. `getServerSideProps()` should return an object with `props` key, which is an object itself.

```js
export async function getServerSideProps() {
  const response = await fetch("http://localhost:3001/news");
  const articles = await response.json();

  return {
    props: {
      articles,
    },
  };
}
```

### Dynamic Routes with SSR

Similar to SSG, we can use `getServerSideProps()` to generate dynamic routes. The convention and the code is the same.

1. You create a file wrapped in square brackets to represent the dynamic route.

### `context` in SSR

As said in the previous section, Static Side Generation is unable to access incoming requests. That prevents you from fetching data that is user specific.

Let's look at what SSR provides to overcome this limitation.
The `context` object that is passed to `getServerSideProps()` does the wonder for us. It contains the following properties:

1. request
2. response
3. query

### When to use client side rendering

private, does not need seo, client specific data

### SWR Hook

Next.js recommends SWR Library for data fetching. It stands for Stale While Revalidate. It is a rect hooks library for data fetching. It handles caching revalidating, focus tracking refocusing on interval and a lot more.

```bash
yarn add swr
```

```js
import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch("http://localhost:3001/dashboard");
  const data = await response.json();

  return data;
};
const { data, error } = useSWR("dashboard", fetcher);
```

SWR hook takes two parameters, first is the unique key to the request, and second argument is the function that will be called to fetch the data. The Next.js convention is to define a function separately in the same file and call it `fetcher`.

Fetcher functions returns two things, error and data, that you can use accordingly.

### Shallow Routing

Update URL in the browser without running the code from `getServerSideProps()`

# API Routes

Next.js is a fullstack framework. It also allows us to write APIs that can be consumed by the client.
API routes allow you to write RESTful endpoints as a part of your next.js project.

Within the `/pages` folder, you can need to create a folder named `/api`. Within that folder, you can define all of your APIs.

You can add business logic without needing to write any additional custom server code or configure any API routes.

And this code is not bundled with the JS sent to the client and is only executed on the server side.

> You can not call these APIs from `getServerSideProps()` or `getStaticProps()` as they would increase the response delay.

## `GET` Route

Suppose we have a `/api/comments` endpoint that has a list of comments.

```js
const fetchComments = async () => {
  const response = await fetch("/api/comments");
  const data = await response.json();
  setComments(data);
};
```

## `POST` Route

```js
const submitComment = async () => {
  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ comment }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
};
```

## `DELETE` Route

````js
const deleteComment = async (commentId) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
};```
````

## `PUT` Route

```js
const updateComment = async (commentId) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });

  const data = await response.json();
  console.log(data);
};
```

## Server Code for everyone:

`api/comments`

```js
export default function handler(req, res) {
  if (req.method == "GET") {
    res.status(200).json(comments);
  } else if (req.method == "POST") {
    const comment = req.body.comment;

    const newComment = {
      id: Date.now(),
      comment,
    };
    comments.push(newComment);
    res.status(201).json(comments);
  }
}
```

`api/comments/:id`

```js
export default function handler(req, res) {
  const { commentId } = req.query;

  if (req.method === "GET") {
    const comment = comments.find((comment) => comment.id == commentId);

    res.status(200).json(comment);
  } else if (req.method == "DELETE") {
    const comment = comments.find((comment) => comment.id == commentId);
    const index = comments.indexOf(comment);
    comments.splice(index, 1);

    res.status(200).json(comments);
  } else if (req.method == "PUT") {
    const comment = comments.find((comment) => comment.id == commentId);
    const index = comments.indexOf(comment);

    comments[index].comment = req.body.comment;

    res.status(200).json(comments);
  }
}
```

## Catch All Routes

There might be cases where segments in the URL are optional. Or we might want a single endpoint to handle one or more segments. In that case, we can use a catch all route.

```
/api/posts/segment1/segment2/segment3
```

The file name convention is same as that of the pages: `[...params.js]`.
This endpoint will match for `api/posts/segment1/`, `api/posts/segment1/segment2/`, `api/posts/segment1/segment2/segment3` and so on.

```
export default function handler(req, res) {
  const params = req.query.params;  // same as filename
  console.log(params);
  res.status(200).json(params);
}
```

However, it doesn't match for `api/posts/`. If you want to handle that, you can use optional catch all route. Catch all routes is made optional by including parameter in double brackets `[[...slug]]`.

> The main difference between catch all and optional catch all routes is that with optional, the route without the parameter is also matched (/post in the example above).

## Styling in CSS

### Global Styles

CSS Modules are useful for component-level styles. But if you want some CSS to be loaded by every page, Next.js has support for that as well.

To load global CSS files, create a file called `pages/_app.js` with the following content:

```js
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

This `App` component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages, for example.

### Component Level Styling

Next.js allows CSS modules by default. CSS modules are created by creating a `.module.css` file in the `styles` folder. The name `.modules` is important because it let's Next.js know that this is a CSS module.

CSS modules in Next.js has a scope of component level. That means, you can have different styling with same class name in different components. Next.js will create a unique classname for every module.

````js
To use a particular CSS file, you need to import it in the component file.

```js
import styles from "../styles.module.css";
````

And then use the imported CSS file in the component file.

```js
<div className={styles.container}>
  <h1>Hello World</h1>
</div>
```

### SCSS Support

SCSS is a superset of CSS. It allows you to use variables, mixins, functions and so on.

```
yarn add scss
```

### CSS in JS

#### Inline CSS in JS

```js
<div style={{ color: "red" }}>Hello World</div>
```

#### Styled Components

```js
import styled from "styled-components";
```

## App Component

In many cases you need a few components to be render with every page. For example, header and footer. Also it's common to have a common layout throughout the application.
Next.js provides `_app.js` file to handle such cases. It is the top-level component which will be common across all the different pages. The file is created at the beginning itself.

Now suppose you need to have a header and footer in every page.

1. Start by creating a `Header` and `Footer` component inside `/components` directory.
2. Import those in `_app.js` file.
3. Render imported components where ever required.

```js
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
```

Sometimes you want to exclude these components. For example, you don't want the Header component to be in login or sign up page.
Next.js also offers a way to exclude components.

Add this snippet in the file if you don't want to render a particular component.

In this case, the Header component won't be rendered in `Posts` page. Only the Footer component will be rendered.

```js
// Posts.js
import Footer from "../components/Footer";

...

Posts.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};
```

That's not it. You need to make changes in `_app.js` too.

```js
// _app.js

if (Component.getLayout) {
  return Component.getLayout(<Component {...pageProps} />);
}
```

## Head Component

Used to manipulate `<head>` tag of the HTML page.

```js
import Head from "next/head";

...

return <>
  <Head>
    <title>My Title</title>
    <meta name="description" content="My Description" />
  </Head>
  <Component {...pageProps} />
</>
```

## Image Component

- Optimizing images
- lazy loading,
- placeholder image

```js
import Image from "next/image";
...

<Image src={img} alt={title} width={imgWidth} height={imgHeight}>
```

## Absolute imports and Module Paths

When the scope of your app increases, you need to import components from different directories. Importing from the nested folders could create a visual mess in the IDE.

Next.js fixes this by allowing you to create absolute imports.

Create a file called `.jsconfig.json` in the root directory of your project.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@layout/*": ["components/layout/*"]
    }
  }
}
```

You can do this:

```js
// Before
import Header from "../components/layout/Header";

// After
import Header from "@layout/Header";
```

## Typescript Support

https://youtu.be/2SLLvO9OK10
