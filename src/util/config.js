export default {
    clientId: "CLIENT_ID",
    inProduction: false,
    production: {
        url: "https://my.bot",
        cookieDomain: ".my.bot",
        backendUrl: "https://my.bot:8443"
    },
    development: {
        url: "http://localhost:8888",
        cookieDomain: "localhost",
        backendUrl: "http://localhost:8443"
    }
}
