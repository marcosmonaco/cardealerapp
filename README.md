
## Application Overview

This application features a vehicle filter interface on the home page, allowing users to select a Car Make (manufacturer) and Make Year (year of manufacture) using two dropdown selectors. Once both selections are made, a search button becomes active, enabling users to retrieve a list of car models that match their criteria. The application ensures that duplicate models from the API are filtered out, providing a clean list of unique results.##  Front-end JS Engineer Test Assessment - The Car Dealer App

This documentation outlines the steps required to complete the test assessment for creating a car dealer application using Next.js. The application will allow users to filter vehicles by type and model year, and view the results on a separate page.

## Steps to Complete the Assessment

### 1. Create a Next.js Application

- Set up a new Next.js project and configure the folder structure according to best practices.

### 2. Create a Filter Page

1. **Design the Filter Page:**
   - Make this the home page of the app.
   - Use Tailwind CSS to style the page.
   - You can design and style the components freely based on the provided requirements.

2. **Add Vehicle Makes and Model Year Selectors:**
   - Fetch vehicle makes using the following endpoint:

     ```plaintext
     https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json
     ```

   - Populate a dropdown selector with the fetched vehicle makes.
   - Create another dropdown selector for model years ranging from 2015 to the current year.

3. **Enable the "Next" Button:**
   - Add a "Next" button that is initially disabled.
   - Use the `Link` component from Next.js for navigation.
   - Enable the button only when a vehicle make and model year are selected.

4. **Navigate to the Result Page:**
   - On clicking the "Next" button, navigate to the route `result/[makeId]/[year]`.

### 3. Create the Result Page

1. **Implement `generateStaticParams`:**
   - Define the `generateStaticParams` function to generate static paths for the result pages.
   - Fetch the necessary data to determine which paths to pre-render.

2. **Fetch Vehicle Data:**
   - On the result page, get the vehicle make and model year from the params.
   - Use the following endpoint to fetch the vehicle models by make ID and model year:

     ```plaintext
     https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json
     ```

3. **Render Vehicle Models:**
   - Display the fetched vehicle models using Tailwind CSS for styling.
   - Implement error handling for any data fetching issues.

### 4. Implement Suspense Component

- Use React's `Suspense` component to handle loading states where applicable.
- Consider using `Suspense` for data fetching and component loading.

### 5. Implement UI with Tailwind CSS

- Ensure all components and pages are styled using Tailwind CSS.
- Follow best practices for responsive design and accessibility.

### 6. Add Configuration and Documentation

1. **Environment Variables:**
   - Create a `.env.local` file in the root directory to store environment variables. Include it in your `.gitignore`.

2. **Setup ESLint and Prettier:**
   - Add ESLint and Prettier to maintain code quality and consistency.
   - Configure `.eslintrc.js` and `.prettierrc` files according to project standards.

3. **Create a README File:**
   - Include instructions on how to run and build the application.
   - Provide an overview of the application's features and architecture.

## Additional Resources

- **API Documentation:** [VPIC API Documentation](https://vpic.nhtsa.dot.gov/api/?ref=public_apis)
- **Next.js Documentation:** [Next.js Docs](https://nextjs.org/docs)
- **Tailwind CSS Documentation:** [Tailwind CSS Docs](https://tailwindcss.com/docs)
- **React Suspense Documentation:** [React Suspense](https://react.dev/reference/react/Suspense)

## Sharing the Results

1. Create a repository on GitHub.
2. Add a README explaining how to build and start the application. Include screenshots or a screencast, and provide any relevant information.
3. Share the repository link in the VideoAsk survey for review. We will provide feedback within 2-3 business days.
4. Feel free to ask any questions.
5. (Not required) You can deploy using GitHub Actions.





## Screenshots

Initial screen, where you can select the make and model year.

![image](https://github.com/user-attachments/assets/4d9e9f6c-ce8a-4885-b613-e8defe336e9e)

Same screen, with make and model year selected.

![image](https://github.com/user-attachments/assets/2810d833-4086-41df-9eaa-5ba3b99492dd)

Results from the search, with a button to go back to the initial screen.

![image](https://github.com/user-attachments/assets/c96dac2f-487f-488f-a277-2e6029fb1812)


## Deployment

Here is the deployed version of the test (Using Vercel)

https://cardealerapp.vercel.app/




## Run Locally

Clone the project

```bash
  git clone https://github.com/marcosmonaco/cardealerapp.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Build the app

```bash
  npm run build
```

