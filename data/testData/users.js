const bcrypt = require("bcryptjs");

const users = [
  {
    name: "jackie wilson",
    username: "jackie",
    email: "hohoho@gmail.com",
    password: bcrypt.hashSync("Password", 10),
    avatar_url: "google.com",
  },
  {
    name: "john doe",
    username: "johnjohn",
    email: "1234@gmail.com",
    password: bcrypt.hashSync("Password123", 10),
    avatar_url: "hello@google.com",
  },
  {
    name: "mary poppins",
    username: "mary",
    email: "mary@gmail.com",
    password: bcrypt.hashSync("PPpppp", 10),
    avatar_url: "google.com",
  },
];

module.exports = users;
