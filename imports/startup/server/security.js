import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import { HTTP } from 'meteor/http';

// Don't let people write arbitrary data to their 'profile' field from the client
Meteor.users.deny({
  update() {
    return true;
  },
});

Meteor.onConnection(function(conn) {
  console.log(conn.clientAddress);
});

Meteor.methods({
    getIP: function(){

        // No need to make others wait
        this.unblock();

        // Locals
        var conn        = this.connection;
        var ipPublic    = conn.clientAddress;
        var ipSource    = conn.httpHeaders['x-forwarded-for'].split(',')[0]
                        || ipPublic;
        var prox        = (process.env.HTTP_FORWARDED_COUNT)
                        ? parseInt(process.env.HTTP_FORWARDED_COUNT)
                        : 0;
        // Determine IP to log
        return (prox) ? ipSource : ipPublic;
    }
});

// Get a list of all accounts methods by running `Meteor.server.method_handlers` in meteor shell
const AUTH_METHODS = [
  'login',
  'logout',
  'logoutOtherClients',
  'getNewToken',
  'removeOtherTokens',
  'configureLoginService',
  'changePassword',
  'forgotPassword',
  'resetPassword',
  'verifyEmail',
  'createUser',
  'ATRemoveService',
  'ATCreateUserServer',
  'ATResendVerificationEmail',
];

// Only allow 2 login attempts per connection per 5 seconds
DDPRateLimiter.addRule({
  name(name) {
    return _.contains(AUTH_METHODS, name);
  },

  // Rate limit per connection ID
  connectionId() { return true; },
}, 2, 5000);
