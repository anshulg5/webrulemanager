const url = "http://localhost:8070/rulemanager/add";

function submitForm() {
    const params = {
        id: document.getElementById("id"),
        rule: document.getElementById("rule")
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        console.log(this.readyState)
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = "successful";
        }
        if (this.readyState == 4 && this.status == 400) {
            document.getElementById("demo").innerHTML = "bad request";
        }
    };

    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = `id=${params.id.value}&rule=${params.rule.value}`;
    xhttp.send(data);
}

function myFunc() {
    alert("here we are!")
}

function myFunc2() {
    document.getElementById('paragraph').style.display = 'none';
}