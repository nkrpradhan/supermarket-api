const app = require("./server.js");

const PORT = process.env.PORT || 9090;
app.listen(PORT, console.log(`server is running on port ${PORT}...`));
