/*========================Scripts starts here===================================-*/

// Sidebar toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

// Add hovered class in selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => item.classList.remove("hovered"));
  this.classList.add("hovered");
}
list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Logout modal functionality
let logoutLink = document.getElementById("logout-link");
let modal = document.getElementById("logout-modal");
let closeModal = document.getElementsByClassName("close")[0];
let confirmLogout = document.getElementById("confirm-logout");
let cancelLogout = document.getElementById("cancel-logout");

logoutLink.onclick = function (event) {
  event.preventDefault();
  modal.style.display = "block";
};

closeModal.onclick = function () {
  modal.style.display = "none";
};

confirmLogout.onclick = function () {
  // Redirect to the login form
  window.location.href = "LoginForm.html";
};

cancelLogout.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Function to handle form submission
document
  .getElementById("submit-btn")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    // Get user input
    const userInput = document.getElementById("user-input").value.trim();

    // Ensure there is input
    if (userInput === "") {
      alert("Please enter a message.");
      return;
    }

    try {
      // Make a request to OpenAI
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer sk-7dqkIoBBikXB23cOJBI0i3kj378KFX5Mp2EocX5dX8uj7HuB", // Replace with your OpenAI API key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-instruct",
          messages: [{ role: "user", content: userInput }],
          max_tokens: 150,
          temperature: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from OpenAI.");
      }

      const data = await response.json();

      // Display response
      document.getElementById(
        "openai-response"
      ).innerHTML = `<p>${data.choices[0].text.trim()}</p>`;
    } catch (data) {
      console.error("Error:", error);
      alert("Failed to fetch response from OpenAI. Please try again.");
    }
  });
