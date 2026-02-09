const form = document.getElementById("formKegiatan");
const namaInput = document.getElementById("nama");
const deskripsiInput = document.getElementById("deskripsi");
const tanggalInput = document.getElementById("tanggal");
const todoList = document.getElementById("todolist");
let indexEdit = null;
let todos = JSON.parse(localStorage.getItem("todos")) || [];

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = namaInput.value.trim();
    const deskripsi = deskripsiInput.value.trim();
    const tanggal = tanggalInput.value;

    if (nama === "" || deskripsi === "" || tanggal === "") {
        alert("Semua field wajib diisi!");
        return;
    }

    const todoBaru = {
        nama,
        deskripsi,
        tanggal,
        selesai: false
    };

    if (indexEdit !== null) {
        todos [indexEdit] = todoBaru;
        indexEdit = null;
    } else {
        todos.push (todoBaru);
    }

    localStorage.setItem("todos", JSON.stringify(todos));

    form.reset();
    tampilkanTodo();
});

function tampilkanTodo() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const div = document.createElement("div");
        div.className = "todo-item";

        if (todo.selesai) {
            div.classList.add("selesai");
        }

        div.innerHTML = `
            <div class="todo-row">
                <input 
                    type="checkbox"
                    ${todo.selesai ? "checked" : ""}
                    onchange="ubahStatus(${index})"
                >

                <div class="todo-text">
                    <strong>${todo.nama}</strong>
                    <p>${todo.deskripsi}</p>
                    <small>${todo.tanggal}</small>
                </div>
            </div>

            <button onclick="hapusKegiatan(${index})">Hapus</button>
            <button onclick="editKegiatan(${index})">Edit</button>
        `;

        todoList.appendChild(div);
    });
}

function hapusKegiatan(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    tampilkanTodo();
}

function ubahStatus(index) {
    todos[index].selesai = !todos[index].selesai;
    localStorage.setItem("todos", JSON.stringify(todos));
    tampilkanTodo();
}

function editKegiatan(index) {
    const data = todos [index];

    namaInput.value = data.nama;
    deskripsiInput.value = data.deskripsi;
    tanggalInput.value = data.tanggal;

    indexEdit = index;
}


