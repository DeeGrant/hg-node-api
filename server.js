const express = require("express");
const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(express.json())

// fake DB
let todos = {}

app.get(':listName', (req, res) => {
    checkList(todos[req.params.listName])
    res.send(todos[req.params.listName]) // db call
})
app.get("/something", (req, res) => res.send("Testing!"));

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);

function checkList(listName) {
    if (!todos[listName]) todos[listName] = []
}

function checkValue(listName, id) {
    var result = false
    todos[listName].forEach((item, index) => {
        if (item.id == id) {
            result = true
        }
    })

    return result
}