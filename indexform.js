  function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
// js/indexform.js
// js/indexform.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".container");
    const inputs = form.querySelectorAll("input");
    const button = form.querySelector("button");

    button.addEventListener("click", (e) => {
        e.preventDefault(); // منع الإرسال الافتراضي

        let allFilled = true;
        let passwordValid = true;
        let phoneValid = true;
        let ageValid = true;

        // إعادة الحالة الطبيعية لكل الحقول
        inputs.forEach(input => {
            input.style.border = "";
        });

        // التحقق من الحقول الفارغة
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                allFilled = false;
                input.style.border = "2px solid red";
            }
        });

        // التحقق من كلمة السر (حروف + أرقام)
        const passwordInput = inputs[4];
        const password = passwordInput.value.trim();
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

        if (!passwordRegex.test(password)) {
            passwordValid = false;
            passwordInput.style.border = "2px solid red";
        }

        // التحقق من رقم الهاتف (أرقام فقط)
        const phoneInput = inputs[2];
        const phone = phoneInput.value.trim();
        const phoneRegex = /^\d+$/;

        if (!phoneRegex.test(phone)) {
            phoneValid = false;
            phoneInput.style.border = "2px solid red";
        }

        // التحقق من العمر (رقمين فقط)
        const ageInput = inputs[3];
        const age = ageInput.value.trim();
        const ageRegex = /^\d{2}$/;

        if (!ageRegex.test(age)) {
            ageValid = false;
            ageInput.style.border = "2px solid red";
        }

        // عرض الرسائل حسب الحالة
        if (!allFilled) {
            alert("Please fill in all fields!");
        } else if (!passwordValid) {
            alert("Password must contain letters and numbers!");
        } else if (!phoneValid) {
            alert("Phone number must contain digits only!");
        } else if (!ageValid) {
            alert("Age must be a 2-digit number!");
        } else {
            alert("Form submitted successfully!");
            // هنا يمكن إرسال البيانات
        }
    });
});


 if (performance.getEntriesByType("navigation")[0].type === "reload") {
        window.location.href = "indexex.html";  
 }