// Kiểm tra trạng thái đăng nhập
const users = JSON.parse(localStorage.getItem('users') || '[]');
const currentUser = users.find(user => user.isLoggedIn);

const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');
const logoutLink = document.getElementById('logout-link');

if (currentUser) {
  // Người dùng đã đăng nhập: hiển thị Logout, ẩn Login/Signup
  logoutLink?.classList.remove('hidden');
  loginLink?.classList.add('hidden');
  signupLink?.classList.add('hidden');
} else {
  // Người dùng chưa đăng nhập: hiển thị Login/Signup, ẩn Logout
  loginLink?.classList.remove('hidden');
  signupLink?.classList.remove('hidden');
  logoutLink?.classList.add('hidden');
}

// Xử lý sự kiện Logout
const logoutButton = document.getElementById('logout-button');
logoutButton?.addEventListener('click', (e) => {
  e.preventDefault();
  // Cập nhật trạng thái đăng nhập trong localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const updatedUsers = users.map(user => ({
    ...user,
    isLoggedIn: false
  }));
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  alert('Đã đăng xuất!');
  window.location.href = '/';
});