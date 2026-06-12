function load_date_dropdowns() {
    // Load days (1-31)
    var daySelect = document.getElementById("day");
    for (var i = 1; i <= 31; i++) {
        var option = document.createElement("option");
        option.value = (i < 10) ? "0" + i : i;
        option.text = (i < 10) ? "0" + i : i;
        daySelect.appendChild(option);
    }
    daySelect.value = "01";

    // Load months (1-12)
    var monthSelect = document.getElementById("month");
    for (var i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.value = (i < 10) ? "0" + i : i;
        option.text = (i < 10) ? "0" + i : i;
        monthSelect.appendChild(option);
    }
    monthSelect.value = "01";

    // Load years (1970-2024)
    var yearSelect = document.getElementById("year");
    for (var i = 1970; i <= 2024; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        yearSelect.appendChild(option);
    }
    yearSelect.value = "1970";
}

function load_data(members, memberBody) {
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        var tr = create_tr(member);
        memberBody.appendChild(tr);
    }
}

function create_tr(member) {
    var tr = document.createElement("tr");
    
    // Name
    var td_name = document.createElement("td");
    td_name.innerHTML = member.Name;
    tr.appendChild(td_name);
    
    // Email
    var td_email = document.createElement("td");
    td_email.innerHTML = member.Email;
    tr.appendChild(td_email);
    
    // Gender
    var td_gender = document.createElement("td");
    td_gender.innerHTML = member.Gender;
    tr.appendChild(td_gender);
    
    // Birthday
    var td_birthday = document.createElement("td");
    td_birthday.innerHTML = member.Birthday;
    tr.appendChild(td_birthday);
    
    // Hobbies - displayed as comma-separated
    var td_hobbies = document.createElement("td");
    var hobbiesText = member.Hobbies.join(", ");
    td_hobbies.innerHTML = hobbiesText;
    tr.appendChild(td_hobbies);
    
    // Color
    var td_color = document.createElement("td");
    td_color.innerHTML = member.Color;
    tr.appendChild(td_color);

    // Add mouse over/out events
    tr.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "yellow";
    });
    
    tr.addEventListener("mouseleave", function() {
        this.style.backgroundColor = "white";
    });

    return tr;
}

function validate_email(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function register_member() {
    var name = document.getElementById("name").value.trim();
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    var email = document.getElementById("email").value.trim();
    var gender = document.querySelector('input[name="gender"]:checked');
    var color = document.querySelector('input[name="color"]:checked');
    var hobbies = [];

    // Get selected hobbies
    var hobbyCheckboxes = document.querySelectorAll('input[name="hobbies"]:checked');
    hobbyCheckboxes.forEach(function(checkbox) {
        hobbies.push(checkbox.value);
    });

    // Validation
    if (name === "") {
        alert("Name cannot be left blank!");
        document.getElementById("name").focus();
        return;
    }

    if (email === "" || !validate_email(email)) {
        alert("Email is not valid!");
        document.getElementById("email").focus();
        return;
    }

    if (gender === null) {
        alert("Please select a gender!");
        return;
    }

    if (color === null) {
        alert("Please select a color!");
        return;
    }

    // Create member object
    var member = {
        "Name": name,
        "Email": email,
        "Gender": gender.value,
        "Birthday": day + "/" + month + "/" + year,
        "Hobbies": hobbies,
        "Color": color.value
    };

    // Add to table
    var memberBody = document.getElementById("memberBody");
    var tr = create_tr(member);
    memberBody.appendChild(tr);
}
