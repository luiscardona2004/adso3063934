const images = [
    "img/img_carrera.png",
    "img/img_carrea2.jpg",
    "img/img_carrera3.jpg"
];

let index = 0;

const slideImage = document.getElementById("slideImage");
const dots = document.querySelectorAll(".slider-dots .dot");
const next = document.querySelector(".right");
const prev = document.querySelector(".left");

function updateSlide() {
    slideImage.classList.add("animate");

    setTimeout(() => {
        slideImage.src = images[index];
        slideImage.classList.remove("animate");
    }, 300);

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

next.addEventListener("click", () => {
    index = (index + 1) % images.length;
    updateSlide();
});

prev.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    updateSlide();
});

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none";
        document.body.classList.remove("loading");
    }, 3000);
});


// ---------------------------------------------



/* =============================================
   nav.js
   - Marca automáticamente el ítem activo del
     nav según la página actual (no necesitas
     poner .active a mano en cada HTML).
   - Agrega el efecto hover con clase CSS.
============================================= */

(function () {
    const links = document.querySelectorAll('.bottom_nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
        const href = link.getAttribute('href');

        // Activo automático
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Ripple suave al tap en móvil
        link.addEventListener('click', function (e) {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
})();



// ---------------------------------------------

/* =============================================
   characters.js
   - Filtro por categoría (ALL / RACERS / etc.)
   - Toggle de favoritos (♡ / ♥)
============================================= */

// --- FILTRO ---
const filterBtns = document.querySelectorAll('.filter_btn');
const charItems = document.querySelectorAll('.char_item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Activo visual del botón
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        charItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// --- FAVORITOS ---
const favBtns = document.querySelectorAll('.char_fav');

favBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const isFav = btn.classList.toggle('favorited');
        btn.textContent = isFav ? '♥' : '♡';
    });
});

/* =========================
   characters.js
   CRUD completo — Cars App
========================= */

// ── Estado ───────────────────────────────────────────────────
let chars = [
    { id:1, name:'LIGHTNING MCQUEEN', role:'Piston Cup Champion',        number:'#95', category:'racers',  speed:8, skill:7, img:'img/mcqueen.jpg' },
    { id:2, name:'SALLY CARRERA',     role:'Radiator Springs Lawyer',    number:'#01', category:'friends', speed:5, skill:6, img:'img/sally.jpg'   },
    { id:3, name:'DOC HUDSON',        role:'The Fabulous Hudson Hornet', number:'#51', category:'friends', speed:9, skill:10,img:'img/doc.jpg'     },
];
let nextId     = 4;
let editingId  = null;
let deletingId = null;
let activeFilter = 'all';

// ── DOM ──────────────────────────────────────────────────────
const list        = document.getElementById('charsList');
const btnAdd      = document.getElementById('btnAddChar');

const modalForm   = document.getElementById('modalForm');
const formTitle   = document.getElementById('modalFormTitle');
const inpName     = document.getElementById('inpName');
const inpRole     = document.getElementById('inpRole');
const inpNumber   = document.getElementById('inpNumber');
const inpCat      = document.getElementById('inpCategory');
const inpSpeed    = document.getElementById('inpSpeed');
const inpSkill    = document.getElementById('inpSkill');
const btnFCancel  = document.getElementById('btnFormCancel');
const btnFSave    = document.getElementById('btnFormSave');

const modalDel    = document.getElementById('modalDelete');
const btnDCancel  = document.getElementById('btnDelCancel');
const btnDConfirm = document.getElementById('btnDelConfirm');

const modalView   = document.getElementById('modalView');
const viewImg     = document.getElementById('viewImg');
const viewNumber  = document.getElementById('viewNumber');
const viewCat     = document.getElementById('viewCategory');
const viewName    = document.getElementById('viewName');
const viewRole    = document.getElementById('viewRole');
const viewSpBar   = document.getElementById('viewSpeedBar');
const viewSpVal   = document.getElementById('viewSpeedVal');
const viewSkBar   = document.getElementById('viewSkillBar');
const viewSkVal   = document.getElementById('viewSkillVal');
const btnVClose   = document.getElementById('btnViewClose');

// ── Helpers ──────────────────────────────────────────────────
function blocks(n, total = 10) {
    const filled = Math.round(n);
    return '█'.repeat(filled) + '░'.repeat(total - filled);
}
function catLabel(c) {
    return { racers:'RACER', friends:'FRIEND', rivals:'RIVAL' }[c] || c.toUpperCase();
}
function defaultImg() { return 'img/mcqueen.jpg'; }

// ── Render ───────────────────────────────────────────────────
function render() {
    list.innerHTML = '';
    const filtered = activeFilter === 'all'
        ? chars
        : chars.filter(c => c.category === activeFilter);

    if (!filtered.length) {
        list.innerHTML = '<p style="color:#555;font-size:.7rem;text-align:center;margin-top:20px;">NO RACERS IN THIS CATEGORY YET.</p>';
        return;
    }

    filtered.forEach(ch => {
        const art = document.createElement('article');
        art.className = 'char_item';
        art.dataset.category = ch.category;
        art.dataset.id = ch.id;

        art.innerHTML =
            '<div class="char_main">' +
                '<div class="char_thumb">' +
                    '<img src="' + ch.img + '" alt="' + ch.name + '" onerror="this.src=\'img/mcqueen.jpg\'">' +
                    '<span class="char_number">' + ch.number + '</span>' +
                '</div>' +
                '<div class="char_info">' +
                    '<h3>' + ch.name + '</h3>' +
                    '<p>' + ch.role + '</p>' +
                    '<div class="char_stats">' +
                        '<span class="stat"><b>SPEED</b>' + blocks(ch.speed) + '</span>' +
                        '<span class="stat"><b>SKILL</b>' + blocks(ch.skill) + '</span>' +
                    '</div>' +
                '</div>' +
                '<button class="char_fav' + (ch.fav ? ' fav_on' : '') + '" data-id="' + ch.id + '" aria-label="Favorito">' +
                    (ch.fav ? '♥' : '♡') +
                '</button>' +
            '</div>' +
            '<div class="char_actions">' +
                '<button class="char_btn char_btn--view" data-action="view" data-id="' + ch.id + '">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/></svg>' +
                    'VIEW' +
                '</button>' +
                '<button class="char_btn char_btn--edit" data-action="edit" data-id="' + ch.id + '">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"/></svg>' +
                    'EDIT' +
                '</button>' +
                '<button class="char_btn char_btn--delete" data-action="delete" data-id="' + ch.id + '">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/></svg>' +
                    'REMOVE' +
                '</button>' +
            '</div>';

        list.appendChild(art);
    });

    list.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', handleAction));
    list.querySelectorAll('.char_fav').forEach(btn => btn.addEventListener('click', toggleFav));
}

// ── Acciones ─────────────────────────────────────────────────
function handleAction(e) {
    const action = e.currentTarget.dataset.action;
    const id     = parseInt(e.currentTarget.dataset.id);
    const ch     = chars.find(c => c.id === id);
    if (action === 'view')   openView(ch);
    if (action === 'edit')   openEdit(ch);
    if (action === 'delete') openDelete(id);
}

function toggleFav(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const ch = chars.find(c => c.id === id);
    if (ch) { ch.fav = !ch.fav; render(); }
}

// ── Filtros ──────────────────────────────────────────────────
document.querySelectorAll('.filter_btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter_btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        render();
    });
});

// ── ADD ───────────────────────────────────────────────────────
btnAdd.addEventListener('click', () => {
    editingId = null;
    formTitle.textContent = 'ADD CHARACTER';
    inpName.value = ''; inpRole.value = ''; inpNumber.value = '';
    inpCat.value = 'racers'; inpSpeed.value = ''; inpSkill.value = '';
    modalForm.classList.add('open');
});
btnFCancel.addEventListener('click', () => modalForm.classList.remove('open'));

// ── EDIT ──────────────────────────────────────────────────────
function openEdit(ch) {
    editingId = ch.id;
    formTitle.textContent = 'EDIT CHARACTER';
    inpName.value = ch.name; inpRole.value = ch.role; inpNumber.value = ch.number;
    inpCat.value  = ch.category; inpSpeed.value = ch.speed; inpSkill.value = ch.skill;
    modalForm.classList.add('open');
}

// ── SAVE ──────────────────────────────────────────────────────
btnFSave.addEventListener('click', () => {
    const name   = inpName.value.trim().toUpperCase();
    const role   = inpRole.value.trim();
    const number = inpNumber.value.trim() || '#??';
    const cat    = inpCat.value;
    const speed  = Math.min(10, Math.max(1, parseInt(inpSpeed.value) || 5));
    const skill  = Math.min(10, Math.max(1, parseInt(inpSkill.value) || 5));
    if (!name) { inpName.focus(); return; }

    if (editingId === null) {
        chars.push({ id:nextId++, name, role, number, category:cat, speed, skill, img:defaultImg(), fav:false });
    } else {
        const ch = chars.find(c => c.id === editingId);
        if (ch) Object.assign(ch, { name, role, number, category:cat, speed, skill });
    }
    modalForm.classList.remove('open');
    render();
});

// ── DELETE ────────────────────────────────────────────────────
function openDelete(id) { deletingId = id; modalDel.classList.add('open'); }
btnDCancel.addEventListener('click',  () => modalDel.classList.remove('open'));
btnDConfirm.addEventListener('click', () => {
    chars = chars.filter(c => c.id !== deletingId);
    modalDel.classList.remove('open');
    render();
});

// ── VIEW ──────────────────────────────────────────────────────
function openView(ch) {
    viewImg.src = ch.img; viewImg.alt = ch.name;
    viewNumber.textContent = ch.number;
    viewCat.textContent    = catLabel(ch.category);
    viewName.textContent   = ch.name;
    viewRole.textContent   = ch.role;
    viewSpVal.textContent  = ch.speed;
    viewSkVal.textContent  = ch.skill;
    viewSpBar.style.width  = '0%';
    viewSkBar.style.width  = '0%';
    modalView.classList.add('open');
    requestAnimationFrame(() => setTimeout(() => {
        viewSpBar.style.width = (ch.speed * 10) + '%';
        viewSkBar.style.width = (ch.skill * 10) + '%';
    }, 80));
}
btnVClose.addEventListener('click', () => modalView.classList.remove('open'));

// Cerrar al click fuera
[modalForm, modalDel, modalView].forEach(m =>
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); })
);

// ── Init ──────────────────────────────────────────────────────
render();
