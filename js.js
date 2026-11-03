// Seleccionar elementos
const formulario = document.querySelector('#formulario-registro')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const confirmarInput = document.querySelector('#confirmar-password')
const btnEnviar = document.querySelector('#btn-enviar')

// Elementos de error
const errorEmail = document.querySelector('#error-email')
const errorPassword = document.querySelector('#error-password')
const errorConfirmar = document.querySelector('#error-confirmar')

// Estado de validación
let validacion = {
  email: false,
  password: false,
  confirmar: false
}

// Función para actualizar el botón de envío
function actualizarBotonEnvio() {
  const todoValido = Object.values(validacion).every(valido => valido)
  btnEnviar.disabled = !todoValido
}

// Validar email
emailInput.addEventListener('input', () => {
  const email = emailInput.value
  const esValido = email.includes('@') && email.includes('.')
  
  if (email.length === 0) {
    errorEmail.textContent = ''
    validacion.email = false
  } else if (esValido) {
    errorEmail.textContent = ''
    errorEmail.style.color = 'green'
    errorEmail.textContent = '✓ Email válido'
    validacion.email = true
  } else {
    errorEmail.style.color = 'red'
    errorEmail.textContent = '✗ Email no válido'
    validacion.email = false
  }
  
  actualizarBotonEnvio()
})

// Validar contraseña
passwordInput.addEventListener('input', () => {
  const password = passwordInput.value
  const esValida = password.length >= 6
  
  if (password.length === 0) {
    errorPassword.textContent = ''
    validacion.password = false
  } else if (esValida) {
    errorPassword.style.color = 'green'
    errorPassword.textContent = '✓ Contraseña válida'
    validacion.password = true
  } else {
    errorPassword.style.color = 'red'
    errorPassword.textContent = '✗ Mínimo 6 caracteres'
    validacion.password = false
  }
  
  // Re-validar confirmación si ya tiene contenido
  if (confirmarInput.value.length > 0) {
    confirmarInput.dispatchEvent(new Event('input'))
  }
  
  actualizarBotonEnvio()
})

// Validar confirmación de contraseña
confirmarInput.addEventListener('input', () => {
  const confirmar = confirmarInput.value
  const password = passwordInput.value
  const coinciden = confirmar === password && confirmar.length > 0
  
  if (confirmar.length === 0) {
    errorConfirmar.textContent = ''
    validacion.confirmar = false
  } else if (coinciden) {
    errorConfirmar.style.color = 'green'
    errorConfirmar.textContent = '✓ Contraseñas coinciden'
    validacion.confirmar = true
  } else {
    errorConfirmar.style.color = 'red'
    errorConfirmar.textContent = '✗ Las contraseñas no coinciden'
    validacion.confirmar = false
  }
  
  actualizarBotonEnvio()
})

// Manejar envío del formulario
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault()
  
  console.log('Formulario válido enviado:')
  console.log('Email:', emailInput.value)
  console.log('Password:', passwordInput.value)
  
  // Aquí harías la petición al servidor
  alert('¡Registro exitoso!')
})



// Seleccionar elementos
const imagenGrande = document.querySelector('#imagen-grande')
const miniaturas = document.querySelectorAll('.miniatura')
const btnAnterior = document.querySelector('#anterior')
const btnSiguiente = document.querySelector('#siguiente')

let imagenActual = 0

// Función para cambiar imagen
function cambiarImagen(indice) {
  // Actualizar imagen grande
  imagenGrande.src = miniaturas[indice].dataset.src
  imagenGrande.alt = miniaturas[indice].alt
  
  // Actualizar clases activas
  miniaturas.forEach(mini => mini.classList.remove('activa'))
  miniaturas[indice].classList.add('activa')
  
  // Actualizar índice actual
  imagenActual = indice
}

// Event listeners para miniaturas
miniaturas.forEach((miniatura, indice) => {
  miniatura.addEventListener('click', () => {
    cambiarImagen(indice)
  })
  
  // Efecto hover
  miniatura.addEventListener('mouseenter', () => {
    miniatura.style.opacity = '0.7'
  })
  
  miniatura.addEventListener('mouseleave', () => {
    miniatura.style.opacity = '1'
  })
})

// Botones de navegación
btnAnterior.addEventListener('click', () => {
  const nuevoIndice = imagenActual === 0 ? miniaturas.length - 1 : imagenActual - 1
  cambiarImagen(nuevoIndice)
})

btnSiguiente.addEventListener('click', () => {
  const nuevoIndice = imagenActual === miniaturas.length - 1 ? 0 : imagenActual + 1
  cambiarImagen(nuevoIndice)
})

// Navegación con teclado
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'ArrowLeft') {
    btnAnterior.click()
  } else if (evento.key === 'ArrowRight') {
    btnSiguiente.click()
  }
})