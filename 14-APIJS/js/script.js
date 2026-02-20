// ===============================================
// ALL VIEWS
// ===============================================

const views = document.querySelectorAll('main')

// Inicializar vista
if (localStorage.getItem('currentView') != null) {
    showView()
} else {
    localStorage.setItem('currentView', 0)
    showView()
}

// ===============================================
// BUTTONS
// ===============================================

const btnLogout = document.querySelector('.btnLogout')
const btnAdd = document.querySelector('.btnAdd')
const addForm = document.querySelector("#addForm")
const btnBacks = document.querySelectorAll('.btnBack')
const btnCancels = document.querySelectorAll('.btnCancel')
const editForm = document.getElementById("editForm")

// ===============================================
// LOGIN
// ===============================================

const LoginForm = document.querySelector('#loginForm')

LoginForm.addEventListener('submit', async function (e) {
    e.preventDefault()

    try {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const data = await response.json()

        if (response.ok) {

            Swal.fire({
                title: "Success!",
                text: data.message,
                icon: "success"
            })

            localStorage.setItem('authToken', data.token)
            localStorage.setItem('currentView', 1)
            showView()

        } else {

            Swal.fire({
                title: "Error!",
                text: data.message, // 👈 AQUÍ ESTÁ LA CLAVE
                icon: "error"
            })
        }

    } catch (error) {
        console.error(error)
    }
})

// ===============================================
// LOGOUT
// ===============================================

btnLogout.addEventListener('click', async () => {

    const token = localStorage.getItem('authToken')

    await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    localStorage.removeItem('authToken')
    localStorage.setItem('currentView', 0)
    showView()
})


// ===============================================
// SAVE
// ===============================================

editForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const id = localStorage.getItem("editPetId")
    const token = localStorage.getItem("authToken")

    const formData = {
        name: this.name.value,
        breed: this.breed.value,
        kind: this.kind.value,
        weight: this.weight.value,
        age: this.age.value,
        location: this.location.value
    }

    const response = await fetch(`http://127.0.0.1:8000/api/pets/edit/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })

    if (response.ok) {

        Swal.fire("Updated!", "Pet updated successfully", "success")

        localStorage.setItem("currentView", 1)
        showView()
        getPets()
    }
})


// ===============================================
// NAVIGATION BUTTONS
// ===============================================

btnAdd.addEventListener('click', () => {
    localStorage.setItem('currentView', 2)
    showView()
})

btnBacks.forEach(element => {
    element.addEventListener('click', () => {
        localStorage.setItem('currentView', 1)
        showView()
    })
})

btnCancels.forEach(element => {
    element.addEventListener('click', () => {
        localStorage.setItem('currentView', 1)
        showView()
    })
})

// ===============================================
// SHOW VIEW FUNCTION
// ===============================================

function showView() {

    views.forEach(element => {
        element.classList.remove('animateView')
        element.style.display = 'none'
    })

    const current = parseInt(localStorage.getItem('currentView'))

    views[current].classList.add('animateView')
    views[current].style.display = 'block'

    if (current === 1 && localStorage.getItem('authToken')) {
        getPets()
    }
}

// ===============================================
// GET PETS LIST
// ===============================================

async function getPets() {

    const token = localStorage.getItem("authToken");


    const response = await fetch("http://127.0.0.1:8000/api/pets/list", {
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
        }
    });

    const result = await response.json();

    const pets = result.data; // 👈 AQUI ESTA LA CLAVE

    renderPets(pets);

}




// ===============================================
// RENDER PETS
// ===============================================

function renderPets(pets) {

    const petList = document.getElementById("petList");
    petList.innerHTML = "";



    pets.forEach(pet => {

        console.log("Imagen guardada:", pet.image);

        petList.innerHTML += `
            <div class="pet-card">
                <div class="pet-info">
                    <img src="http://127.0.0.1:8000/storage/${pet.image}"
                         onerror="this.src='images/pet1.png'">

                    <div class="pet-text">
                        <h3>${pet.name}</h3>
                        <p>${pet.kind}</p>
                    </div>
                </div>

                <div class="pet-actions">
                    <button class="btnShow" onclick="showPet(${pet.id})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FED671" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg></button>
                    <button class="btnEdit" onclick="editPet(${pet.id})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FED671" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path></svg></button>
                    <button class="btnDelete" onclick="deletePet(${pet.id})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FED671" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg></button>
                </div>
            </div>
        `;
    });
}





// ===============================================
// SHOW SINGLE PET
// ===============================================

async function showPet(id) {

    const token = localStorage.getItem('authToken')

    const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const result = await response.json()
    const pet = result.data

    if (response.ok) {

        const detailSection = document.querySelector(".pet-detail")

        detailSection.innerHTML = `
            <img src="http://127.0.0.1:8000/storage/${pet.image}" 
                 onerror="this.src='images/pet1.png'" 
                 class="pet-image">

            <div class="card">
                <div class="item"><span>Name:</span><p>${pet.name}</p></div>
                <div class="item"><span>Breed:</span><p>${pet.breed}</p></div>
                <div class="item"><span>Kind:</span><p>${pet.kind}</p></div>
                <div class="item"><span>Weight:</span><p>${pet.weight}</p></div>
                <div class="item"><span>Age:</span><p>${pet.age}</p></div>
                <div class="item"><span>Location:</span><p>${pet.location}</p></div>
                <div class="item"><span>Description:</span><p>${pet.description}</p></div>
            </div>
        `

        localStorage.setItem('currentView', 3)
        showView()
    }
}


// ==============================================
// ADD PET
// ==============================================

addForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const token = localStorage.getItem("authToken")

    const formData = new FormData(this) // 👈 IMPORTANTE

    const response = await fetch("http://127.0.0.1:8000/api/pets/store", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        },
        body: formData
    })

    const data = await response.json()

    if (!response.ok) {
        Swal.fire("Error", "Check your fields", "error")
        return
    }

    Swal.fire({
        title: "Success!",
        text: `${data.data.name} has been created successfully 🐾`,
        icon: "success",
        confirmButtonText: "Go to Dashboard"
    }).then(() => {

        addForm.reset()

        localStorage.setItem("currentView", 1)

        showView() // 🔥 ahora sí funcionará bien
    })

})


// ==============================================
// EDIT PET
// ==============================================

async function editPet(id) {

    const token = localStorage.getItem('authToken')

    const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })

    const result = await response.json()
    const pet = result.data

    if (response.ok) {

        // Guardamos ID temporalmente
        localStorage.setItem("editPetId", id)

        // Llenar formulario
        const form = document.getElementById("editForm")

        form.name.value = pet.name
        form.breed.value = pet.breed
        form.kind.value = pet.kind
        form.weight.value = pet.weight
        form.age.value = pet.age
        form.location.value = pet.location

        document.querySelector(".pet-image-edit").src =
            `http://127.0.0.1:8000/storage/${pet.image}`

        localStorage.setItem('currentView', 4)
        showView()
    }
}






// ===============================================
// DELETE PET
// ===============================================

async function deletePet(id) {

    const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This pet will be deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete"
    })

    if (!confirm.isConfirmed) return

    const token = localStorage.getItem('authToken')

    const response = await fetch(`http://127.0.0.1:8000/api/pets/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok) {

        Swal.fire("Deleted!", "Pet removed successfully", "success")

        getPets()
    }
}

