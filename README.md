# Hoplon ADTAA

This project is a web application designed to schedule classes with instructors, using a data model that a user can 
modify. It was created for a Capstone Project class for the department of Computer Science at UA Little Rock, 
Spring 2022. The repository was designed to uploaded to the Salesforce deployment service, Heroku, and uses a 
Django/React boilerplate.

## React Frontend Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Django Backend

The Django backend API uses a PostgreSQL database and a gmail STMP email server. Ensure that the following environment
variables are set before running:

- DB_USERNAME (Database user)
- DB_PASSWORD (Database user's password)
- EMAIL_HOST (Email service's URI)
- EMAIL_HOST_USER (Email service's user)
- EMAIL_HOST_PASSWORD (Email service's user's password)

### `python manage.py makemigrations`

This command is used to make the migrations after `models.py` has been modified. The deployment server follows these 
migrations after upload.

### `python manage.py migrate`

This command is used to apply the migrations to the connected database. 

### `python manage.py load_helper_models`

This command loads the static models that are used in the application, such as subject disciplines. It must be run 
before using the application.

### `python manage.py load_dummy_data`

This command loads example data to show how the application could be used.

### Admin Panel

The Django backend features a built-in admin panel to manage superuser responsibilities. This can be reached from the
host URL followed by `/admin`.

## Heroku Deployment Service

To use the heroku deployment service, the heroku github repository must be added as a remote to this project. Updates
can be pushed to the deployment service by pushing to that remote like, `git push heroku main`. 

The Heroku CLI can also be used to execute commands on the deployment service. The format of these commands are 
`heroku run python manage.py [command] -a [heroku app name]`.
