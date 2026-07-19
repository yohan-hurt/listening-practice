# Listening Practice App

Una aplicación web interactiva diseñada para mejorar la comprensión auditiva (listening) en inglés mediante el uso de clips de video. El usuario debe escuchar frases, transcribirlas y validar sus conocimientos en distintos niveles de dificultad.

## 🚀 ¿Cómo funciona?

La aplicación guía al usuario a través de un proceso estructurado para perfeccionar su oído:

1.  **Selección de Nivel:** Elige entre niveles Principiante (A), Intermedio (B) o Avanzado (C) según tu habilidad actual.
2.  **Escucha Activa:** Los videos se reproducen en bucle para permitir una escucha repetida sin distracciones.
3.  **Transcripción:** Debes escribir la frase exacta que escuchas en el área de texto.
4.  **Validación Inteligente:** 
    *   El sistema ignora errores menores de puntuación y capitalización.
    *   Si fallas, el campo vibrará para indicarte que lo intentes de nuevo.
    *   Si te bloqueas, puedes pedir una **pista** que revelará algunas letras específicas.
5.  **Aprendizaje:** Una vez que aciertes, verás la transcripción correcta y formal para comparar con tu resultado.

## 🛠️ Tecnologías utilizadas

*   **HTML5:** Estructura de la aplicación.
*   **CSS3:** Diseño responsivo y animaciones (CSS Grid, Flexbox, Keyframes).
*   **JavaScript (ES6+):** Lógica del reproductor, algoritmos de comparación de texto (LCS - Longest Common Subsequence) para la validación y gestión de niveles.

## 📂 Estructura del Proyecto

*   `index.html`: Pantalla de inicio para seleccionar el nivel.
*   `indicaciones.html`: Guía de usuario sobre cómo practicar.
*   `reproductor.html`: Interfaz principal de ejercicio con el reproductor de video.
*   `styles.css`: Estilos visuales de toda la aplicación.
*   `script.js`: Lógica principal del ejercicio y manejo de la lista maestra de videos.

---
*Desarrollado para practicar y mejorar la fluidez auditiva en inglés.*
