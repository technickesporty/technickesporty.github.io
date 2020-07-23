let guestSelect = new mdc.select.MDCSelect(document.getElementById("guest-select")),
    sortimentSelect = new mdc.select.MDCSelect(document.getElementById("sortiment-select")),
    amountTextBox = new mdc.textField.MDCTextField(document.getElementById("amount-select"));

database.ref("/").on("value", function(snapshot) {
    whole = snapshot.val();
    sortiment = whole.sortiment;
    guests = whole.hoste;
    console.log(sortiment);
    var i = 0;
    for (var id in guests) {
        if (id != "example") {
            var elem = guests[id];
            guestsArray[i] = elem;
            guestsArray[i].id = id;
            i++;
        }
    }
    guestsArray = guestsArray.sort(function(a, b) {
        return compareStrings(a.name, b.name);
    });
    document.getElementById("guest-select").querySelector(".mdc-list").innerHTML = `
        <li class="mdc-list-item mdc-list-item--selected" data-value="" aria-selected="true">
            <span class="mdc-list-item__ripple"></span>
        </li>
    `;
    guestsArray.forEach(function(elem) {
        document.getElementById("guest-select").querySelector(".mdc-list").innerHTML += `
        <li class="mdc-list-item" data-value="${elem.id}">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">${elem.name}</span>
        </li>
    `;
    });
    var i = 0;
    for (var id in sortiment) {
        if (id != "example") {
            var elem = sortiment[id];
            sortimentArray[i] = elem;
            sortimentArray[i].id = id;
            i++;
        }
    }
    sortimentArray = sortimentArray.sort(function(a, b) {
        return compareStrings(a.name, b.name);
    });
    document.getElementById("sortiment-select").querySelector(".mdc-list").innerHTML = `
        <li class="mdc-list-item mdc-list-item--selected" data-value="" aria-selected="true">
            <span class="mdc-list-item__ripple"></span>
        </li>
    `;
    sortimentArray.forEach(function(elem) {
        document.getElementById("sortiment-select").querySelector(".mdc-list").innerHTML += `
        <li class="mdc-list-item" data-value="${elem.id}">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">${elem.name}</span>
        </li>
    `;
    });
    console.log(sortimentArray);
    refreshRipples();
});

function submitOrder() {
    var guest = guestSelect.value;
    var product = sortimentSelect.value;
    var amount = parseInt(amountTextBox.value, 10);

    if (guest && product && amount && amount != NaN) {
        addOrder(guest, product, amount);
        guestSelect.value = "";
        sortimentSelect.value = "";
        amountTextBox.value = "1";
    } else {
        openSnackbar("Špatný formát!");
    }

    return false;
}

function addOrder(guestid, productid, amount) {
    var newamount = 0;
    if (guests[guestid].sortiment[productid]) {
        newamount = guests[guestid].sortiment[productid] + amount;
    } else {
        newamount = amount;
    }
    database.ref("hoste/" + guestid + "/sortiment/" + productid).set(newamount).then(function() {
        openSnackbar("Odesláno!");
    }).catch(function() {
        openSnackbar("Chyba!");
    });
}