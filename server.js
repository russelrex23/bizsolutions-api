const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const sendEmail = require('./utils/sendEmail');

app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});

app.get("", function (req, res) {
    res.status(200).json({message: "Welcome to Bitsolutions API"});
})

app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

app.post("/api/sendEmail", async function (req, res) {

    try {
        const { email, site } = req.body;
        await sendEmail(email, site);
        res.status(200).json({message: "Email successfully sent!"});
    }
    catch(err) {
        res.status(500).json({message: err});
    }
    
});
