const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let LIST

//creacion de fecha

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday:'long',month:'long',day:'numeric'})

//funcion agregar tarea
function agregarTarea(tarea,id,realizado,eliminado){

    if(eliminado){return}

    const REALIZADO = realizado ?check : uncheck
    const LINE = realizado ?lineThrough : ''

    const elemento =`
                        <li id=elemento>
                        <i class="far ${REALIZADO}" data="realizado" id=${id}></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash or" data="eliminado" id=${id}></i>
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)
}

//Funcion de tarea Realizada

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false : true
}

//Funcion de tarea eliminado

function tareaElimada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
};

botonEnter.addEventListener('click',()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre: tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=''
    id++
    console.log(LIST)
})

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea,id,false,false)
            LIST.push({
                nombre: tarea,
                id:id,
                realizado:false,
                eliminado:false
            })
        }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=''
    id++
    console.log(LIST)
    }
})

lista.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData ==='realizado'){
        tareaRealizada(element)
    }
    else if(elementData ==='eliminado'){
        tareaElimada(element)
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})

//local storage get item

let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else{
    LIST = []
    id = 0
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}