const express = require('express') 
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8002;

app.use('/',require(""));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

