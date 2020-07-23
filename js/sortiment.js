let newProductNameField = new mdc.textField.MDCTextField(document.getElementById("new-name")),
    newProductPriceField = new mdc.textField.MDCTextField(document.getElementById("new-price"));

sortimentRef.on("value", function(snapshot) {
    sortiment = snapshot.val();
    sortimentArray = [];
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
    console.log(sortiment);
    var html = "";
    sortimentArray.forEach(function(elem) {
        html += `<tr class="mdc-data-table__row">
        <th class="mdc-data-table__cell clickable" onclick="renameItemPrompt('${elem.id}')">${elem.name}</th>
        <td class="mdc-data-table__cell clickable" onclick="repriceItemPrompt('${elem.id}')">${elem.price}kč</td>
        
    </tr>`;
    });
    document.getElementById("sortiment").querySelector(".mdc-data-table__content").innerHTML = html;
    refreshRipples();
});

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function addItem(name, price) {
    var id = makeid(10);
    if (!sortiment[id]) {
        database.ref("sortiment/" + id).set({
            name,
            price
        }).then(function() {
            openSnackbar("Odesláno!");
        }).catch(function() {
            openSnackbar("Chyba!");
        });
        return id;
    } else {
        addItem(name);
    }
}

function submitItem() {
    var name = newProductNameField.value;
    var price = parseInt(newProductPriceField.value, 10);
    console.log("Name:", name);
    console.log("Price:", price);
    console.log("If statement:", (name && price && price != NaN));
    if (name && price && price != NaN) {
        addItem(name, price);
        newProductNameField.value = "";
        newProductPriceField.value = "";
    }

    return false;
}

function renameItemPrompt(id) {
    var newname = prompt("Zadejte nové jméno", sortiment[id].name);
    if (newname == "") {
        if (confirm("Chcete produkt smazat?\nPokud produkt znovu vytvoříte, nebude automaticky přiřazen k uživatelům!")) {
            deleteItem(id);
        } else {

        }
        return;
    }

    if (newname == null) {
        return;
    }

    renameItem(id, newname);

}

function repriceItemPrompt(id) {
    var newprice = prompt("Zadejte novou cenu", sortiment[id].price);

    if (newprice == "") {
        return;
    }

    if (newprice == null) {
        return;
    }

    if (parseInt(newprice, 10) == NaN) {
        return;
    }

    repriceItem(id, newprice);
}

function repriceItem(id, newprice) {
    database.ref("sortiment/" + id).set({
        name: sortiment[id].name,
        price: newprice
    }).then(function() {
        openSnackbar("Odesláno!");
    }).catch(function() {
        openSnackbar("Chyba!");
    });
}

function renameItem(id, newname) {
    database.ref("sortiment/" + id).set({
        name: newname,
        price: sortiment[id].price
    }).then(function() {
        openSnackbar("Odesláno!");
    }).catch(function() {
        openSnackbar("Chyba!");
    });
}

function deleteItem(id) {
    database.ref("sortiment/" + id).set({}).then(function() {
        openSnackbar("Odesláno!");
    }).catch(function() {
        openSnackbar("Chyba!");
    });
}