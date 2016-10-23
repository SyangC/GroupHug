var dbURIs = {
  test: "mongodb://localhost/GroupHug-test",
  development: "mongodb://localhost/GroupHug",
  production: process.env.MONGODB_URI || "mongodb://localhost/GroupHug"
};

module.exports = function(env) {
  return dbURIs[env];
}