database.ref("/").on("value", function(snapshot) {
    whole = snapshot.val();
    sortiment = whole.sortiment;
    if (whole.hoste[getParam("customer")]) {
        customer = whole.hoste[getParam("customer")];
        sortimentArray = [];
        priceTotal = 0;
        console.log(sortiment, customer);
        for (var id in customer.sortiment) {
            if (id != "example") {
                var elem = {
                    amount: customer.sortiment[id],
                    id: id
                };
                sortimentArray.push(elem);
            }
        }
        document.getElementById("sortiment").querySelector(".mdc-data-table__content").innerHTML = "";
        sortimentArray.forEach(function(elem) {
            if (sortiment[elem.id]) {
                document.getElementById("sortiment").querySelector(".mdc-data-table__content").innerHTML += `
                    <tr class="mdc-data-table__row">
                        <th class="mdc-data-table__cell">${sortiment[elem.id].name}</th>
                        <th class="mdc-data-table__cell clickable" onclick="changeAmount('${elem.id}')">${elem.amount}</th>
                        <th class="mdc-data-table__cell">${sortiment[elem.id].price}kč</th>
                        <th class="mdc-data-table__cell">${sortiment[elem.id].price * elem.amount}kč</th>
                    </tr>
                `;
            } else {
                document.getElementById("sortiment").querySelector(".mdc-data-table__content").innerHTML += `
                    <tr class="mdc-data-table__row">
                        <th class="mdc-data-table__cell">[smazaný produkt]</th>
                        <th class="mdc-data-table__cell"></th>
                        <th class="mdc-data-table__cell"></th>
                        <th class="mdc-data-table__cell"></th>
                    </tr>
                `;
            }
            priceTotal += sortiment[elem.id].price * elem.amount;
        });
        document.getElementById("price").textContent = priceTotal + "kč";
        document.getElementById("guest-name").textContent = customer.name;
    } else {
        document.getElementById("price").textContent = "";
        document.getElementById("guest-name").textContent = "[neplatné ID]";
    }

});

function changeAmount(id) {
    var newamount = prompt("Zadejte nový počet", customer.sortiment[id]);

    if (newamount == "") {
        return;
    }

    if (newamount == null) {
        return;
    }

    if (parseInt(newamount, 10) == NaN) {
        return;
    }

    database.ref("hoste/" + getParam("customer") + "/sortiment/" + id).set(newamount).then(function() {
        openSnackbar("Odesláno!");
    }).catch(function() {
        openSnackbar("Chyba!");
    });
}