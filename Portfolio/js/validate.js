document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting by default

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        const errors = [];

        if (name.trim() === "") {
            errors.push("Full Name is required.");
        }

        if (email.trim() === "") {
            errors.push("Email is required.");
        } else if (!email.match(emailPattern)) {
            errors.push("Please enter a valid email address.");
        }

        if (message.trim() === "") {
            errors.push("Message is required.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            sendDataToServer(name, email, message);
        }
    });

    function sendDataToServer(name, email, message) {
        fetch("contact.php", {
            method: "POST",
            body: JSON.stringify({ name, email, message }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Message sent successfully!");
                 
                    window.location.href = "thanks.html";
                } else {
                    alert("Message sending failed. Please try again later.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    }
});
