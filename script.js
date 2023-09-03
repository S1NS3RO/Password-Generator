const passwordSizeSpan = document.querySelector('#password-size-span');
const lengthBar = document.querySelector('#length-bar');
const myPassword = document.querySelector('#myPassword');
const alert1 = document.querySelector('.alert1');
const alert2 = document.querySelector('.alert2');
const btnCopy = document.querySelector('.copy');
const btnCopyOriginal = `Copy <i class="bi bi-clipboard"></i>`;
const btnCopied = `Copied <i class="bi bi-clipboard-check"></i>`;
const btnError = `Error <i class="bi bi-clipboard-x"></i>`;
let charSet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&()*+,-./:;<=>?@][^_{|}~`;
let newPassword = '';

passwordSizeSpan.innerHTML = lengthBar.value;

lengthBar.oninput = function () {
  passwordSizeSpan.innerHTML = this.value;
};

function gerarSenha() {
  alert1.classList.add('hide');
  alert2.classList.add('hide');
  btnCopy.innerHTML = btnCopyOriginal;
  let password = '';

  for (let i = 0, n = charSet.length; i < lengthBar.value; ++i) {
    password += charSet.charAt(Math.floor(Math.random() * n));
  }
  myPassword.value = password;
  newPassword = password;
}

function copyPassword() {
  if (!newPassword) {
    alert1.classList.remove('hide');
    btnCopy.innerHTML = btnError;
    return;
  }

  // Cria e insere um elemento temporário no documento
  const tempInput = document.createElement('input');
  tempInput.setAttribute('type', 'text');
  tempInput.setAttribute('value', newPassword);
  document.body.appendChild(tempInput);
  tempInput.select();

  try {
    /*
    // Simulando uma exceção
        if (Math.random() < 0) {
          throw new Error("Erro simulado durante a cópia.");
        }
     */
    document.execCommand('copy');
    btnCopy.disabled = true;
    btnCopy.innerHTML = btnCopied;
    setTimeout(() => {
      btnCopy.innerHTML = btnCopyOriginal;
      btnCopy.disabled = false;
    }, 2000);

    return;
  } catch (err) {
    btnCopy.disabled = true;
    btnCopy.innerHTML = btnError;
    alert2.classList.remove('hide');
    setTimeout(() => {
      alert2.classList.add('hide');
      btnCopy.innerHTML = btnCopyOriginal;
      btnCopy.disabled = false;
    }, 2000);

    return;
  } finally {
    // Remove o elemento temporário da página
    document.body.removeChild(tempInput);
  }
}
