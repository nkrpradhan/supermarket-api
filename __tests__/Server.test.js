const request = require("supertest");
const app = require("../server.js");

describe("Products", () => {
  describe("/api/products", () => {
    describe("GET", () => {
      test("200: should return an array of all products", () => {
        return request(app)
          .get("/api/products")
          .expect(200)
          .then(({ body }) => {
            expect(body).toBeInstanceOf(Array);
            expect(body).not.toHaveLength(0);
            body.forEach((product) => {
              expect(product).toHaveProperty("_id", expect.any(String));
              expect(product).toHaveProperty("name", expect.any(String));
              expect(product).toHaveProperty("description", expect.any(String));
              expect(product).toHaveProperty("price", expect.any(String));
              expect(product).toHaveProperty("siteLink", expect.any(String));
              expect(product).toHaveProperty("pictureLink", expect.any(String));
              expect(product).toHaveProperty("category", expect.any(String));
              expect(product).toHaveProperty("supermarket", expect.any(String));
              expect(product).toHaveProperty("reviews", expect.any(Array));
              expect(product).toHaveProperty("priceHistory", expect.any(Array));
            });
          });
      });
      test("404: should return not found if requst path is invalid", () => {
        return request(app)
          .get("/api/product")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toEqual("Not Found - /api/product");
          });
      });
    });
  });
});

describe("Product", () => {
  describe("/api/products/:id", () => {
    describe("GET", () => {
      test("200: should return a single product identified by ID params", () => {
        return request(app)
          .get("/api/products/6378f86989618c9688407496")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            const testProduct = {
              _id: "6378f86989618c9688407496",
              description: "Eggs",
              name: "Woodcote 6 Organic Eggs",
              price: " 1.99",
              siteLink:
                "https://www.lidl.co.uk/p/eggs/woodcote-6-organic-eggs/p6730",
              pictureLink:
                "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/5204282/xs/520…",
              category: "eggs",
              supermarket: "lidl",
              priceHistory: expect.any(Array),
            };
            const product = body;
            expect(product).toBeInstanceOf(Object);
            expect(product).toEqual(testProduct);
          });
      });
      test("404: should return an error message product not found when no product for given id", () => {
        return request(app)
          .get("/api/products/637639c183bc64444c1db768")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toEqual("Product not found");
          });
      });
    });
  });
});

describe("Users", () => {
  describe("/api/users/login", () => {
    describe("POST", () => {
      test("201: should post a user when login details are valid", () => {
        const postObj = {
          email: "hohoho@gmail.com",
          password: "Password",
        };
        const returnObj = {
          _id: "6376370f0380785e17ac9e3c",
          name: "jackie wilson",
          username: "jackie123",
          email: "hohoho@gmail.com",
          createdAt: "2022-11-17T13:28:47.652Z",
        };
        return request(app)
          .post("/api/users/login")
          .send(postObj)
          .expect(201)
          .then(({ body }) => {
            expect(body).toEqual(returnObj);
          });
      });
      test("401: should return invalid email or password error when details not correct", () => {
        const incorrectPostObj = {
          email: "hohoho@gmail.com",
          password: "Pass",
        };
        return request(app)
          .post("/api/users/login")
          .send(incorrectPostObj)
          .expect(401)
          .then(({ body }) => {
            expect(body.message).toEqual("Invalid Email or Password");
          });
      });
    });
  });
  describe("/api/users/register", () => {
    describe("POST", () => {
      test("201: should post a user with email, name, username and password when registered", () => {
        const postObj = {
          name: "aaron",
          email: "ar12@gmail.com",
          username: "tbgoat",
          password: "12345678",
        };
        const returnObj = {
          _id: expect.any(String),
          name: "tom",
          email: "tb12@gmail.com",
          username: "tbgoat",
        };
        return request(app)
          .post("/api/users/register")
          .send(postObj)
          .expect(201)
          .then(({ body }) => {
            expect(body).toEqual(returnObj);
          });
      });
      test("400: should return an error if user already exists by email", () => {
        const postObj = {
          name: "aaron",
          email: "ar12@gmail.com",
          username: "tbgoat",
          password: "12345678",
        };
        return request(app)
          .post("/api/users/register")
          .send(postObj)
          .expect(201)
          .then(({ body }) => {
            expect(body.message).toEqual("Invalid Info Provided");
          });
      });
    });
  });
});
