const pantallaActual = document.getElementById('operacion-actual')
const pantallaAnterior = document.getElementById('operacion-anterior')

/*
let numeroActual = '0'

const botonesNumeros = document.querySelectorAll('.boton-numero')

botonesNumeros.forEach(boton => {
  boton.addEventListener('click', () => {
    const numero = boton.dataset.numero

    // Evitar múltiples puntos decimales
    if (numero === '.' && numeroActual.includes('.')) {
      return}
    if (numeroActual === '0' && numero !== '.') {
      numeroActual = numero
    } else {
      numeroActual += numero
    }

    pantallaActual.textContent = numeroActual
    })
})















// Botón clear
document.getElementById('clear').addEventListener('click', () => {
    numeroActual = '0'
    pantallaActual.textContent = numeroActual
    pantallaAnterior.textContent = ''   
})

// Botón para borrar 1 
document.getElementById('delete').addEventListener('click', () => {
    if (numeroActual.length > 1 ){
        //si es mayor que 1 el numero tiene 2 digitos y elimino el ultimo digito, el de la derecha
        numeroActual = numeroActual.slice(0,-1)//si cambio el 1 por el 3 se borran los ultimos 3 de la derecha 
    }else{
        numeroActual = '0'
    }
    pantallaActual.textContent = numeroActual
})
/*

para poder saver que operadores y si ya hay un numero antes de la operacion 
se necesitan 3 cosas mas (el numero anterior, el operador y un booleano que indique si hay que limpiar la pantalla)

para eso podemos cambiar que las funciones esten arribia
y luego que los listen de los eventos esten en la parte inferior del programa 
para que llama a las funciones segun el boton seleccionado en el momento
es decir que va a existir un if en el cual cada rama va a ser una funcion de la calculadora 
agregando que cada boton de funcionalidad sea un condicional y poder hacer mas facil el programa 
para hacer como la cumputadora al recibir la operacion resetea la pantalla actual
y el numero anterior mas la operacion pasan a la pantalla anterior 
quedando la pantalla actual para el 2 "operando" para eso necesitamos un booleano 
*/

let numeroActual = '0'
let numeroAnterior = ''
let operador = null
let debeformatear = false


function ActualizarPantallas(){
  pantallaActual.textContent = numeroActual
  pantallaAnterior.textContent = numeroAnterior
}

function concatenarNumero (numero){
  //para validar si deve formatear
 if (debeformatear) {
  numeroActual = '0'
  debeformatear = false
  }
  //ahora si como antes, solo la validacion del que sea numero valido 
  // Evitar múltiples puntos decimales
  if (numero === '.' && numeroActual.includes('.')) {
    return}
  if (numeroActual === '0' && numero !== '.') {
    numeroActual = numero
  } else {
    numeroActual += numero
  }

  ActualizarPantallas()
}


function selecOperador(op){
  if (operador && !debeformatear) {calcular()}
  operador = op 
  numeroAnterior = numeroActual + ' ' + op
  debeformatear = true
  ActualizarPantallas()
}

function calcular (){
  if (!operador || debeformatear) { return } //no hace falta las llaver pero mas facil para mi je
  const ant = parseFloat(numeroAnterior)
  const act = parseFloat(numeroActual)
  if (isNaN(ant) || isNaN(act)) return //si alguno es nulo/vacio no hace nada
  let resultado
  try{ 
    switch(operador){
      case '+':
        resultado = ant + act
        break
      case '-' :
        resultado = ant - act
        break
      case 'X' :
        resultado = ant * act
        break
      case '/' :
        if ( act ===0 ){
          throw new Error('No se puede dividir por 0, INDETERMINADO');
        }
        resultado = ant / act
        break 
      case '%':
        resultado = (act*ant)/100
        break
      default:
        return
    }
    // Redondear para evitar errores del punto flotante (cuando hay muchos decimales)
    resultado = Math.round((resultado + Number.EPSILON) * 100000000) / 100000000
    //reseteo las variables
    numeroActual = resultado.toString()
    numeroAnterior = ''
    operador = null
    debeformatear = true
    

  }catch (error) {//para manejar algun error de las operacions 
    mostrarError(error.message)
    return
  }
  ActualizarPantallas()
}


function mostrarError(mensaje) {
  displayActual.textContent = 'Error'
  displayAnterior.textContent = mensaje
  setTimeout(() => limpiar(), 2000)
}

function limpiar() {
  numeroActual = '0'
  numeroAnterior = ''
  operador = null
  debeformatear = false
  ActualizarPantallas()
}

// Event listeners
document.querySelectorAll('.boton-numero').forEach(boton => {
  boton.addEventListener('click', () => concatenarNumero(boton.dataset.numero))
})

document.querySelectorAll('.boton-operador').forEach(boton => {
  boton.addEventListener('click', () => selecOperador(boton.dataset.operador))
})

document.getElementById('igual').addEventListener('click', calcular)
document.getElementById('clear').addEventListener('click', limpiar)
document.getElementById('delete').addEventListener('click', () => {
  if (numeroActual.length > 1) {
    numeroActual = numeroActual.slice(0, -1)
  } else {
    numeroActual = '0'
  }
  ActualizarPantallas()
})
/*
//parte final con la seleccion, salteamos la parte de poner una variable 
document.querySelectorAll('.boton-numero').forEach(boton => {
  boton.addEventListener('click', () => {
  concatenarNumero( boton.dataset.numero)
  })
})

document.querySelectorAll('.btn-operador').forEach(boton => {
  boton.addEventListener('click', () => {
    selecOperador(boton.dataset.operador)
  }) 
})
*/
