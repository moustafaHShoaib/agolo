import "jest";
import * as request from "supertest";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "@jest/globals";
import { serviceUrl } from "../util";
import * as faker from "faker";
/*
 * Test Module
 */

let username;
let password
beforeEach(async () => {

  // need to be moved into a separate step
     username=faker.name.findName();
     password=faker.internet.password();
  const response = await request(serviceUrl)
    .post(`/signup`)
    .set("content-type", "application/JSON")
    .send({
        "username": username,
        "password": password
      })


  });
describe("sign in tests", () => {
  describe("Sign in happy flows", () => {
    test("sign in with a valid username and password", async () => {

      const response = await request(serviceUrl)
        .post(`/login`)
        .set("content-type", "application/JSON")
        .send({
            "username": username,
            "password": password
          })
        .expect(200);

     expect(await response.statusCode).toBe(200)
   expect(response.body).toContain('Auth_token')
    });
});

describe("Sign in unhappy flows", () => {
    test("sign in with an empty username and password", async () => {

      const response = await request(serviceUrl)
        .post(`/login`)
        .set("content-type", "application/JSON")
        .send({
            "username": '',
            "password": ''
          })
        .expect(500);

     expect( response.statusCode).toBe(500)
    });
    

test("sign in with an empty username", async () => {

    const response = await request(serviceUrl)
      .post(`/login`)
      .set("content-type", "application/JSON")
      .send({
          "username": '',
          "password": password
        })
      .expect(500);

   expect( response.statusCode).toBe(500)
  });

  /* incorrect behavior/bug
  */
  test("sign in with an empty password", async () => {

    const response = await request(serviceUrl)
      .post(`/login`)
      .set("content-type", "application/JSON")
      .send({
          "username": username,
          "password": ''
        })
      .expect(200);

   expect( response.statusCode).toBe(200)
  });
});
});

