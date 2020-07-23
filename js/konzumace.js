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
        <th class="mdc-data-table__cell clickable" onclick="location.href = '/dashboard/konzumace-view.html?customer=${elem.id}'">${elem.name}</th>
        
    </tr>`;
    });
    document.getElementById("guests").querySelector(".mdc-data-table__content").innerHTML = html;
    refreshRipples();
});