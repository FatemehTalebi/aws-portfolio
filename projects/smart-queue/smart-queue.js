const form = document.getElementById("bookingForm");
const messageBox = document.getElementById("message");
const submitButton = document.getElementById("submitButton");

const apiUrl = "https://mx3ytpuhh1.execute-api.ca-central-1.amazonaws.com/dev/bookings";

function showMessage(type, text) {
  messageBox.className = `message ${type}`;
  messageBox.textContent = text;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const bookingData = {
    customerName: document.getElementById("customerName").value.trim(),
    customerEmail: document.getElementById("customerEmail").value.trim(),
    serviceType: document.getElementById("serviceType").value,
    appointmentDate: document.getElementById("appointmentDate").value,
    appointmentTime: document.getElementById("appointmentTime").value
  };

  submitButton.disabled = true;
  submitButton.textContent = "Booking...";
  messageBox.className = "message";
  messageBox.textContent = "";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();

    if (response.status === 201) {
      showMessage("success", "Appointment booked successfully!");
      form.reset();
    } else if (response.status === 409) {
      showMessage("error", "This appointment slot is already booked.");
    } else if (response.status === 400) {
      showMessage("error", "Please fill in all required fields.");
    } else {
      showMessage("error", result.message || "Something went wrong.");
    }
  } catch (error) {
    showMessage("error", "Failed to connect to the server.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Book Appointment";
  }
});