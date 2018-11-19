// Use controller to declare all endpoints associated with that controller
const AuthenticationController = require('./controllers/AuthenticationController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  // A login endpoint which calls the AuthenticationController.login method
  app.post('/login',
    AuthenticationController.login)
}
