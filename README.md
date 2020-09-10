# Welcome to Pokemon Card Backup Center
This app is written using:
* [ExpressJS](https://expressjs.com/) (Node) as application framework
* [Mongo](https://www.mongodb.com/) as persistent database
* [React](https://reactjs.org/) to build client side of the application
* [Material](https://material-ui.com/) UI to build UI components
* [Webpack](https://webpack.js.org/) to transpile and bundle javascript files
 
You can preview the app by visiting: https://pcbc-dev.herokuapp.com/

The app is hosted in heroku app, and mongo database is hosted in MongoDB Atlas (cloud)

## How to use this app:
* You can login (very basic simplified version of JWT) using provided authentication information.
* Once you are logged in there are three sections: Backup, Remove, and Search
* If you want to backup any set of pokemon cards, you can choose to do so by selecting a set and clicking Backup button.
* If you have backed up at least one set, you will be able to see that in the Remove section (use the set name and time created as hint)
* In search section you can select any number of search fields (search by individual fields or as combinations) and that shows list of matching cards.


## API Endpoints:
This app uses following API endpoints:
* GET-LIST /backups
  * Gets list of backup information
* GET-LIST /cards?query=
  * Used for search. Allowed query parameters are: `name`, `hp`, `rarity`, `backupId`
* DELETE /backups/:backupId:
  * Removes a backup given backup Id
* POST /backups {setCode}
  * Given a set code, server fetches the cards for the given set and store them. Also tags them with a unique backup Id.

