class UserFormHandler {
    constructor() {
        this.editingRow = null;
        this.initEventListeners();
        this.addPredefinedUsers();
    }

    initEventListeners() {
        document.getElementById('userForm').addEventListener('submit', (event) => this.handleFormSubmit(event));
        document.getElementById('mostrarUsuario').addEventListener('click', () => this.showUserInfo());
        document.getElementById('modificarUsuario').addEventListener('click', () => this.loadUserToForm());
        document.getElementById('eliminarUsuario').addEventListener('click', () => this.removeUser());
        document.getElementById('search').addEventListener('keyup', () => this.filterUsers());
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const cedula = document.getElementById('cedula').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const imagen = document.getElementById('imagen').files[0];

        if (!/^[A-Za-z\s]+$/.test(nombre)) {
            alert('El nombre solo debe contener letras.');
            return;
        }
        if (!/^[A-Za-z\s]+$/.test(apellido)) {
            alert('El apellido solo debe contener letras');
            return;
        }
        if (!/^[0-9]+$/.test(cedula)) {
            alert('La C.I solo debe contener números.');
            return;
        }
        if (!/^[0-9]+$/.test(telefono)) {
            alert('El teléfono solo debe contener números.');
            return;
        }
        if (!imagen) {
            alert('Por favor, selecciona una imagen.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (this.editingRow) {
                this.updateUserRow(nombre, apellido, cedula, telefono, reader.result);
                this.editingRow = null;
                document.getElementById('userForm').reset();
            } else {
                this.addUserRow(nombre, apellido, cedula, telefono, reader.result);
                document.getElementById('userForm').reset();
            }
        };
        reader.readAsDataURL(imagen);
    }

    updateUserRow(nombre, apellido, cedula, telefono, imagenSrc) {
        this.editingRow.cells[1].innerText = nombre;
        this.editingRow.cells[2].innerText = apellido;
        this.editingRow.cells[3].innerText = cedula;
        this.editingRow.cells[4].innerText = telefono;
        this.editingRow.cells[5].querySelector('img').src = imagenSrc;
    }

    addUserRow(nombre, apellido, cedula, telefono, imagenSrc) {
        const userTableBody = document.getElementById('userTableBody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="radio" name="selectUser"></td>
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${cedula}</td>
            <td>${telefono}</td>
            <td><img src="${imagenSrc}" alt="${nombre} ${apellido}" width="50"></td>
        `;
        userTableBody.appendChild(newRow);
    }

    showUserInfo() {
        const selectedUser = document.querySelector('input[name="selectUser"]:checked');
        if (selectedUser) {
            const userRow = selectedUser.parentElement.parentElement;
            const nombre = userRow.cells[1].innerText;
            const apellido = userRow.cells[2].innerText;
            const cedula = userRow.cells[3].innerText;
            const telefono = userRow.cells[4].innerText;

            const userInfo = document.getElementById('userInfo');
            userInfo.innerHTML = `
                <p>Asociado: Si.</p>
                <p>Medicamentos a tomar: Perirfar 600.</p>
                <p>Nombre del paciente: ${nombre}</p>
                <p>Apellido del paciente: ${apellido}</p>
                <p>C.I (cédula): ${cedula}</p>
                <p>Teléfono personal: ${telefono}</p>
            `;
            document.querySelector('.user-info').classList.remove('hidden');
        } else {
            alert('Por favor, selecciona un usuario.');
        }
    }

    loadUserToForm() {
        const selectedUser = document.querySelector('input[name="selectUser"]:checked');
        if (selectedUser) {
            this.editingRow = selectedUser.parentElement.parentElement;
            const nombre = this.editingRow.cells[1].innerText;
            const apellido = this.editingRow.cells[2].innerText;
            const cedula = this.editingRow.cells[3].innerText;
            const telefono = this.editingRow.cells[4].innerText;
            document.getElementById('nombre').value = nombre;
            document.getElementById('apellido').value = apellido;
            document.getElementById('cedula').value = cedula;
            document.getElementById('telefono').value = telefono;
        } else {
            alert('Por favor, selecciona un usuario.');
        }
    }

    removeUser() {
        const selectedUser = document.querySelector('input[name="selectUser"]:checked');
        if (selectedUser) {
            selectedUser.parentElement.parentElement.remove();
            document.getElementById('userInfo').innerHTML = '';
            document.querySelector('.user-info').classList.add('hidden');
        } else {
            alert('Por favor, selecciona un usuario.');
        }
    }

    filterUsers() {
        const searchValue = document.getElementById('search').value.toLowerCase();
        const rows = Array.from(document.querySelectorAll('#userTableBody tr'));

        rows.forEach(row => {
            const nombre = row.cells[1].innerText.toLowerCase();
            row.style.display = nombre.includes(searchValue) ? '' : 'none';
        });
    }

    addPredefinedUsers() {
        const predefinedUsers = [
            { nombre: 'Elena', apellido: 'Silveira', cedula: '12345678', telefono: '098765432', imagen: './img/user1.jpg' },
            { nombre: 'José', apellido: 'Gómez', cedula: '87654321', telefono: '099534812', imagen: './img/user2.jpg' },
            { nombre: 'Ana', apellido: 'Pauls', cedula: '56781234', telefono: '098172311', imagen: './img/user3.jpg' },
            { nombre: 'Ricardo', apellido: 'Dominguez', cedula: '23456789', telefono: '092632993', imagen: './img/user4.jpg' },
            { nombre: 'Pedro', apellido: 'Hernandez', cedula: '34567812', telefono: '091651712', imagen: './img/user5.jpg' },
            { nombre: 'Sofia', apellido: 'Rodriguez', cedula: '45678123', telefono: '099870840', imagen: './img/user6.jpg' },
        ];

        predefinedUsers.forEach(user => {
            this.addUserRow(user.nombre, user.apellido, user.cedula, user.telefono, user.imagen);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UserFormHandler();
});
