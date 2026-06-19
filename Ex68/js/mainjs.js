function load_cds() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "datasets/cd_catalog.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            render_cds(xhr.responseXML);
        }
    };
    xhr.send();
}

function render_cds(xmlDoc) {
    var cds = xmlDoc.getElementsByTagName("CD");
    var body = document.getElementById("cdBody");
    var html = "";

    for (var i = 0; i < cds.length; i++) {
        html += "<tr>" +
            "<td>" + text(cds[i], "ARTIST") + "</td>" +
            "<td>" + text(cds[i], "TITLE") + "</td>" +
            "</tr>";
    }

    body.innerHTML = html;
    document.getElementById("cdTable").style.display = "table";
}

function text(parent, tagName) {
    var tag = parent.getElementsByTagName(tagName)[0];
    return tag ? tag.textContent.trim() : "";
}
