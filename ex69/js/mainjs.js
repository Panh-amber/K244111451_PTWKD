var employees = [];
function load_employees() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "datasets/employees.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var xmlDoc = xhr.responseXML;
            employees = xmlDoc.getElementsByTagName("employee");
            fill_titles();
        }
    };
    xhr.send();
}

function fill_titles() {
    var select = document.getElementById("titleSelect");
    var titles = {};

    for (var i = 0; i < employees.length; i++) {
        var title = employees[i].getAttribute("title");
        titles[title] = true;
    }

    for (var title in titles) {
        var option = document.createElement("option");
        option.value = title;
        option.textContent = title;
        select.appendChild(option);
    }
}

function show_employees_by_title() {
    var select = document.getElementById("titleSelect");
    var title = select.value;
    var body = document.getElementById("employeeBody");
    body.innerHTML = "";

    if (!title) return;

    for (var i = 0; i < employees.length; i++) {
        if (employees[i].getAttribute("title") === title) {
            var tr = document.createElement("tr");
            tr.innerHTML =
                "<td>" + employees[i].getAttribute("id") + "</td>" +
                "<td>" + get_text(employees[i], "name") + "</td>" +
                "<td>" + get_text(employees[i], "phone") + "</td>";
            body.appendChild(tr);
        }
    }
}

function get_text(parent, tagName) {
    return parent.getElementsByTagName(tagName)[0].textContent.trim();
}
