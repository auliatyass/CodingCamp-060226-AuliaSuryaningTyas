const form = document.getElementById("formKegiatan");
const namaInput = document.getElementById("nama");
const deskripsiInput = document.getElementById("deskripsi");
const tanggalInput = document.getElementById("tanggal");
const todoList = document.getElementById("todolist");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

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
        `;

        todoList.appendChild(div);
    });
}

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

    todos.push(todoBaru);
    localStorage.setItem("todos", JSON.stringify(todos));

    form.reset();
    tampilkanTodo();
});

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

tampilkanTodo();
