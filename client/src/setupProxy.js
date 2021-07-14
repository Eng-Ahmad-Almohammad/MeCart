const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./config");

console.log(config);
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: config.serverURL,
    })
  );
};
