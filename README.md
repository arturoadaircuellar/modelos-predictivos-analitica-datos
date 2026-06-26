# Modelos Predictivos – Analítica de Datos

Página web académica desarrollada para integrar y presentar modelos predictivos trabajados durante el curso de Analítica de Datos. El proyecto reúne tres módulos principales: predicción académica de alumnos, estimación de riesgo COVID-19 y predicción de ventas a partir de inversión publicitaria.

## Sitio publicado

La página puede consultarse en:

https://arturoadaircuellar.github.io/modelos-predictivos-analitica-datos/

## Objetivo del proyecto

El objetivo de este proyecto es presentar, de forma visual e interactiva, distintos modelos predictivos aplicados a contextos educativos, clínicos y comerciales. La página permite consultar información general de cada modelo, revisar sus variables principales y probar simuladores predictivos desde el navegador.

## Modelos integrados

### 1. Predicción académica de alumnos

Modelo de clasificación basado en variables académicas para estimar si un alumno tiene mayor probabilidad de aprobar o reprobar.

Variables utilizadas:

* Horas de estudio.
* Porcentaje de asistencia.
* Entrega de tareas.

Salida del modelo:

* Aprobado.
* Reprobado.

### 2. Modelo de mortalidad COVID-19

Módulo demostrativo adaptado para web estática, basado en la lógica de un modelo de clasificación desarrollado en Python. Su propósito es estimar un nivel de riesgo a partir de variables clínicas e intervenciones registradas.

Variables consideradas:

* Edad del paciente.
* Saturación de oxígeno.
* Diagnóstico principal.
* Dificultad respiratoria.
* Comorbilidades.
* Intervenciones registradas.

Salida del modelo:

* Riesgo bajo.
* Riesgo moderado.
* Riesgo alto.
* Riesgo crítico.

Nota: este módulo tiene fines académicos y demostrativos. No representa un sistema clínico real ni sustituye una valoración médica profesional.

### 3. Predicción de ventas por inversión publicitaria

Modelo de regresión lineal simple que analiza la relación entre inversión publicitaria y ventas obtenidas. La fórmula se calcula automáticamente desde los datos históricos y se utiliza para estimar nuevas ventas esperadas.

Variables utilizadas:

* Inversión publicitaria.
* Ventas registradas.

Salida del modelo:

* Ventas estimadas.

## Funcionalidades principales

* Panel principal con acceso a los tres modelos.
* Diseño responsivo para computadora, tablet y celular.
* Estados visuales de los modelos.
* Resumen rápido por cada módulo.
* Simuladores interactivos.
* Cálculo de predicciones desde JavaScript.
* Visualización de métricas, datos históricos e interpretación de resultados.

## Tecnologías utilizadas

* HTML5.
* CSS3.
* JavaScript.
* GitHub Pages.

## Estructura del proyecto

```text
modelos-predictivos-analitica-datos/
│
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Publicación

El sitio fue publicado mediante GitHub Pages, utilizando una página estática construida con HTML, CSS y JavaScript. Esta decisión permite que el proyecto pueda ejecutarse directamente desde el navegador sin necesidad de servidor adicional.

## Datos académicos

**Alumno:** Arturo Adair Cuellar Cervantes
**Institución:** IPN · UPIICSA
**Profesor:** Ing. Andrade Cedillo Marco Fernando
**Proyecto:** Modelos Predictivos – Analítica de Datos

## Descripción general

Este proyecto funciona como una integración final de modelos predictivos desarrollados durante el semestre. La página no solo presenta los modelos de forma informativa, sino que también permite interactuar con ellos mediante formularios y resultados dinámicos. De esta manera, el usuario puede comprender la lógica general de cada modelo y observar cómo las variables de entrada modifican la predicción generada.
