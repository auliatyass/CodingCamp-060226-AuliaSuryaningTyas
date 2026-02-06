const list = document.getElementById("list");

let data = JSON.parse(localStorage.getItem("kegiatan")) || [];

data.forEach((item, index) => {
    list.innerHTML +=
    <div>
        <h3>${item.nama}</h3>
        <p>${item.deskripsi}</p>
        <small>${item.tanggal}</small>
        <br></br>
        <button oncllick="hapus(${index})">Hapus</button>
    </div>
    
})

function hapus(index) {
    data.splice(index,1);
    localStorage.setItem("kegiatan", JSON.stringify(data));
    location.reload();
}