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

describe("SignUp tests", () => {
  describe("Sign up happy flows", () => {
    test("sign Up with a valid username and password", async () => {
        const username=faker.name.findName();
        const password=faker.internet.password();
      const response = await request(serviceUrl)
        .post(`/signup`)
        .set("content-type", "application/JSON")
        .send({
            "username": username,
            "password": password
          })
        .expect(200);

     expect(await response.statusCode).toBe(200)
    });
    test("sign Up with an empty header ", async () => {
        const username=faker.name.findName();
        const password=faker.internet.password();
      const response = await request(serviceUrl)
        .post(`/signup`)
       
        .send({
            "username": username,
            "password": password
          })
        .expect(200);
    
        expect(await response.statusCode).toBe(200)
    });
  });

  describe("Sign up unahppy flows", () => {
    test("sign Up with an empty username", async () => {
        const username=''
        const password=faker.internet.password();
      const response = await request(serviceUrl)
        .post(`/signup`)
        .set("content-type", "application/JSON")
        .send({
            "username": username,
            "password": password
          })
        .expect(500);

     expect(await response.text).toContain('The server encountered an internal error and was unable to complete your request. Either the server is overloaded or there is an error in the application')
    });


  /* incorrect error code & response
  */

  test("sign Up with an empty password", async () => {
    const username=faker.name.findName()
    const password=''
  const response = await request(serviceUrl)
    .post(`/signup`)
    .set("content-type", "application/JSON")
    .send({
        "username": username,
        "password": password
      })
    .expect(200);
    });
});


test("sign Up with an empty body ", async () => {
    const username=''
    const password=''
  const response = await request(serviceUrl)
    .post(`/signup`)
    .set("content-type", "application/JSON")
    .send({
        "username": username,
        "password": password
      })
    .expect(500);

 expect(response.text).toContain('The server encountered an internal error and was unable to complete your request. Either the server is overloaded or there is an error in the application.')
});

});