const navButtons = document.querySelectorAll("[data-section]");
const sections = document.querySelectorAll(".page-section");

function showSection(sectionId) {
  sections.forEach((section) => {
    section.classList.remove("active-section");
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active-section");
  }

  document.querySelectorAll(".nav-link").forEach((button) => {
    button.classList.remove("active");
  });

  document.querySelectorAll(`[data-section="${sectionId}"]`).forEach((button) => {
    if (button.classList.contains("nav-link")) {
      button.classList.add("active");
    }
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sectionId = button.getAttribute("data-section");
    showSection(sectionId);
  });
});
