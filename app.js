// Calling all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./DB/connection");
const path = require("path");
const multer = require("multer");
const File = require("./model/fileSchema");
const app = express();
connectDB();
const Port = process.env.Port || 5000;
app.listen(Port, () => console.log("Server started"))

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});
// Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
        cb(null, true);
    } else {
        cb(new Error("Not a PDF File!!"), false);
    }
};
//Calling the "multer" Function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
// Stuff to be added later
// console.log(req.file)
app.get("/api/getFiles", async(req, res) => {
    try {
        const files = await File.find();
        res.status(200).json({
            status: "success",
            files,
        });
    } catch (error) {
        res.json({
            status: "Fail",
            error,
        });
    }
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));


// Configurations for "body-parser"
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use("/", (req, res) => {
    res.status(200).render("index");
});

//API Endpoint for uploading file
app.post("/api/uploadFile", upload.single("myFile"), (req, res) => {
    // Stuff to be added later
    console.log(req.file);
});


// Configurations for setting up ejs engine &
// displaying static files from "public" folder
// TO BE ADDED LATER

// Routes will be added here later on

//Express server
module.exports = app;