let newGuestNameField = new mdc.textField.MDCTextField(document.getElementById("new-name"));

guestsRef.on("value", function(snapshot) {
    guests = snapshot.val();
    guestsArray = [];
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
    console.log(guests);
    var html = "";
    guestsArray.forEach(function(elem) {
        html += `<tr class="mdc-data-table__row">
        <th class="mdc-data-table__cell clickable" onclick="renameGuestPrompt('${elem.id}')">${elem.name}</th>
        
    </tr>`;
    });
    document.getElementById("guests").querySelector(".mdc-data-table__content").innerHTML = html;
    refreshRipples();
});

function addGuest(name) {
    var id = makeid(10);
    if (!guests[id]) {
        database.ref("hoste/" + id).set({
            name,
            sortiment: {
                example: 0
            }
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

function submitGuest() {
    var name = newGuestNameField.value;
    if (name) {
        addGuest(name);
        newGuestNameField.value = "";
    }
    return false;
}

function renameGuestPrompt(id) {
    var newname = prompt("Zadejte nové jméno", guests[id].name);
    if (newname == "") {
        if (confirm("Chcete hosta smazat?")) {
            deleteGuest(id);
        } else {

        }
        return;
    }

    if (newname == null) {
        return;
    }

    renameGuest(id, newname);

}

function renameGuest(id, newname) {
    database.ref("hoste/" + id).set({
        name: newname
    }).then(function() {
        openSnackbar("Odesláno!");
    }).catch(function() {
        openSnackbar("Chyba!");
    });
}

function deleteGuest(id) {
    database.ref("hoste/" + id).set({}).then(function() {
        openSnackbar("Odesláno!");
    }).catch(function() {
        openSnackbar("Chyba!");
    });
}