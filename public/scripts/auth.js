document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const signupLink = document.getElementById("signup-link");
  const logoutLink = document.getElementById("logout-link");
  const logoutBtn = document.getElementById("logout-button");
  const userAvatar = document.getElementById("user-avatar");
  const profileImg = document.getElementById("profile-img");

  const token = localStorage.getItem("token");
  const profilePicture = localStorage.getItem("profilePicture");

  const show = (el) => el && (el.style.display = "block");
  const hide = (el) => el && (el.style.display = "none");

  if (token) {
    hide(loginLink);
    hide(signupLink);
    show(logoutLink);
    show(userAvatar);

    if (profilePicture && profileImg) {
      profileImg.src = profilePicture;
    }
  } else {
    show(loginLink);
    show(signupLink);
    hide(logoutLink);
    hide(userAvatar);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("profilePicture");
      window.location.href = "/";
    });
  }
});
