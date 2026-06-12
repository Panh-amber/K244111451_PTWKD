function addNode() {

    let content = document.getElementById("addContent").value.trim();
    let position = parseInt(document.getElementById("addPos").value);

    let ul = document.getElementById("nodeList");
    let items = ul.getElementsByTagName("li");

    if (content === "") {
        alert("Please enter content!");
        return;
    }

    // Chỉ cho phép vị trí từ 1 -> số node + 1
    if (isNaN(position) || position < 1 || position > items.length + 1) {
        alert("Invalid position!");
        return;
    }

    let newNode = document.createElement("li");
    newNode.innerHTML = content;

    // Thêm cuối
    if (position === items.length + 1) {
        ul.appendChild(newNode);
    }
    // Chèn vào giữa
    else {
        ul.insertBefore(newNode, items[position - 1]);
    }
}


function removeNode(){

    let position = parseInt(document.getElementById("removePos").value);

    let ul = document.getElementById("nodeList");
    let items = ul.getElementsByTagName("li");

    if(position < 1 || position > items.length){
        alert("Invalid position");
        return;
    }

    ul.removeChild(items[position - 1]);
}

function modifyNode(){

    let position = parseInt(document.getElementById("modifyPos").value);
    let newContent = document.getElementById("newContent").value;

    let ul = document.getElementById("nodeList");
    let items = ul.getElementsByTagName("li");

    if(position < 1 || position > items.length){
        alert("Invalid position");
        return;
    }

    let newNode = document.createElement("li");
    newNode.textContent = newContent;

    ul.replaceChild(newNode, items[position - 1]);
}