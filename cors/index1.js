//used to do --> npm install cors 

// CORS (Cross-Origin Resource Sharing) is used when your frontend and backend are on 
// different origins (i.e., different domains, ports, or protocols), and you want them to 
// communicate securely.

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors()); // Allow cross-origin requests

app.post("/sum", function (req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({ answer: a + b });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
