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
