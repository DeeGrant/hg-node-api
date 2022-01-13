const express = require("express");
const Todo = require('./todo.js')
const app = express();
const port = 3000;
app.use(express.static('public'))

app.use(express.json())

let todos = {}; //fake DB`

app.get("/:listName", (req, res) => {
    checkList(req.params.listName)
    res.send(todos[req.params.listName])
});

app.post("/:listName", (req, res) => {
    console.log("create", req.body)
    checkList(req.params.listName)
    if (!checkValue(req.params.listName, req.query.id)) todos[req.params.listName].push(new Todo(req.body))
    res.send(req.body)
});

app.put("/:listName", (req, res) => {
    console.log("update", req.body)
    checkList(req.params.listName)

    todos[req.params.listName].forEach((item, index) => {
        if (item.id == req.body.id) {
            //console.log(item)
            todos[req.params.listName][index] = req.body
        }
    })
    res.send(req.body)

})

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