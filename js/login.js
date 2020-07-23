firebase.initializeApp({
    apiKey: "AIzaSyAgNNim2NvgNrxfj34zlIAQjmYG0GIIri4",
    authDomain: "jeseniky-order.firebaseapp.com",
    databaseURL: "https://jeseniky-order.firebaseio.com",
    projectId: "jeseniky-order",
    storageBucket: "jeseniky-order.appspot.com",
    messagingSenderId: "897929436544",
    appId: "1:897929436544:web:d477ca6ae685a91f4a3565"
});

const emailTextField = new mdc.textField.MDCTextField(document.querySelector(".email")),
    passwordTextField = new mdc.textField.MDCTextField(document.querySelector(".password")),
    loginButtonRipple = new mdc.ripple.MDCRipple(document.querySelector(".submit"));

document.querySelector("body").style.backgroundImage = `url("/bg/${randomBG()}.png")`;

function login() {
    document.querySelector(".error").style.display = "none";
    firebase.auth().signInWithEmailAndPassword(emailTextField.value, passwordTextField.value)
        .catch(function(error) {
            document.querySelector(".error").textContent = error.message;
            document.querySelector(".error").style.display = "block";
        });
    return false;
}

function forgot() {
    document.querySelector(".error").style.display = "none";
    firebase.auth().sendPasswordResetEmail(emailTextField.value).then(function() {
        document.querySelector(".error").textContent = "Email zaslán!";
        document.querySelector(".error").style.display = "block";
    }).catch(function(error) {
        document.querySelector(".error").textContent = error.message;
        document.querySelector(".error").style.display = "block";
    });
}

function randomBG() {
    return Math.floor((Math.random() * 20) + 1);
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        location.href = "/dashboard/";
    }
});