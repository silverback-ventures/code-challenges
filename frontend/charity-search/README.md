# Donations UI

## Intro

The most common UI elements in Frontend development are lists, forms and detail pages.

You'll be building a simple UI list and search charities and a detail page for each charity.

## Challenge

There's an `api.server.ts` SDK-like file with all the methods you will need to interact with the "API", note the API is just an array in memory and in development every request will reset the data.

Both methods, has 5% of posibility of throwing an error, so you should handle the error and show a friendly message to the user.

Using that SDK you should be three routes:

1. `/charities`
2. `/charities/:id`
3. `/charities/new`

The first one, should be the list of charities with pagination, and a search form to filter them. The filtered results should be paginated too. Each charity of the list should show a link to their detail page.

The UI of each item should look something like the image below:

![](/frontend/charity-search/docs/charity-item.png)

> The image is referencial, it doesn't have to look exactly like that, use any spacing, size and color you think may look good.

The second one, should use the ID from the URL to get the charity detail and show it somehow. The data is the same as in the list plus the mission of the charity.

The third one, should show a form to ask for a charity name, mission, city and state and let you create a new charity to include it in the "DB", the creation will be in-memory). After the submission of the form the user should be redirected to the newly created non profit.

> There's no need to deploy the app.

## Optional

All of this things are **not required** but are some idea of extra things you can add in case you have time after you finish the rest.

1. Setup and use Tailwind to style the UI.
2. Reduce the amount of data sent from the loader to only what you need.
3. Prefetch data before a navigation.
4. Add a global loading indicator.
5. Make the list be a layout route with /new and /:id being nested routes.
6. Document your code.
7. Add E2E tests with Cypress.

Note they are not sorted in any way.

## Run the project

Install the dependencies:

```sh
npm install
```

Run the seed script to generate fake data to be used in the app:

```bash
npm run seed
```

And run in development, rebuilding the assets on file changes:

```sh
npm run dev
```

To run in production:

```sh
npm run build && npm start
```
