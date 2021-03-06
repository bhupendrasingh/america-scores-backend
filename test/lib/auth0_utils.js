'use strict';

const chai = require('chai');
const assert = chai.assert;
const Promise = require('bluebird');

const seed = require('../../lib/seed').testSeed;
const auth0 = require('../../lib/auth0_utils');
const testUtils = require('../../lib/test_utils');
const assertEqualError = testUtils.assertEqualError;
const assertEqualAuth0DB = testUtils.assertEqualAuth0DBAcct;

const EXISTING_USERNAME = 'test1';
const ACCT = Object.assign({username: EXISTING_USERNAME}, require('../../lib/constants/seed').ACCT_1);
const AUTH0_ID = ACCT.auth0_id;

const FIRST = 'Bob';
const LAST = 'Pratt';
const USERNAME = 'testing1';
const EMAIL = 'test@americascores.org';
const TYPE = 'Staff';
const PASSWORD = 'TestPassw0rd';

const TEST_FIRST = 'Anna';
const TEST_LAST = 'Smith';
const TEST_USERNAME = 'testing2';
const TEST_EMAIL = 'test2@americascores.org';
const TEST_TYPE = 'Volunteer';
const TEST_PASSWORD = 'Password123';

const BAD_PASSWORD = 'password';
const BAD_EMAIL = 'notanemail';
const BAD_USERNAME = 'abc';

function User(first_name, last_name, username, email, type, password) {
  this.first_name = first_name;
  this.last_name = last_name;
  this.username = username;
  this.email = email;
  this.acct_type = type;
  this.password = password;
}

const USER = new User(FIRST, LAST, USERNAME, EMAIL, TYPE, PASSWORD);
const TEST_USER = new User(TEST_FIRST, TEST_LAST, TEST_USERNAME, TEST_EMAIL, TEST_TYPE, TEST_PASSWORD);

const EMAILS = [EMAIL, TEST_EMAIL];
const VALID_USER_KEYS = ['first_name', 'last_name', 'username', 'email', 'password', 'type'];

function deleteUserIfExists(email) {
  return auth0.getAuth0UserByEmail(email).then(function(user) {
    // clear existing user so we don't get a duplicate email error on creation
    return auth0.deleteAuth0User(user.user_id);
  }).catch(function(err) {
    // no user to delete, tests are good to go
    return Promise.resolve();
  });
}

function assertEqualAuth0(fromAuth0, expected) {
  assertEqualAuth0DB(fromAuth0, expected);
  assert.equal(fromAuth0.username, expected.username);
};

function testCreateError(props, done) {
  var tester = Object.assign({}, TEST_USER);
  var key;
  for (key in props) {
    if (VALID_USER_KEYS.indexOf(key) > 0) {
      tester[key] = props[key];
    }
  };

  auth0.createAuth0User(tester.first_name, tester.last_name, tester.username,
    tester.email, tester.acct_type, tester.password).catch(function(err) {
    assert.equal(err.statusCode, 400);
    done();
  });
};

function testUpdateAuth0UserFromParams(auth0Id, updateKey, updateValue, done) {
  var tester = Object.assign({}, USER);
  var updateParams = {};
  var resetParams = {};

  resetParams[updateKey] = USER[updateKey];
  updateParams[updateKey] = updateValue;
  tester[updateKey] = updateValue;

  auth0.updateAuth0UserFromParams(auth0Id, updateParams)
    .then(function(auth0Acct) {
      assertEqualAuth0(auth0Acct, tester);
      // reset account
      auth0.updateAuth0UserFromParams(auth0Id, resetParams)
        .then(function(auth0Acct) {
          assertEqualAuth0(auth0Acct, USER);
          done();
      });
  });
}

function testUpdateAuth0Error(auth0Id, updates, done) {
  auth0.updateAuth0UserFromParams(auth0Id, updates)
    .catch(function(err) {
      assert.equal(err.statusCode, 400);
      // make sure nothing changed
      auth0.getAuth0User(auth0Id).then(function(auth0Acct) {
        assertEqualAuth0(auth0Acct, USER);
        done();
      });
  });
}

describe('Auth0 Utils', function() {
  /* eslint-disable no-invalid-this */
  this.timeout(15000);
  /* eslint-enable no-invalid-this */
  before(function(done) {
    seed().then(function() {
      Promise.each(EMAILS, function(email) {
        return deleteUserIfExists(email);
      }).then(function() {
        done();
      });
    });
  });

  after(function(done) {
    Promise.each(EMAILS, function(email) {
      return deleteUserIfExists(email);
    }).then(function() {
      done();
    });
  });

  describe('getAuth0Id(acct_id)', function() {
    it('it should get the auth0 id for a given account id', function(done) {
      auth0.getAuth0Id(ACCT.acct_id).then(function(data) {
        assert.equal(data, AUTH0_ID);
        done();
      });
    });

    it('it should 404 when the account id doesn\'t exist', function(done) {
      auth0.getAuth0Id('999').catch(function(err) {
        assertEqualError(err, 'ArgumentNotFoundError', 404,
          'Invalid request: The given acct_id does not exist in the database');
        assert.equal(err.propertyName, 'acct_id');
        assert.equal(err.propertyValue, '999');
        done();
      });
    });
  });

  describe('getAuth0User(auth0_id)', function() {
    it('it should return the auth0 user for a given auth0 id', function(done) {
      auth0.getAuth0User(AUTH0_ID).then(function(data) {
        assert.equal(data.user_id, AUTH0_ID);
        assertEqualAuth0DB(data, ACCT);
        done();
      });
    });

    it('it should 404 when no auth0 user with the given id exists', function(done) {
      auth0.getAuth0User('999').catch(function(err) {
        assertEqualError(err, 'ArgumentNotFoundError', 404,
          'Invalid request: The given auth0_id does not exist in the database');
        assert.equal(err.propertyName, 'auth0_id');
        assert.equal(err.propertyValue, '999');
        done();
      });
    });
  });

  describe('getAuth0UserByEmail(email)', function() {
    it('it should retrieve an auth0 user for the given email', function(done) {
      auth0.getAuth0UserByEmail(ACCT.email).then(function(auth0Acct) {
        assertEqualAuth0(auth0Acct, ACCT);
        done();
      });
    });

    it('it should 404 because no auth0 user exists for the given email', function(done) {
      auth0.getAuth0UserByEmail(TEST_EMAIL).catch(function(err) {
        assertEqualError(err, 'Not Found', 404,
          'There is no Auth0 account with an email matching the query: ' +
          'email: "^' + TEST_EMAIL + '"$');
        done();
      });
    });
  });

  describe('createAuth0User(firstName, lastName, username, email, acctType, password)', function() {
    before(function(done) {
      deleteUserIfExists(EMAIL).then(function() {
        done();
      });
    });

    afterEach(function(done) {
      deleteUserIfExists(EMAIL).then(function() {
        done();
      });
    });

    it('it should create an auth0 user for the given user data', function(done) {
      auth0.createAuth0User(FIRST, LAST, USERNAME, EMAIL, TYPE, PASSWORD)
        .then(function(userId) {
          assert.isNotNull(userId);
          auth0.getAuth0User(userId).then(function(data) {
            assertEqualAuth0(data, USER);
            done();
          });
        });
    });

    it('it should 400 when trying to create a user with a username that already exists',
      function(done) {
        testCreateError({username: ACCT.username}, done);
    });

    it('it should 400 when trying to create a user that already exists (i.e. same email)',
      function(done) {
        testCreateError({email: ACCT.email}, done);
    });

    // Note: currently the password policy is >= 8 characters, with lowercase, uppercase, number
    it('it should 400 when trying to create a user with a password that is too weak',
      function(done) {
        testCreateError({password: BAD_PASSWORD}, done);
    });

    // Note: currently the username policy is 4-15 characters
    it('it should 400 when trying to create a user with an invalid username',
      function(done) {
        testCreateError({username: BAD_USERNAME}, done);
      });

    it('it should 400 when trying to create a user with an invalid email',
      function(done) {
        testCreateError({email: BAD_EMAIL}, done);
    });
  });

  describe('updateAuth0UserFromParams(auth0_id, updates)', function() {
    var createdAuth0Id;

    before(function(done) {
      Promise.each(EMAILS, function(email) {
        return deleteUserIfExists(email);
      }).then(function() {
        setTimeout(function() {
          auth0.createAuth0User(FIRST, LAST, USERNAME, EMAIL, TYPE, PASSWORD).then(function(userId) {
            createdAuth0Id = userId;
            done();
          });
        }, 10000);
      });
    });

    after(function(done) {
      Promise.each(EMAILS, function(email) {
        return deleteUserIfExists(email);
      }).then(function() {
        done();
      });
    });

    it('it should update the email of the user', function(done) {
      testUpdateAuth0UserFromParams(createdAuth0Id, 'email', TEST_EMAIL, done);
    });

    it('it should 400 when trying to update the email to an invalid email', function(done) {
      testUpdateAuth0Error(createdAuth0Id, {email: BAD_EMAIL}, done);
    });

    it('it should 400 when trying to update the email to one that already exists', function(done) {
      testUpdateAuth0Error(createdAuth0Id, {email: ACCT.email}, done);
    });

    it('it should update the username of the user', function(done) {
      testUpdateAuth0UserFromParams(createdAuth0Id, 'username', TEST_USERNAME, done);
    });

    it('it should 400 when trying to update the username to an invalid username', function(done) {
      testUpdateAuth0Error(createdAuth0Id, {username: BAD_USERNAME}, done);
    });

    it('it should 400 when trying to update the username to one that already exists', function(done) {
      testUpdateAuth0Error(createdAuth0Id, {username: EXISTING_USERNAME}, done);
    });

    it('it should 400 when trying to update the username and email simultaneously', function(done) {
      testUpdateAuth0Error(createdAuth0Id, {username: TEST_USERNAME, email: TEST_EMAIL}, done);
    });

    // TODO: figure out a way to verify password was actually updated
    it('it should update the password of the user', function(done) {
      testUpdateAuth0UserFromParams(createdAuth0Id, 'password', TEST_PASSWORD, done);
    });

    it('it should 400 when trying to update the password to an invalid password', function(done) {
      testUpdateAuth0Error(createdAuth0Id, {password: BAD_PASSWORD}, done);
    });

    it('it should 400 when trying to update the password and email simultaneously', function(done) {
      testUpdateAuth0Error(createdAuth0Id, {email: TEST_EMAIL, password: TEST_PASSWORD}, done);
    });

    it('it should 400 when trying to update the password and username simultaneously', function(done) {
      testUpdateAuth0Error(createdAuth0Id, {username: TEST_USERNAME, password: TEST_PASSWORD}, done);
    });

    it('it should update the user_metadata of the user', function(done) {
      testUpdateAuth0UserFromParams(createdAuth0Id, 'first_name', TEST_FIRST, done);
    });

    it('it should update the app_metadata of the user', function(done) {
      testUpdateAuth0UserFromParams(createdAuth0Id, 'acct_type', TEST_TYPE, done);
    });

    // supported fields: username, email, password, type, user_metadata.first_name, last_name
    it('it should 501 when trying to update an unsupported field', function(done) {
      auth0.updateAuth0UserFromParams(createdAuth0Id, {notafield: 'anything'})
        .catch(function(err) {
          assertEqualError(err, 'UnsupportedRequest', 501,
            'The API does not support a request of this format. ' +
            ' See the documentation for a list of options.');
          done();
        });
    });
  });

  describe('deleteAuth0User(auth0_id)', function() {
    /* eslint-disable no-invalid-this */
    this.timeout(15000);
    /* eslint-enable no-invalid-this */

    beforeEach(function(done) {
      setTimeout(function() {
        auth0.createAuth0User(FIRST, LAST, USERNAME, EMAIL, TYPE, PASSWORD).then(function(userId) {
          done();
        });
      }, 10000);
    });

    afterEach(function(done) {
      deleteUserIfExists(EMAIL).then(function() {
        done();
      });
    });

    it('it should delete an auth0 user with the given id', function(done) {
      // ensure user exists
      function test() {
        auth0.getAuth0UserByEmail(EMAIL).then(function(data) {
          // delete user
          auth0.deleteAuth0User(data.user_id).then(function() {
            // ensure user doesn't exist
            auth0.getAuth0User(data.user_id).catch(function(err) {
              assertEqualError(err, 'ArgumentNotFoundError', 404,
                'Invalid request: The given auth0_id' +
                ' does not exist in the database');
              assert.equal(err.propertyName, 'auth0_id');
              assert.equal(err.propertyValue, data.user_id);
              done();
            });
          });
        });
      }

      setTimeout(test, 3000);
    });

    // TODO: it looks like the Auth0 API wrapper swallows this error?
    xit('it should 204 when trying to delete an auth0 user that doesn\'t exist', function(done) {
      auth0.deleteAuth0User('999').catch(function(err) {
        assert.equal(err.statusCode, 204);
        done();
      });
    });
  });


  describe('verifyPasswordStrength(password)', function() {
    it('it should return false when the password is less than 8 characters', function() {
      assert.isFalse(auth0.verifyPasswordStrength('aB3'));
    });

    it('it should return false when the password contains no numbers', function() {
      assert.isFalse(auth0.verifyPasswordStrength('aBcDeFgHiJk'));
    });

    it('it should return false when the password contains no capital letters', function() {
      assert.isFalse(auth0.verifyPasswordStrength('abcde12345'));
    });

    it('it should return false when the password contains no lowercase letters', function() {
      assert.isFalse(auth0.verifyPasswordStrength('ABCDE12345'));
    });

    it('it should return true when the password satisfies the password policy', function() {
      assert.isTrue(auth0.verifyPasswordStrength('aBcDe12345'));
    });
  });
});
