var listName = ""
$("#list").hide()

function Todo(params) {
    let that = this
    this.id = params.id ?? createGuid()
    this.text = params.text
    this.state = params.state

    this.createElement = function() {
        console.log($("#"+that.id).length > 0)
        if($("#"+that.id).length > 0) {

            $("#"+that.id).find(".text").first().html(`${that.text} - ${that.state}`)
            checkComplete()
        } else {
            $("#items").append(generateString())
            $("#"+that.id).find("button").first().click({item: that, event: "complete"}, editTodo)
            checkComplete()
        }
    }

    function generateString() {
        return `<li id='${that.id}' class='todo'>
	 		<span class="text">${that.text} - ${that.state}</span>
			<button>Complete</button>
		</li>`
    }

    function checkComplete() {
        if(that.state == "complete") {

            $("#"+that.id).find(".text").first().html(`<i><strike>${that.text} - ${that.state}</strike></i>`)
            $("#"+that.id).find("button").first().hide()
        }
    }
}

$("#setList").click(() => {
    listName = $("#listName").val()
    $("#items").empty()

    getTodos()

    $("#list").show()
})

$("#createTodo").click(createTodo)

function createTodo() {
    var newTodo = new Todo({text: $('#newTodo').val(), state:"new"})
    $.ajax({
        type: "POST",
        url: '/' + listName,
        data:  JSON.stringify(newTodo),
        contentType: "application/json",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        success: (data) => {
            newTodo.createElement()
        },
        error: (j, m, e) => {
            console.log("fail")
            console.log(e)
        }
    })
}

function getTodos() {
    $.ajax({
        type: "GET",
        url: '/' + listName,
        contentType: "application/json",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        success: (data) => {
            console.log(data)
            data.forEach((i) => {
                var item = new Todo(i)
                item.createElement()
            })
        },
        error: (j, m, e) => {
            console.log("fail")
            console.log(e)
        }
    })
}

function editTodo(event) {
    console.log(event)
    let todo = event.data.item
    todo.state = event.data.event
    $.ajax({
        type: "PUT",
        url: '/' + listName,
        data:  JSON.stringify(todo),
        contentType: "application/json",
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        success: () => {
            todo.createElement()
        },
        error: (j, m, e) => {
            console.log("fail")
            console.log(e)
        }
    })

}

function createGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + S4()).toLowerCase();
}
