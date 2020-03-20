const urlAdd = "http://localhost:8070/rulemanager/add";
const urlFetch = "http://localhost:8070/rulemanager/fetch";
const urlDelete = "http://localhost:8070/rulemanager/delete";
const urlUpdate = "http://localhost:8070/rulemanager/update";

function submitForm() {
    const params = {
        id: document.getElementById("id"),
        rule: document.getElementById("rule")
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = "successful";
        }
        if (this.readyState == 4 && this.status == 400) {
            document.getElementById("demo").innerHTML = "bad request";
        }
        if (this.readyState == 4 && this.status == 403) {
            document.getElementById("demo").innerHTML = "duplicate rule ID";
        }
    };

    xhttp.open("POST", urlAdd);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = `id=${params.id.value}&rule=${params.rule.value}`;
    xhttp.send(data);
}



function login() {
    const params = {
        username: document.getElementById("username"),
        password: document.getElementById("password")
    };

    // var xhttp = new XMLHttpRequest();

    // xhttp.onreadystatechange = function() {
    //     console.log(this.readyState)
    //     if (this.readyState == 4 && this.status == 200) {
    //         document.getElementById("demo").innerHTML = "successful";
    //     }
    //     if (this.readyState == 4 && this.status == 400) {
    //         document.getElementById("demo").innerHTML = "bad request";
    //     }
    // };

    // xhttp.open("POST", url);
    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // data = `id=${params.id.value}&rule=${params.rule.value}`;
    // xhttp.send(data);

    window.location.href = 'userpage.html';
}


function fetch() {
    var rules;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            rules = xhttp.responseText;
            createTable(JSON.parse(rules));
        }
    };

    xhttp.open("GET", urlFetch);
    xhttp.send();
}

function createTable(rules) {
    console.log(rules);
    var table = document.getElementById("table");
    var tBody = document.createElement("tbody");
    var keyArray = Object.keys(rules);
    // alert(keyArray);
    for (var i = 0; i < keyArray.length; i++) {
        var bRow = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerHTML = keyArray[i];
        var td2 = document.createElement("td");
        td2.innerHTML = rules[keyArray[i]];

        var td3 = document.createElement("td");
        var delButton = document.createElement("button");
        delButton.innerHTML = "Delete";
        delButton.onclick = function() { delRow() };
        td3.appendChild(delButton);

        var td4 = document.createElement("td");
        var updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.onclick = function() {
        const detail = {
                'id': td1.innerHTML,
                'rule': td2.innerHTML
            };
        updateRule(detail);
        };
        td4.appendChild(updateButton);

        bRow.appendChild(td1);
        bRow.appendChild(td2);
        bRow.appendChild(td3);
        bRow.appendChild(td4);
        tBody.appendChild(bRow);
    }
    table.appendChild(tBody);

}

function delRow() {
    var row = event.target.parentNode.parentNode;
    deleteRule(row.cells[0].innerHTML);
    document.getElementById("table").deleteRow(row.rowIndex);
}

function updateRule(detail) {
    window.location.href = 'updateRule.html?id=' + detail.id + "&rule=" + detail.rule;
}

function updateData(){
    var hashParams = window.location.href.split("?"); // substr(1) to remove the `#`
    console.log(hashParams);
    hashParams = hashParams[1].split("&");
    for(var i = 0; i < hashParams.length; i++){
        var p = hashParams[i].split('=');
        document.getElementById(p[0]).value = decodeURIComponent(p[1]);
    }
}

function updateForm() {
    const params = {
        id: document.getElementById("id"),
        rule: document.getElementById("rule")
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = "successful";
        }
        if (this.readyState == 4 && this.status == 400) {
            document.getElementById("demo").innerHTML = "bad request";
        }
        if (this.readyState == 4 && this.status == 403) {
            document.getElementById("demo").innerHTML = "duplicate rule ID";
        }
    };
    xhttp.open("POST", urlUpdate);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = `id=${params.id.value}&rule=${params.rule.value}`;
    xhttp.send(data);
}

function deleteRule(ruleID) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Delete successful")
        }
    };

    xhttp.open("POST", urlDelete);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = `id=${ruleID}`;
    xhttp.send(data);
}
