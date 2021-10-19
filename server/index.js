require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require("multer")
const path = require("path");
const auth = require("./middleware/auth");

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/images", express.static(path.join(__dirname, "/images")));



app.use('/api', require("./routes/authRouter"))
app.use('/api', require("./routes/userRouter"))
app.use('/api', require("./routes/postRouter"))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload",upload.single("file"),(req, res) => {
  res.status(200).json("File has been uploaded");
});

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 6400
app.listen(port, () => {
    console.log('Server is running on port', port)
})


// MONGODB_URL="mongodb://localhost:27017/blogv3"

// ACCESS_TOKEN_SECRET = cenxun
// REFRESH_TOKEN_SECRET = zhouenci