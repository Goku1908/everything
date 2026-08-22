const authCard = document.getElementById("authCard");
const toast = document.getElementById("toast");

function setMode(mode) {
  const isLogin = mode === "login";
  authCard.classList.add("switching");

  if (isLogin) {
    authCard.classList.add("login-mode");
  } else {
    authCard.classList.remove("login-mode");
  }

  window.setTimeout(() => authCard.classList.remove("switching"), 850);

  const target = isLogin
    ? document.querySelector("#loginForm input")
    : document.querySelector("#signupForm input");

  window.setTimeout(() => target?.focus(), 500);
}

document.querySelectorAll("[data-mode]").forEach(button => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

document.querySelectorAll(".password-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    button.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

document.getElementById("signupForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }
  showToast("Account form submitted — connect your backend here.");
});

document.getElementById("loginForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }
  showToast("Login form submitted — connect your authentication API here.");
});

document.querySelector(".forgot").addEventListener("click", () => {
  showToast("Password recovery can be connected to your backend.");
});

// Custom cursor, matching the subtle pointer visible in the reference.
const cursor = document.getElementById("cursorDot");
window.addEventListener("pointermove", event => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll("button, input, label").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "12px";
    cursor.style.height = "12px";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "8px";
    cursor.style.height = "8px";
  });
});
