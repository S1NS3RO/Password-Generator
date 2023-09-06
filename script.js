// Variáveis
const passwordSize = document.querySelector('#password-size')

const lengthBar = document.querySelector('#length-bar')

const btnGerarSenha = document.querySelector('#btn-gerar-senha')

const myPassword = document.querySelector('#myPassword')

const alert1 = document.querySelector('.alert1')

const alert2 = document.querySelector('.alert2')

const btnCopiarSenha = document.querySelector('.copy')

const biIcon = document.querySelector('#icone')

let charSet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&()*+,-./:;<=>?@][^_{|}~`


// Functions
function quantosCaracteres() {
  passwordSize.innerHTML = lengthBar.value

  lengthBar.oninput = function() {
    passwordSize.innerHTML = this.value
    myPassword.value = ''
  }
}

function gerarSenha() {
  btnCopiarSenha.disabled = false
  alert1.classList.add('hide')
  alert2.classList.add('hide')
  biIcon.className = 'bi'
  biIcon.classList.add('bi-clipboard')

  let password = ''
  for (let i = 0; i < lengthBar.value; i++) {
    password += charSet.charAt(Math.floor(Math.random() * charSet.length))
  }
  myPassword.value = password
}

function copyPassword() {
  if (!myPassword.value) {
    btnCopiarSenha.disabled = true
    alert1.classList.remove('hide')
    biIcon.className = 'bi'
    biIcon.classList.add('bi-clipboard-x')
    return
  }

  // Cria um elemento temporário
  const tempInput = document.createElement('input')
  tempInput.setAttribute('type', 'text')
  tempInput.setAttribute('value', myPassword.value)
  document.body.appendChild(tempInput)
  tempInput.select()

  try {
    /* // Simulando uma exceção
    if (Math.random() < 0) {
      throw new Error("Erro simulado durante a cópia.");
    }
    */

    document.execCommand('copy')
    btnCopiarSenha.disabled = true
    biIcon.className = 'bi'
    biIcon.classList.add('bi-clipboard-check')

    setTimeout(() => {
      btnCopiarSenha.disabled = false
      biIcon.className = 'bi'
      biIcon.classList.add('bi-clipboard')
    }, 2000)
    return
  } catch (err) {
    btnCopiarSenha.disabled = true
    alert2.classList.remove('hide')
    biIcon.className = 'bi'
    biIcon.classList.add('bi-clipboard-x')
    return
  } finally {
    // Remove o elemento temporário
    document.body.removeChild(tempInput)
  }
}

// Chamar Funções && Event Listners
quantosCaracteres()

btnGerarSenha.addEventListener('click', gerarSenha)

btnCopiarSenha.addEventListener('click', copyPassword)