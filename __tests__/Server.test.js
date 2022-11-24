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
      test("200: should return a single product based on product id", () => {
        return request(app)
          .get("/api/products/637cd257c96d3280fe70db46")
          .expect(200)
          .then(({ body }) => {
            const testProduct = {
              _id: "637cd257c96d3280fe70db46",
              description: "500g",
              name: "Baresa Penne Rigate",
              supermarket: "lidl",
              pictureLink:
                "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/19089/xs/19089_99.jpg",
              siteLink:
                "https://www.lidl.co.uk/p/dried/baresa-penne-rigate/p6334",
              category: "pasta",
              price: " 0.69",
              priceHistory: [],
              reviews: [],
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
          username: "kyler1",
          password: "123456",
        };
        const returnObj = {
          _id: "637cdb954b1753fe4e66b9d9",
          name: "kyler",
          username: "kyler1",
          email: "kyler1ac@gmail.com",
          createdAt: "2022-11-22T14:24:21.510Z",
        };
        return request(app)
          .post("/api/users/login")
          .send(postObj)
          .expect(200)
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
          name: "daniel",
          username: "kyler1",
          email: "kyler1ac@gmail.com",
          password: "123456",
        };
        return request(app)
          .post("/api/users/register")
          .send(postObj)
          .expect(201)
          .then(({ body }) => {
            expect(body.message).toEqual("User created");
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
  describe("/api/users/:username/profile", () => {
    describe("GET", () => {
      const testProfile = {
        _id: "637cd4907d8553b4f0540533",
        name: "justin",
        username: "justin10",
        email: "jherbo10@gmail.com",
        createdAt: "2022-11-22T13:54:24.616Z",
      };
      test("200: should return the user where username input is valid and matches an existing user", () => {
        return request(app)
          .get("/api/users/justin10/profile")
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(testProfile);
          });
      });
      test("404: should return user not found if no user exists for input username", () => {
        return request(app)
          .get("/api/users/banana/profile")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toEqual("User not found");
          });
      });
    });
    describe("PUT", () => {
      const updateObj = {
        email: "tb12@gmail.com",
      };
      test("200: should return user profile with updated details", () => {
        return request(app)
          .put("/api/users/tbgoat/profile")
          .send(updateObj)
          .expect(200)
          .then(({ body }) => {
            expect(body._id).toEqual("637b555ae9dc3ea1ea61f613");
            expect(body.name).toEqual("aaron");
            expect(body.username).toEqual("tbgoat");
            expect(body.email).toEqual("tb12@gmail.com");
          });
      });
      test("404: should return user not found error for input username", () => {
        return request(app)
          .put("/api/users/banana/profile")
          .send(updateObj)
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toEqual("User not found");
          });
      });
    });
  });
});
describe("Shopping List", () => {
  describe("api/shopping-list", () => {
    describe("POST", () => {
      test("201: should post product to a user's shopping list", () => {
        const postObj = {
          username: "tbgoat",
          name: "Medium Loaf WM",
          price: "£2.59",
          pictureLink:
            "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/126479/xs/126479_31.jpg",
          supermarket: "lidl",
        };
        return request(app)
          .post("/api/shopping-list")
          .send(postObj)
          .expect(201)
          .then(({ body }) => {
            expect(body.username).toEqual("tbgoat");
            expect(body.name).toEqual("Medium Loaf WM");
            expect(body.price).toEqual("£2.59");
            expect(body.pictureLink).toEqual(
              "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/126479/xs/126479_31.jpg"
            );
            expect(body.supermarket).toEqual("lidl");
          });
      });
      test("400: should return error if item already exists in the list", () => {
        const postObj = {
          username: "tbgoat",
          name: "Medium Loaf",
          price: "£2.59",
          pictureLink:
            "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/126479/xs/126479_31.jpg",
          supermarket: "lidl",
        };
        return request(app)
          .post("/api/shopping-list")
          .send(postObj)
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toEqual(
              "Item already exists in your shopping list"
            );
          });
      });
    });
  });
  describe("api/shopping-list/:username", () => {
    describe("GET", () => {
      test("200: should ", () => {});
      test("400: should ", () => {});
    });
  });
});
