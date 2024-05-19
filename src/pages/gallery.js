import React, { Component } from "react";
import { Modal } from 'bootstrap';
import Card from "../Components/card"

class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            buku: [
                {
                    isbn: "12345", judul: "Matahari", penulis: "Tere Liye",
                    penerbit: "CV Harapan Kita", harga: 90000,
                    cover: "https://drive.usercontent.google.com/download?id=1fgW1LFZqqKUD33UygCv1GUwNgsvkCANh&authuser=0"
                },
                {
                    isbn: "12346", judul: "Hujan", penulis: "Tere Liye",
                    penerbit: "CV Nusa Bangsa", harga: 80000,
                    cover: "https://drive.usercontent.google.com/download?id=1BH9hsP0yEDYMliPWbUe2dVm2Zj0DIlAT&authuser=0"
                },
                {
                    isbn: "54321", judul: "Bumi", penulis: "Tere Liye",
                    penerbit: "CV Nusa Bangsa", harga: 70000,
                    cover: "https://drive.usercontent.google.com/download?id=1DIW8qvYb9AvK7g8WiqLjSgupnP418ZN0&authuser=0"
                },
            ],
            action: "",
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            selectedItem: null,
            modal: null,
            user: "",
            keyword: "",
            filterBuku: [],
        }
    }

    componentDidMount() {
        this.setUser();
        this.setState({ modal: Modal.getOrCreateInstance(document.getElementById('modal_buku')) });
    }

    setUser = () => {
        if (sessionStorage.getItem("user") === null) {
            let promptName = window.prompt("Masukkan Nama Anda", "");
            if (promptName === null || promptName === "") {
                this.setUser();
            } else {
                sessionStorage.setItem("user", promptName);
                this.setState({ user: promptName });
            }
        } else {
            let name = sessionStorage.getItem("user");
            this.setState({ user: name });
        }
    }

    Add = () => {
        this.state.modal.show();
        this.setState({
            isbn: Math.random().toString(36).substring(7),
            judul: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"
        });
    }

    Edit = (item) => {
        this.state.modal.show();
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item
        });
    }

    Save = (event) => {
        event.preventDefault();
        let tempBuku = this.state.buku;

        if (this.state.action === "insert") {
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            });
        } else if (this.state.action === "update") {
            let index = tempBuku.indexOf(this.state.selectedItem);
            tempBuku[index] = {
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            };
        }

        this.setState({ buku: tempBuku });
        this.state.modal.hide();
    }

    Drop = (item) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let tempBuku = this.state.buku;
            let index = tempBuku.indexOf(item);
            tempBuku.splice(index, 1);
            this.setState({ buku: tempBuku });
        }
    }

    searching = (event) => {
        if (event.keyCode === 13) {
            let keyword = this.state.keyword.toLowerCase();
            let tempBuku = this.state.buku;
            let result = tempBuku.filter((item) => {
                return (
                    item.judul.toLowerCase().includes(keyword) ||
                    item.penulis.toLowerCase().includes(keyword) ||
                    item.penerbit.toLowerCase().includes(keyword)
                );
            });
            this.setState({ filterBuku: result });
        }
    }

    render() {
        const bukuToDisplay = this.state.keyword ? this.state.filterBuku : this.state.buku;

        return (
            <div className="container">
                <h4 className="text-info my-2">Nama Pengguna: {this.state.user}</h4>
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                    value={this.state.keyword}
                    onChange={ev => this.setState({ keyword: ev.target.value })}
                    onKeyUp={ev => this.searching(ev)}
                />
                <div className="row">
                    {bukuToDisplay.map((item, index) => (
                        <Card
                            key={item.isbn}
                            judul={item.judul}
                            penulis={item.penulis}
                            penerbit={item.penerbit}
                            harga={item.harga}
                            cover={item.cover}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                        />
                    ))}
                </div>
                <button className="btn btn-success" onClick={() => this.Add()}>Tambah Data</button>
                <div className="modal" id="modal_buku">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">Form Buku</div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Judul Buku
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.judul}
                                        onChange={ev => this.setState({ judul: ev.target.value })}
                                        required />
                                    Penulis Buku
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.penulis}
                                        onChange={ev => this.setState({ penulis: ev.target.value })}
                                        required />
                                    Penerbit Buku
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.penerbit}
                                        onChange={ev => this.setState({ penerbit: ev.target.value })}
                                        required />
                                    Harga Buku
                                    <input type="number" className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={ev => this.setState({ harga: ev.target.value })}
                                        required />
                                    Cover Buku
                                    <input type="url" className="form-control mb-2"
                                        value={this.state.cover}
                                        onChange={ev => this.setState({ cover: ev.target.value })}
                                        required />
                                    <button className="btn btn-info btn-block" type="submit">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Gallery;
