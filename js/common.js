firebase.initializeApp({
    apiKey: "AIzaSyAgNNim2NvgNrxfj34zlIAQjmYG0GIIri4",
    authDomain: "jeseniky-order.firebaseapp.com",
    databaseURL: "https://jeseniky-order.firebaseio.com",
    projectId: "jeseniky-order",
    storageBucket: "jeseniky-order.appspot.com",
    messagingSenderId: "897929436544",
    appId: "1:897929436544:web:d477ca6ae685a91f4a3565"
});

let database = firebase.database(),
    sortimentRef = database.ref("sortiment"),
    guestsRef = database.ref("hoste"),
    sortiment = {},
    sortimentArray = [],
    appBar = new mdc.topAppBar.MDCTopAppBar(document.getElementById("app-bar")),
    appDrawer = new mdc.drawer.MDCDrawer(document.getElementById("app-drawer")),
    whole = {},
    html = "",
    priceTotal = 0,
    guests = {},
    guestsArray = [];


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

    } else {
        location.href = "/";
    }
});

function signout() {
    firebase.auth().signOut().then(function() {
        location.href = "/";
    }).catch(function(error) {
        console.log(error);
    });
}

let snackbar = new mdc.snackbar.MDCSnackbar(document.getElementById("snackbar"));

refreshRipples();

function addCustomer(name) {
    var id = makeid(10);
    if (!customer[id]) {
        database.ref("/people/" + id).set({
            beer: {
                large: 0,
                small: 0
            },
            kofola: {
                large: 0,
                small: 0
            },
            name
        }).then(function() {
            openSnackbar("Odesláno!");
        }).catch(function() {
            openSnackbar("Chyba!");
        });
        return id;
    } else {
        addPerson(name);
    }
}

function refreshRipples() {
    document.querySelectorAll(".mdc-button, .mdc-list-item, .mdc-ripple-surface").forEach(function(elem) {
        new mdc.ripple.MDCRipple(elem);
    });
    document.querySelectorAll(".mdc-icon-button").forEach(function(elem) {
        var ripple = new mdc.ripple.MDCRipple(elem);
        ripple.unbounded = true;
    });
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getParam(param) {
    return new URL(window.location.href).searchParams.get(param);
}

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function openSnackbar(text) {
    document.getElementById("snackbar").querySelector(".mdc-snackbar__label").textContent = text;
    snackbar.open();
}