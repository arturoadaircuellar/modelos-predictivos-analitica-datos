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

/* ============================= */
/* Modelo 02: COVID-19 */
/* ============================= */

const covidForm = document.getElementById("covidForm");
const covidResult = document.getElementById("covidResult");

function predictCovidRisk(data) {
  let score = 0;

  if (data.edad >= 65) {
    score += 26;
  } else if (data.edad >= 50) {
    score += 16;
  } else if (data.edad >= 35) {
    score += 8;
  }

  if (data.oxigenacion < 85) {
    score += 32;
  } else if (data.oxigenacion < 90) {
    score += 24;
  } else if (data.oxigenacion < 94) {
    score += 14;
  } else if (data.oxigenacion < 96) {
    score += 6;
  }

  if (data.diagnostico === "moderado") {
    score += 14;
  }

  if (data.diagnostico === "grave") {
    score += 28;
  }

  if (data.respiracion === 1) {
    score += 18;
  }

  if (data.comorbilidad === 1) {
    score += 16;
  }

  score += Math.min(data.intervenciones * 4, 18);

  let level = "";
  let className = "";
  let explanation = "";

  if (score < 25) {
    level = "Riesgo bajo";
    className = "low-risk";
    explanation =
      "El caso muestra condiciones relativamente estables dentro de esta simulación. No se observan múltiples factores acumulados de riesgo.";
  } else if (score < 50) {
    level = "Riesgo moderado";
    className = "medium-risk";
    explanation =
      "El caso presenta algunos factores que requieren atención, como edad, síntomas o condiciones clínicas que elevan el riesgo estimado.";
  } else if (score < 75) {
    level = "Riesgo alto";
    className = "high-risk";
    explanation =
      "El caso acumula varios factores relevantes de riesgo. La simulación lo clasifica como un escenario que requiere mayor prioridad de seguimiento.";
  } else {
    level = "Riesgo crítico";
    className = "critical-risk";
    explanation =
      "El caso concentra condiciones de mayor gravedad dentro de la simulación, especialmente por oxigenación baja, diagnóstico grave o múltiples factores acumulados.";
  }

  const confidence = Math.min(95, Math.max(58, Math.round(58 + score * 0.42)));

  return {
    score,
    level,
    className,
    explanation,
    confidence
  };
}

if (covidForm && covidResult) {
  covidForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      edad: Number(document.getElementById("edadCovid").value),
      oxigenacion: Number(document.getElementById("oxigenacionCovid").value),
      diagnostico: document.getElementById("diagnosticoCovid").value,
      respiracion: Number(document.getElementById("respiracionCovid").value),
      comorbilidad: Number(document.getElementById("comorbilidadCovid").value),
      intervenciones: Number(document.getElementById("intervencionesCovid").value)
    };

    const prediction = predictCovidRisk(data);

    covidResult.classList.remove(
      "low-risk",
      "medium-risk",
      "high-risk",
      "critical-risk"
    );

    covidResult.classList.add(prediction.className);

    covidResult.innerHTML = `
      <span class="dashboard-label">Resultado del simulador</span>
      <h3>${prediction.level}</h3>
      <p>${prediction.explanation}</p>
      <div class="risk-pill">Puntaje estimado: ${prediction.score}/100</div>
      <div class="result-confidence">
        Confianza interpretativa: ${prediction.confidence}%
      </div>
      <p class="risk-detail">
        Este resultado es únicamente una simulación académica y no debe interpretarse como diagnóstico médico.
      </p>
    `;
  });
}

/* ============================= */
/* Modelo 03: Ventas/Inversión */
/* ============================= */

const salesData = [
  { inversion: 10, ventas: 55 },
  { inversion: 18, ventas: 72 },
  { inversion: 25, ventas: 88 },
  { inversion: 32, ventas: 105 },
  { inversion: 40, ventas: 124 },
  { inversion: 48, ventas: 141 }
];

function trainLinearRegression(data) {
  const n = data.length;

  const sumX = data.reduce((sum, item) => sum + item.inversion, 0);
  const sumY = data.reduce((sum, item) => sum + item.ventas, 0);
  const sumXY = data.reduce((sum, item) => sum + item.inversion * item.ventas, 0);
  const sumXX = data.reduce((sum, item) => sum + item.inversion * item.inversion, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const yMean = sumY / n;
  const predictions = data.map((item) => intercept + slope * item.inversion);

  const ssTotal = data.reduce((sum, item) => {
    return sum + Math.pow(item.ventas - yMean, 2);
  }, 0);

  const ssResidual = data.reduce((sum, item, index) => {
    return sum + Math.pow(item.ventas - predictions[index], 2);
  }, 0);

  const r2 = 1 - ssResidual / ssTotal;

  const mae =
    data.reduce((sum, item, index) => {
      return sum + Math.abs(item.ventas - predictions[index]);
    }, 0) / n;

  return {
    slope,
    intercept,
    r2,
    mae,
    predict: (x) => intercept + slope * x
  };
}

const salesModel = trainLinearRegression(salesData);

function renderSalesDashboard() {
  const equation = document.getElementById("salesEquation");
  const r2 = document.getElementById("salesR2");
  const mae = document.getElementById("salesMae");
  const table = document.getElementById("salesDataTable");
  const chart = document.getElementById("salesMiniChart");
  const interpretation = document.getElementById("salesInterpretation");

  if (equation) {
    equation.textContent = `Ventas = ${salesModel.intercept.toFixed(2)} + ${salesModel.slope.toFixed(2)}x`;
  }

  if (r2) {
    r2.textContent = salesModel.r2.toFixed(4);
  }

  if (mae) {
    mae.textContent = salesModel.mae.toFixed(2);
  }

  if (table) {
    table.innerHTML = `
      <div class="table-row table-head">
        <span>Inversión</span>
        <span>Ventas reales</span>
        <span>Ventas estimadas</span>
        <span>Diferencia</span>
      </div>
      ${salesData
        .map((item) => {
          const estimated = salesModel.predict(item.inversion);
          const difference = item.ventas - estimated;

          return `
            <div class="table-row">
              <span>${item.inversion}</span>
              <span>${item.ventas.toFixed(0)}</span>
              <span>${estimated.toFixed(1)}</span>
              <strong>${difference.toFixed(1)}</strong>
            </div>
          `;
        })
        .join("")}
    `;
  }

  if (chart) {
    const minX = Math.min(...salesData.map((item) => item.inversion));
    const maxX = Math.max(...salesData.map((item) => item.inversion));
    const minY = Math.min(...salesData.map((item) => item.ventas));
    const maxY = Math.max(...salesData.map((item) => item.ventas));

    const points = salesData
      .map((item) => {
        const left = 10 + ((item.inversion - minX) / (maxX - minX)) * 80;
        const bottom = 12 + ((item.ventas - minY) / (maxY - minY)) * 76;

        return `
          <span
            class="chart-point"
            style="left: ${left}%; bottom: ${bottom}%;"
            data-label="${item.inversion}, ${item.ventas}">
          </span>
        `;
      })
      .join("");

    chart.insertAdjacentHTML("beforeend", points);
  }

  if (interpretation) {
    interpretation.textContent =
      `Con los datos históricos, el modelo calcula que por cada unidad adicional de inversión publicitaria, las ventas aumentan aproximadamente ${salesModel.slope.toFixed(2)} unidades. El valor R² de ${salesModel.r2.toFixed(4)} indica un ajuste alto para este conjunto de datos.`;
  }
}

renderSalesDashboard();

const salesForm = document.getElementById("salesForm");
const salesResult = document.getElementById("salesResult");

if (salesForm && salesResult) {
  salesForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const investment = Number(document.getElementById("investmentInput").value);
    const estimatedSales = salesModel.predict(investment);

    salesResult.classList.add("sales-result");

    salesResult.innerHTML = `
      <span class="dashboard-label">Resultado del simulador</span>
      <h3>${estimatedSales.toFixed(2)} ventas</h3>
      <p>
        Para una inversión publicitaria de ${investment.toFixed(2)}, el modelo estima aproximadamente
        ${estimatedSales.toFixed(2)} ventas.
      </p>
      <div class="model-formula">
        Fórmula usada: Ventas = ${salesModel.intercept.toFixed(2)} + ${salesModel.slope.toFixed(2)} × inversión
      </div>
      <div class="result-confidence">
        R² del modelo: ${salesModel.r2.toFixed(4)}
      </div>
    `;
  });
}
