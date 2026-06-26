const sections = document.querySelectorAll(".page-section");
const navLinks = document.querySelectorAll(".nav-link");
const navigationTriggers = document.querySelectorAll("[data-section]");

let currentSection = "inicio";

function showSection(sectionId) {
  if (!sectionId || sectionId === currentSection) return;

  const targetSection = document.getElementById(sectionId);
  if (!targetSection) return;

  sections.forEach((section) => {
    section.classList.toggle("active-section", section.id === sectionId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === sectionId);
  });

  currentSection = sectionId;

  window.scrollTo(0, 0);
}

navigationTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    showSection(trigger.dataset.section);
  });
});
