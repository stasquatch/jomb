# jomb

just organize my books - library management app

## to start

1.  create `/jomb/server/config/dev.json` file with the following boilerplate:

```
{
  "DBHost": ""
}
```

Add your MongoDB connection string. You can also add a `test.json` file in this folder to run the backend tests.

2.  cd into /jomb/client and run `npm install`
3.  cd into /jomb/server and run `npm install`, then run `yarn dev` or `npm run dev` to boot up both express and react servers.

---

## Adding Change History Event to an Existing Endpoint

Add Change History middleware to server.js routing

```
const { addChangeHistoryEvent } = require("./handlers/changeHistory");
...
app.route("/api/book").post(bookController.addBook, addChangeHistoryEvent);
```

The action that `addChangeHistoryEvent` will add to the database is defined within `bookController.addBook`, so we don't need to worry about it here.

Next, let's update the bookController.addBook method to implement `next()`. Only add `next()` when express should continue to add a change history log (ie: on success only).

```
exports.addBook = async (req, res, next) => {
  // all the logic of adding a book and error handling
  // then we add the necessary data to the request
  // and send it on to the addChangeHistoryToBook method.
  // errorNumber, message, and book will be sent to the UI
  // action and description are used to add the
  // change history to the mongo table they are stored in
  req.transportToUI = {
    errorNumber: SUCCESS,
    message: "Book successfully added!",
    book
  }
  req.changeHistoryData = {
    action: ADD,
    description: "Added book to library",
    bookId: book._id
  };
  next();
}
```

Everything within the `transportToUI` object will be passed back to the UI via `res.json()` in the `addChangeHistoryEvent` method.

The `addChangeHistoryEvent` will return an object like below to the UI:

```
{
    "transportToUI": {
        "errorNumber": 0,
        "message": "Book successfully added!",
        "book": {
            "authors": [
                "Kim Golombisky",
                "Rebecca Hagen"
            ],
            "tags": [],
            "location": [],
            "_id": "5b9eac7855ce51144c74885b",
            "isbn": "1138804649",
            "addedOn": "2018-09-16T19:18:16.729Z",
            "title": "White Space Is Not Your Enemy",
            "__v": 0
        }
    },
    "changeHistory": {
        "errorNumber": 0,
        "message": "Successfully added change history event to book"
    }
}
```

## Possible Error Numbers to Check For

See the `jomb/server/models/constants.js` file for an up-to-date list of error numbers
