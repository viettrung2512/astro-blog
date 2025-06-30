document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const signupLink = document.getElementById("signup-link");
  const logoutLink = document.getElementById("logout-link");
  const logoutBtn = document.getElementById("logout-button");
  const dropdownLogoutBtn = document.getElementById("dropdown-logout");
  const userDropdown = document.getElementById("user-dropdown");
  const dropdownToggle = document.getElementById("dropdown-toggle");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const profileImg = document.getElementById("profile-img");
  const profileLink = document.getElementById("profile-link");

  const token = localStorage.getItem("token");
  const profilePicture = localStorage.getItem("profilePicture");
  const userId = localStorage.getItem("userId");

  const show = (el) => el && (el.style.display = "block");
  const hide = (el) => el && (el.style.display = "none");

  if (token) {
    hide(loginLink);
    hide(signupLink);
    show(logoutLink);
    show(userDropdown);

    if (profilePicture && profileImg) {
      profileImg.src = profilePicture;
    }

    if (userId && profileLink) {
      profileLink.href = `/profile/${userId}`;
    }
  } else {
    show(loginLink);
    show(signupLink);
    hide(logoutLink);
    hide(userDropdown);
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
  if (dropdownLogoutBtn) dropdownLogoutBtn.addEventListener("click", handleLogout);

  // Toggle dropdown
  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }
});
