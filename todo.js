module.exports = class Todo {
    constructor(params) {
        this.id = params.id
        this.text = params.text
        this.state = params.state
    }
}