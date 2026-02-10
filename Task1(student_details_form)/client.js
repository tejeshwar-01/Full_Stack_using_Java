document.getElementById("studentForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const dob = document.getElementById("dob");
  const department = document.getElementById("department");
  const phone = document.getElementById("phone");

  let valid = true;
  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  // Required fields
  [name, email, dob, department, phone].forEach(field => {
    if (!field.value) {
      field.nextElementSibling.textContent = "This field is required";
      valid = false;
    }
  });

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && !emailRegex.test(email.value)) {
    email.nextElementSibling.textContent = "Invalid email format";
    valid = false;
  }

  // DOB not in future
  if (dob.value && new Date(dob.value) > new Date()) {
    dob.nextElementSibling.textContent = "DOB cannot be in the future";
    valid = false;
  }

  if (!valid) return;

  const data = {
    name: name.value,
    email: email.value,
    dob: dob.value,
    department: department.value,
    phone: phone.value
  };

  const res = await fetch("http://localhost:3000/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    document.getElementById("successMsg").textContent = "Registration successful!";
    e.target.reset();
  }
});
