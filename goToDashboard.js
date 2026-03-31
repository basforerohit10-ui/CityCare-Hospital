
function goToDashboard() {
  if (localStorage.getItem('receptionistLoggedIn') === 'true') {
    window.location.href = 'receptionist_dashboard.html';
  } else if (localStorage.getItem('doctorLoggedIn') === 'true') {
    window.location.href = 'doctor_login.html#dashboardSection';
  } else {
    window.location.href = 'home.html';
  }
}

