var xmlDoc;
var students_data = [];
var sort_column = "";
var sort_direction = true; // true = ascending, false = descending

function loadXMLData(filepath) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", filepath, true);
	xhr.send();

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			xmlDoc = xhr.responseXML;

			if (xmlDoc == null) {
				alert("Lỗi: Không thể parse file XML");
				return;
			}

			loadStudents();
			renderTable();
		}
	}
}

function loadStudents() {
	students_data = [];

	var tag_students = xmlDoc.getElementsByTagName("student");

	for (var i = 0; i < tag_students.length; i++) {
		var student = {
			id: tag_students[i].getElementsByTagName("id")[0].childNodes[0].nodeValue,
			name: tag_students[i].getElementsByTagName("name")[0].childNodes[0].nodeValue,
			birthday: tag_students[i].getElementsByTagName("birthday")[0].childNodes[0].nodeValue,
			gender: tag_students[i].getElementsByTagName("gender")[0].childNodes[0].nodeValue
		};

		students_data.push(student);
	}
}

function renderTable() {
	var bodystudent = document.getElementById("bodystudent");
	bodystudent.innerHTML = "";

	for (var i = 0; i < students_data.length; i++) {
		var tr = document.createElement("tr");

		tr.style.backgroundColor = "white";

		tr.onmouseover = function () {
			this.style.backgroundColor = "yellow";
		}

		tr.onmouseout = function () {
			this.style.backgroundColor = "white";
		}

		tr.onclick = function () {
			var id = this.childNodes[0].innerHTML;
			showDetail(id);
		}

		var td_id = document.createElement("td");
		td_id.innerHTML = students_data[i].id;

		var td_name = document.createElement("td");
		td_name.innerHTML = students_data[i].name;

		var td_birthday = document.createElement("td");
		td_birthday.innerHTML = students_data[i].birthday;

		var td_gender = document.createElement("td");
		td_gender.innerHTML = students_data[i].gender;

		tr.appendChild(td_id);
		tr.appendChild(td_name);
		tr.appendChild(td_birthday);
		tr.appendChild(td_gender);

		bodystudent.appendChild(tr);
	}
}

function sortColumn(column) {

	if (sort_column == column) {
		// Nếu click cùng column thì đảo hướng sort
		sort_direction = !sort_direction;
	}
	else {
		// Click column khác thì reset direction = ascending
		sort_column = column;
		sort_direction = true;
	}

	// Sort array
	students_data.sort(function (a, b) {

		var val_a = a[column];
		var val_b = b[column];

		// Nếu column là số thì convert thành số
		if (column == "id") {
			val_a = parseInt(val_a);
			val_b = parseInt(val_b);
		}

		if (sort_direction) {
			// Ascending
			if (val_a < val_b) return -1;
			if (val_a > val_b) return 1;
			return 0;
		}
		else {
			// Descending
			if (val_a < val_b) return 1;
			if (val_a > val_b) return -1;
			return 0;
		}
	});

	renderTable();
}

function showDetail(id) {

	var student = null;

	for (var i = 0; i < students_data.length; i++) {
		if (students_data[i].id == id) {
			student = students_data[i];
			break;
		}
	}

	if (student != null) {
		document.getElementById("detail_id").innerHTML = student.id;
		document.getElementById("detail_name").innerHTML = student.name;
		document.getElementById("detail_birthday").innerHTML = student.birthday;
		document.getElementById("detail_gender").innerHTML = student.gender;
	}

	document.getElementById("detail_page").style.display = "block";
}

function backToList() {
	document.getElementById("table_page").style.display = "block";
	document.getElementById("detail_page").style.display = "none";
}
