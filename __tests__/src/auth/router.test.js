'use strict';

process.env.SECRET = 'test';

const jwt = require('jsonwebtoken');

const Roles = require('../../../src/auth/roles-model.js');
const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');

const mockRequest = supergoose(server);

let users = {
  admin: {username: 'admin', password: 'password', role: 'admin'},
  editor: {username: 'editor', password: 'password', role: 'editor'},
  user: {username: 'user', password: 'password', role: 'user'},
};
//added demo code stuf////////////////
let roles = {
  admin: ['create', 'read', 'update', 'delete', 'generate-key'],
  editor: ['create', 'read', 'update'],
  user: ['read'],
};
////////////////////////////////////
beforeAll(async () => {
});


describe('Auth Router', () => {
  
  Object.keys(users).forEach( userType => {
    
    describe(`${userType} users`, () => {
      
      let encodedToken;
      let id;
      
      it('can create one', () => {
        return mockRequest.post('/signup')
          .send(users[userType])
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            id = token.id;
            encodedToken = results.text;
            expect(token.id).toBeDefined();
            expect(token.capabilities).toBeDefined();
          });
      });

      it('can signin with basic', () => {
        return mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
            expect(token.capabilities).toBeDefined();
          });
      });

      it('can signin with bearer', () => {
        return mockRequest.post('/signin')
          .set('Authorization', `Bearer ${encodedToken}`)
          .then(results => {
            var token = jwt.verify(results.text, process.env.SECRET);
            expect(token.id).toEqual(id);
            expect(token.capabilities).toBeDefined();
          });
      });
      it('allows indestructible /key only for admin', () => {
        let user = users[userType];

        return mockRequest
          .post('/key')
          .set('Authorization', `Bearer ${savedToken}`)
      })
    });
    
  });
  
});