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

const btnLogout  = document.querySelector('.btnLogout')
const btnAdd     = document.querySelector('.btnAdd')
const btnBacks   = document.querySelectorAll('.btnBack')
const btnCancels = document.querySelectorAll('.btnCancel')

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
                text: "Invalid credentials",
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

    const current = localStorage.getItem('currentView')

    views[current].classList.add('animateView')
    views[current].style.display = 'block'

    // 🔥 Si estamos en Dashboard, cargar mascotas
    if (current == 1 && localStorage.getItem('authToken')) {
        getPets()
    }
}

// ===============================================
// GET PETS LIST
// ===============================================

async function getPets() {

    try {

        const token = localStorage.getItem('authToken')

        const response = await fetch('http://127.0.0.1:8000/api/pets/list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json()

        console.log("Respuesta completa:", data)

        if (!response.ok) {
            console.log("Error en respuesta")
            return
        }

        // 🔥 Detectar automáticamente si es array o viene dentro de objeto
        if (Array.isArray(data)) {
            renderPets(data)
        } else if (Array.isArray(data.pets)) {
            renderPets(data.pets)
        } else if (Array.isArray(data.data)) {
            renderPets(data.data)
        } else {
            console.log("No es un array:", data)
        }

    } catch (error) {
        console.error(error)
    }
}



// ===============================================
// RENDER PETS
// ===============================================

function renderPets(pets) {

    const list = document.getElementById('petList')
    list.innerHTML = ''

    pets.forEach(pet => {

        list.innerHTML += `
            <div class="row">
                <img src="${pet.image ?? 'images/default.png'}" alt="">
                <div class="data">
                    <h3>${pet.name}</h3>
                </div>
                <nav class="actions">
                    <a href="javascript:;" onclick="showPet(${pet.id})">👁</a>
                    <a href="javascript:;" onclick="deletePet(${pet.id})">🗑</a>
                </nav>
            </div>
        `
    })
}

// ===============================================
// SHOW SINGLE PET
// ===============================================

async function showPet(id) {

    try {

        const token = localStorage.getItem('authToken')

        const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const pet = await response.json()

        if (response.ok) {

            console.log(pet)

            // Aquí puedes llenar la vista de detalle
            localStorage.setItem('currentView', 3)
            showView()
        }

    } catch (error) {
        console.error(error)
    }
}

// ===============================================
// DELETE PET
// ===============================================

async function deletePet(id) {

    try {

        const token = localStorage.getItem('authToken')

        const response = await fetch(`http://127.0.0.1:8000/api/pets/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {

            Swal.fire(
                "Deleted!",
                "Pet removed successfully",
                "success"
            )

            getPets()
        }

    } catch (error) {
        console.error(error)
    }
}
