# What was done:

The concept behind of the changes made was to create directories to hold specific components and logic behind the form construction.
Here is what you can find in each of them:

`pages`
-

For creating the the Multiple step form, I created pages to reflect each of the steps, that can be found under `/src/pages`.


`components`
-

Some of the components used in those pages, for instance, `InformativeTemplate` that is used on both `/error` and `/success` pages, are located in `/src/components`


`common`
-

In this directory you will be able to find styles that are shared by multiple components.


`helpers`
-

Logic  that is supporting specific parts of the application, to better isolate them from them components.


`utils` 
-

Logic that can potencially be used in different parts of the application, even if it's only being used by one, currently.


`services`
-

Initial setup for APIs


`store`
-

The store configuration and logic to handle the store.


# Choices of technology

- For creating the form I chose to use Formik, due to its reduced boilerplate to be able to handle form states like "isSubmitting", "isValid", etc.
- For storing the data inserted in the forms, I opted for using Redux, which allowed me for having an organized and clean access to the data from different points of the application.
- For API calls I opted for Redux toolkit query, which allows for writing simpler code while having some good default behaviours like caching. You should be able to se that in effect when you first access the `more-info` and it takes some time to retrive the color data, but if you navigate back to the first step and than go to the `/more-info` again, you don't need to wait that data to be retrived for the second time.
- For Testing I am using React testing.
- For route setup, I opted for React router, which allowed for a more organized approach and the configuration of loaders that handles the redirects for when the user lands on a form step without having filled up the prior ones.
- For styles I opted for styled components, as that keeps a more organized approach, specially to style components that comes from libraries, like Formik.


# Usability:

Some of the things I decided to focus on were:

- Having a simple and clean layout, taking into consideration how clean all the information was being displayed.
- Another things I decided as important to have was the router handling for not allowing users to access different pages of the form without having filled up the prior ones
- The password handling, when user navigates back to first step, I decided to not populate the password chosen to the password field, and although it's stores along with other form data, it's getting encrypted before sending it to the backend, for security.
