# Octo Frontend

This is the frontend side of the panel

## Running

1. Pull the code
2. Configure the panel
3. [Deploy the Vue.js app as you usually would](https://cli.vuejs.org/guide/deployment.html)

## Configuration

- Open the `src/util/config.js` file

    |Key|Description|
    |---|---|
    |clientId| Your bot's client id |
    |inProduction| States if the panel is running in production or in development enviornment and applies the following settings accordingly |
    |production/development.url| The url of the authentication service |
    |production/development.cookieDomain| The domain assigned to a cookie set by the authentication service |
    |production/development.backendUrl| The url of the bot's backend server |

