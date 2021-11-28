const signupBtn = document.querySelector('.js-signup')
const loginBtn = document.querySelector('.js-login')
const modal = document.querySelector('.js-modal')
const signup = document.querySelector('.signup')
const login = document.querySelector('.login')
const modalBody = document.querySelector('.js-modal-body')
const modalBack1 = document.querySelector('.js-back-login')
const modalBack2 = document.querySelector('.js-back-signup')
const changetoLogin = document.querySelector('.js-change-login')
const changetoSignUp = document.querySelector('.js-change-signup')

function showFormSignUp() {
    modal.classList.add('open')
    signup.classList.add('open')
}
function showFormLogin() {
    modal.classList.add('open')
    login.classList.add('open')
}
function hideForm() {
    modal.classList.remove('open')
    login.classList.remove('open')
    signup.classList.remove('open')
}
function hideFormLogin() {
    modal.classList.remove('open')
    login.classList.remove('open')
}
function hideFormSignUp() {
    modal.classList.remove('open')
    signup.classList.remove('open')
}
function changetoFormLogin() {
    signup.classList.remove('open')
    login.classList.add('open')
}
function changetoFormSignUp() {
    login.classList.remove('open')
    signup.classList.add('open')
}
changetoLogin.addEventListener('click', changetoFormLogin)
changetoSignUp.addEventListener('click', changetoFormSignUp)
signupBtn.addEventListener('click', showFormSignUp) 
loginBtn.addEventListener('click', showFormLogin) 
modalBack1.addEventListener('click', hideFormLogin)
modalBack2.addEventListener('click', hideFormSignUp)
modal.addEventListener('click', hideForm)
modalBody.addEventListener('click', function(event) {
    event.stopPropagation()
})