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

/* ============================= */
/* Modelo 01: Alumnos */
/* ============================= */

const studentForm = document.getElementById("studentForm");
const studentResult = document.getElementById("studentResult");

function predictStudent(horas, asistencia, tareas) {
  const score =
    (horas / 20) * 0.495 +
    (asistencia / 100) * 0.338 +
    tareas * 0.167;

  const threshold = 0.54;
  const approved = score >= threshold;

  const confidence = Math.min(
    95,
    Math.max(55, Math.round(55 + Math.abs(score - threshold) * 130))
  );

  let explanation = "";

  if (approved) {
    explanation =
      "El perfil presenta condiciones favorables para aprobar, principalmente por la combinación entre estudio, asistencia y cumplimiento de tareas.";
  } else {
    explanation =
      "El perfil presenta riesgo académico. Conviene reforzar horas de estudio, asistencia o entrega de tareas para mejorar la probabilidad de aprobación.";
  }

  return {
    approved,
    confidence,
    explanation
  };
}

if (studentForm && studentResult) {
  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const horas = Number(document.getElementById("horasEstudio").value);
    const asistencia = Number(document.getElementById("asistenciaAlumno").value);
    const tareas = Number(document.getElementById("tareasAlumno").value);

    const prediction = predictStudent(horas, asistencia, tareas);

    studentResult.classList.remove("approved", "failed");
    studentResult.classList.add(prediction.approved ? "approved" : "failed");

    studentResult.innerHTML = `
      <span class="dashboard-label">Resultado del simulador</span>
      <h3>${prediction.approved ? "Aprobado" : "Reprobado"}</h3>
      <p>${prediction.explanation}</p>
      <div class="result-confidence">
        Confianza estimada: ${prediction.confidence}%
      </div>
    `;
  });
}
