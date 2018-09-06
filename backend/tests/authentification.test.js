// import mongoose from 'mongoose';
// import { protectedValue } from '../protected';
//
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const MongoStore = require('connect-mongo')(session);
// const supertestSession = require('supertest-session');
// const app = require('../app');
// const authentificationService = require('../services/authentification');
// const utils = require('../utils');
//
// let conn;
// function init() {
//   return new Promise((resolve, reject) => {
//     mongoose.connect(protectedValue('dbTestingUri'), { useNewUrlParser: true }, (err) => {
//       if (err) reject(err);
//       console.log('promise'+mongoose.connection);
//       resolve(mongoose.connection);
//     });
//   });
// }
//
// beforeAll(async (done) => {
//   conn = await init();
//   console.log('beforeAll'+conn);
//   conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
//
//   app.use(cookieParser());
//   app.use(session({
//     secret: protectedValue('sessionSecret'),
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: conn }),
//     rolling: true,
//     name: 'ArthurDent',
//   }));
//   done();
// });
//
// describe('Test the /index route - not signed in', () => {
//   beforeEach(async (done) => {
//   console.log('beforeEach'+conn);
//     // await conn.db.dropDatabase();
//     const hash = await utils.hashPassword('Pass0!');
//     // await authentificationService.createUser('devtesting', 'devtesting.emailaddress@gmail.com', hash);
//     // =await authentificationService.createUser('userverified', 'user.verified@gmail.com', hash, true);
//     // const user = await authentificationService.getUser({ $or: [{ email: 'userverified' }, { username: 'userverified' }] });
//     console.log('beforeeach end ');
//     done();
//   });
//
//   test('the data is peanut butter', () => {
//     console.log('request');
//     return supertestSession(app).post('/authentification/signin').send({ username: 'userverified', password: 'Pass0!' })
//     .then(data => {
//       expect(data).toBe('peanut butter');
//     });
//   });
// });
//
// // test('It should response 200 and success is true', async (done) => {
// // console.log(JSON.stringify('REQUEST'));
// //   const response = await supertestSession(app).post('/authentification/signin').send({ username: 'userverified', password: 'Pass0!' });
// //   console.log(JSON.stringify(response));
// //   expect(response.statusCode).toBe(200);
// //   expect(response.type).toEqual('application/json');
// //   expect(response.body.success).toBe(true);
// //   done();
// // });
//
// // // Index
// // describe('Test the /index route - not signed in', () => {
// //   test('It should response 200 and signedIn is false', async (done) => {
// //     const response = await request(app).get('/authentification/');
// //     expect(response.statusCode).toBe(200);
// //     expect(response.type).toEqual('application/json');
// //     expect(response.body.signedIn).toBe(false);
// //     done();
// //   }, 30000);
// // });
// //
// // // Check user exists
// // describe('Test the /check-user-exists route', () => {
// //   describe('User does not exist', () => {
// //     test('It should response 200 and success is false', async (done) => {
// //       const response = await request(app).post('/authentification/check-user-exists').send({ username: 'emailt@test.com' });
// //       expect(response.statusCode).toBe(200);
// //       expect(response.type).toEqual('application/json');
// //       expect(response.body.success).toBe(false);
// //       done();
// //     }, 30000);
// //   });
// //
// //   describe('User exists', () => {
// //     test('It should response 200 and success is true', async (done) => {
// //       const response = await request(app).post('/authentification/check-user-exists').send({ username: 'devtesting.emailaddress@gmail.com' });
// //       expect(response.statusCode).toBe(200);
// //       expect(response.type).toEqual('application/json');
// //       expect(response.body.success).toBe(true);
// //       done();
// //     }, 30000);
// //   });
// // });
//
// // Signin
// // describe('Test the /signin route', () => {
//   // describe('Username does not exist', () => {
//   //   test('It should response 200 and success is false', async (done) => {
//   //     const response = await request(app).post('/authentification/signin').send({ username: 'wrongusername', password: 'wrongpwd' });
//   //     expect(response.statusCode).toBe(200);
//   //     expect(response.type).toEqual('application/json');
//   //     expect(response.body.success).toBe(false);
//   //     expect(response.body.message).toBe('We were unable to find a user with that email or username.');
//   //     done();
//   //   }, 30000);
//   // });
//   //
//   // describe('Email does not exist', () => {
//   //   test('It should response 200 and success is false', async (done) => {
//   //     const response = await request(app).post('/authentification/signin').send({ username: 'wrong@gmail.com', password: 'wrongpwd' });
//   //     expect(response.statusCode).toBe(200);
//   //     expect(response.type).toEqual('application/json');
//   //     expect(response.body.success).toBe(false);
//   //     expect(response.body.message).toBe('We were unable to find a user with that email or username.');
//   //     done();
//   //   }, 30000);
//   // });
//   //
//   // describe('Wrong password', () => {
//   //   test('It should response 200 and success is false', async (done) => {
//   //     const response = await request(app).post('/authentification/signin').send({ username: 'devtesting', password: 'wrongpwd' });
//   //     expect(response.statusCode).toBe(200);
//   //     expect(response.type).toEqual('application/json');
//   //     expect(response.body.success).toBe(false);
//   //     expect(response.body.message).toBe('Your password is incorrect.');
//   //     done();
//   //   }, 30000);
//   // });
//   //
//   // describe('User not verified', () => {
//   //   test('It should response 200 and success is false', async (done) => {
//   //     const response = await request(app).post('/authentification/signin').send({ username: 'devtesting', password: 'Pass0!' });
//   //     expect(response.statusCode).toBe(200);
//   //     expect(response.type).toEqual('application/json');
//   //     expect(response.body.success).toBe(false);
//   //     expect(response.body.toVerify).toBe(true);
//   //     expect(response.body.message).toBe('Your account has not been verified.');
//   //     done();
//   //   }, 30000);
//   // });
// //
// //   describe('Signin ok', () => {
// //     test('It should response 200 and success is true', async (done) => {
// //     console.log(JSON.stringify('REQUEST'));
// //       const response = await supertestSession(app).post('/authentification/signin').send({ username: 'userverified', password: 'Pass0!' });
// //       console.log(JSON.stringify(response));
// //       expect(response.statusCode).toBe(200);
// //       expect(response.type).toEqual('application/json');
// //       expect(response.body.success).toBe(true);
// //       done();
// //     }, 30000);
// //   });
// // });
//
// // // Available
// // describe('Test the /available route', () => {
// //   describe('Username not available', () => {
// //     test('It should response 200 and available is false', async (done) => {
// //       const response = await request(app).post('/authentification/available').send({ field: 'username', value: 'devtesting' });
// //       expect(response.statusCode).toBe(200);
// //       expect(response.type).toEqual('application/json');
// //       expect(response.body.available).toBe(false);
// //       done();
// //     }, 30000);
// //   });
// //   describe('Email not available', () => {
// //     test('It should response 200 and available is false', async (done) => {
// //       const response = await request(app).post('/authentification/available').send({ field: 'email', value: 'devtesting.emailaddress@gmail.com' });
// //       expect(response.statusCode).toBe(200);
// //       expect(response.type).toEqual('application/json');
// //       expect(response.body.available).toBe(false);
// //       done();
// //     }, 30000);
// //   });
// //
// //   describe('Username available', () => {
// //     test('It should response 200 and available is true', async (done) => {
// //       const response = await request(app).post('/authentification/available').send({ field: 'username', value: 'available' });
// //       expect(response.statusCode).toBe(200);
// //       expect(response.type).toEqual('application/json');
// //       expect(response.body.available).toBe(true);
// //       done();
// //     }, 30000);
// //   });
// //   describe('Email available', () => {
// //     test('It should response 200 and available is true', async (done) => {
// //       const response = await request(app).post('/authentification/available').send({ field: 'email', value: 'available@gmail.com' });
// //       expect(response.statusCode).toBe(200);
// //       expect(response.type).toEqual('application/json');
// //       expect(response.body.available).toBe(true);
// //       done();
// //     }, 30000);
// //   });
// // });
// //
// // // Signup
// // describe('Test the /signup route', () => {
// //   describe('Username taken', () => {
// //     test('It should response 200 and success is false', async (done) => {
// //       const response = await request(app).post('/authentification/signup')
// //         .send({ username: 'userverified', email: 'user@gmail.com', password: 'Pass0!' });
// //       expect(response.statusCode).toBe(200);
// //       expect(response.type).toEqual('application/json');
// //       expect(response.body.success).toBe(false);
// //       expect(response.body.message).toBe('Username already used. Please chose another one.');
// //       done();
// //     }, 30000);
// //   });
// //
// //   describe('Email taken', () => {
// //     test('It should response 200 and success is false', async (done) => {
// //       const response = await request(app).post('/authentification/signup')
// //         .send({ username: 'user', email: 'user.verified@gmail.com', password: 'Pass0!' });
// //       expect(response.statusCode).toBe(200);
// //       expect(response.type).toEqual('application/json');
// //       expect(response.body.success).toBe(false);
// //       expect(response.body.message).toBe('Email already used. Please use another one or sign in.');
// //       done();
// //     }, 30000);
// //   });
// //
// //   describe('Signup ok', () => {
// //     test('It should response 200 and success is true', async (done) => {
// //       const response = await request(app).post('/authentification/signup')
// //         .send({ username: 'user', email: 'user@gmail.com', password: 'Pass0!' });
// //       expect(response.statusCode).toBe(200);
// //       expect(response.type).toEqual('application/json');
// //       expect(response.body.success).toBe(true);
// //       done();
// //     }, 30000);
// //   });
// // });
//
// afterAll(async (done) => {
//   await conn.db.dropDatabase();
//   await conn.close();
//   done();
// });
