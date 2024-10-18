import express from "express";

const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example POST route
app.post("/api/data", (req, res) => {
  // Access the data sent in the request body
  const { name, age } = req.body;

  // Process the data or save it
  console.log(`Received data: Name - ${name}, Age - ${age}`);

  // Send a response back to the client
  res.status(201).send("Data received and processed");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
