let allTodos = []
document.getElementById("updateBtn").style.display = "none";
function getValue(id) {
    return document.getElementById(id).value;
}

const showToast = (message, type, bg) => {
    Toastify({
        text: message,
        className: type,
        style: {
            background: bg,
        },
    }).showToast();
}

const addTodo = () => {
    let title = getValue("title")
    let location = getValue("location")
    let description = getValue("description")
    title = title.trim()
    location = location.trim()
    description = description.trim()

    if (!title) { return showToast("Please enter a title", "error", "red") }
    if (!location) { return showToast("Please enter a location", "error", "red") }
    if (!description) { return showToast("Please enter a description", "error", "red") }
    let newTodo = {
        title,
        location,
        description,
        id: Math.random().toString(10).slice(2)
    }

    let oldTodos = JSON.parse(localStorage.getItem("todos")) || [];
    oldTodos.unshift(newTodo);

    localStorage.setItem("todos", JSON.stringify(oldTodos));
    showTable()
    showToast("Your todo has been successfully added.", "success", "green")
    document.getElementById("title").value = ""

    document.getElementById("location").value = ""

    document.getElementById("description").value = ""

}


const handleDelete = (item) => {
    let newTodos = allTodos.filter((todo) => {
        return item != todo.id
    })
    localStorage.setItem("todos", JSON.stringify(newTodos))
    showTable()
    showToast("Your todo has been successfully deleted.", "success", "green")
}

const handleUpdate = (id) => {

    let getItem = allTodos.filter(todos => todos.id == id)

    document.getElementById("title").value = getItem[0].title

    document.getElementById("location").value = getItem[0].location

    document.getElementById("description").value = getItem[0].description;

    document.getElementById("updateBtn").style.display = "inline-block";
    document.getElementById("addBtn").style.display = "none";

    document.getElementById("updateBtn").onclick = function () {
        let title = getValue("title");

        let description = getValue("description");
        let location = getValue("location");
        title = title.trim()
        location = location.trim()
        description = description.trim()

        if (!title) { return showToast("Please enter a title", "error", "red") }
        if (!location) { return showToast("Please enter a location", "error", "red") }
        if (!description) { return showToast("Please enter a description", "error", "red") }

        let newTodo = { title, location, description, id: id }


        let oldTodo = allTodos.filter((todo) => {
            return todo.id != newTodo.id
        })
        oldTodo.unshift(newTodo);
        localStorage.setItem("todos", JSON.stringify(oldTodo));
        showTable()
        showToast("Your todo has been successfully Updated.", "success", "green")
        document.getElementById("title").value = ""

        document.getElementById("location").value = ""

        document.getElementById("description").value = ""
        document.getElementById("updateBtn").style.display = "none";
        document.getElementById("addBtn").style.display = "inline-block";
    }
}

const showTable = () => {
    let tableHeader = "<table class='table table-hover'><thead><tr><th>No #</th><th>Title</th><th>Location</th><th>Description</th><th>Actions</th></tr></thead>"

    let todos = JSON.parse(localStorage.getItem("todos"))

    allTodos = todos;

    let mainTable = todos.map((item) => {
        return `<tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.location}</td>
        <td>${item.description}</td>
        <td>
        <button onclick="handleUpdate(${item.id})" class='btn btn-info me-2'><i style="font-size:20px" class="fa text-white">&#xf040;</i></button>
        <button onclick="handleDelete(${item.id})" class="btn btn-danger"><i class='fa fa-trash' style="font-size:20px"></i></button>
        </td>
        </tr>`
    })

    let tableFooter = "</table>"

    document.getElementById("output").innerHTML = tableHeader + mainTable + tableFooter
}

showTable()
