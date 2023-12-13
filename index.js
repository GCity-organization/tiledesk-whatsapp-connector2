require('dotenv').config();
const express = require('express');
const app = express();

// const whatsapp = require('@tiledesk/tiledesk-whatsapp-connector');
const whatsapp = require('./whatsappRoute');
const whatsappRoute = whatsapp.router;

app.use("/", whatsappRoute)

const BASE_URL = process.env.BASE_URL;
const API_URL = process.env.API_URL;
const BASE_FILE_URL = process.env.BASE_FILE_URL;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET?.replace(/\\n/gm, "\n");
const GRAPH_URL = process.env.GRAPH_URL;
const MONGODB_URL = process.env.MONGODB_URL;
const APPS_API_URL = process.env.APPS_API_URL;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const AMQP_MANAGER_URL = process.env.AMQP_MANAGER_URL;
const log = process.env.WHATSAPP_LOG || "info";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

whatsapp.startApp(
  {
    MONGODB_URL: MONGODB_URL,
    API_URL: API_URL,
    BASE_FILE_URL: BASE_FILE_URL,
    ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET,
    GRAPH_URL: GRAPH_URL,
    BASE_URL: BASE_URL,
    APPS_API_URL: APPS_API_URL,
    REDIS_HOST: REDIS_HOST,
    REDIS_PORT: REDIS_PORT,
    REDIS_PASSWORD: REDIS_PASSWORD,
    AMQP_MANAGER_URL: AMQP_MANAGER_URL,
    log: log
  }, (err) => {

    if (!err) {
      console.log("Whatsapp route succesfully started.")
      var port = process.env.PORT || 3000;
      app.listen(port, function() {
        console.log("Whatsapp connector listening on port: ", port);
      })
    } else {
      console.log("(Warning) Unable to start tiledesk-whatsapp-connector.", err);
    }
  }
);
