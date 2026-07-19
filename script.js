// LISTA MAESTRA
const masterPlaylist = [
  { videoUrl: "all-right-i'll-see-you-soon.mp4", answer: "All right, I'll see you soon.", nivel: "A" },
  { videoUrl: "clip1.mp4", answer: "I heard it from Bender on Futurama oddly enough for some reason.", nivel: "C" },
  { videoUrl: "clip2.mp4", answer: "How innocuous are your flashbacks?", nivel: "C" },
  { videoUrl: "clip3.mp4", answer: "Okay, Nail, we can see you coming down the ladder now.", nivel: "B" },
  { videoUrl: "clip4.mp4", answer: "I don't know what she sees in you but, you're a lucky man.", nivel: "A" },
  { videoUrl: "we-don't-know-what-the-future-holds.mp4", answer: "We don't know what the future holds.", nivel: "A" },
  { videoUrl: "friedrabbit.mp4", answer: "Fried rabbit. Fried rabbit.", nivel: "B" },
  { videoUrl: "clip5.mp4", answer: "Lowkey deserved it though.", nivel: "B" },
  { videoUrl: "clip6.mp4", answer: "How was the funeral? Pretty lowkey.", nivel: "B" },
  { videoUrl: "clip7.mp4", answer: "Morty learned to be cautious the hard way.", nivel: "B" },
  { videoUrl: "clip8.mp4", answer: "I don't think that you should marry Rick because you don't actually like him.", nivel: "C" },
  { videoUrl: "clip9.mp4", answer: "And then he'll go larping and mogging and stroke his dick for a while, even if he does try to crack us, Richard.", nivel: "C" },
  { videoUrl: "clip 10.mp4", answer: "But inside, you're still the same old mean, salty, cantankerous, stanky.", nivel: "C" },
  { videoUrl: "clip11.mp4", answer: "Just hit me up real quick, okay?", nivel: "A" },
  { videoUrl: "clip12.mp4", answer: "Sometimes you slay the dragon, sometimes the dragon slays you", nivel: "B" },
  { videoUrl: "clip 13.mp4", answer: "You do realize that interventions typically don't involve binge drinking?", nivel: "C" },
  { videoUrl: "clip14.mp4", answer: "You can touch base with him first.", nivel: "B" },
  { videoUrl: "clip15.mp4", answer: "Your delusional quest just ruined my life.", nivel: "C" },
  { videoUrl: "clip16.mp4", answer: "You're what we call an NPC.", nivel: "A" },
  { videoUrl: "clip17.mp4", answer: "Joe can check with the station if he's so damnably suspicious.", nivel: "C" },
  { videoUrl: "clip18.mp4", answer: "I'm afraid we'll just have to bite the bullet on this thing, Clive.", nivel: "C" },
  { videoUrl: "clip19.mp4", answer: "So yeah, I'm sure you can understand our need to cut corners around here.", nivel: "B" },
  { videoUrl: "clip20.mp4", answer: "Well, if we both burn the midnight oil, I think you could see improvement sooner.", nivel: "B" },
  { videoUrl: "clip21.mp4", answer: "Whoever carries the message has to hit the nail on the head.", nivel: "C" },
  { videoUrl: "clip22.mp4", answer: "Actually, do you mind if we just call it a day?", nivel: "B" },
  { videoUrl: "clip23.mp4", answer: "She said you might have to go back to the drawing board.", nivel: "B" },
  { videoUrl: "clip 24.mp4", answer: "You have stood by me through thick and thin.", nivel: "A" },
  { videoUrl: "clip25.mp4", answer: "I'm simply pointing out that this could be a blessing in disguise.", nivel: "B" }
];

const parametros = new URLSearchParams(window.location.search);
const nivelSeleccionado = parametros.get('nivel') || 'A';
let playlist = masterPlaylist.filter(video => video.nivel === nivelSeleccionado);

function mezclarPlaylist(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
mezclarPlaylist(playlist);

let rachaActual = 0;
let haFalladoAlMenosUnaVez = false;
let letrasReveladas = [];

const mensajesPerfectos = ["¡Nivel nativo! 100% perfecto.", "¡You nailed it! Absolutamente perfecto.", "¡Impecable! Lo escuchaste a la perfección.", "¡Piece of cake! Estás volando.", "¡De una! Directo en el blanco. "];
const mensajesRacha = ["¡Estás en racha!", "¡On fire! Nadie te detiene.", "¡Qué racha llevas! Sigue así.", "¡Racha brutal! Estás intratable."];
const mensajesAuditivos = ["¡Bien escuchado! Pasa a la siguiente, pero ojo a la puntuación:", "¡Excelente oído! Captaste todo, solo cuida los detalles ortográficos:", "¡Muy bien escuchado! Solo te faltó pulir la puntuación o mayúsculas:", "¡Buen oído! Todo correcto en sonido, mira cómo se escribe formalmente:"];
const mensajesPorPelo = ["¡Te la pasamos! Cuidado con el dedo, casi te comes una letra:", "¡Por un pelo! Ojo con el teclado, se te fue un pequeño error:", "¡Casi perfecto! Te perdonamos ese error de dedo, pero se escribe:", "¡Pasable! Buen intento, dale una mirada al error de digitación:"];

let currentIndex = 0;

const lessonView = document.getElementById("lessonView");
const finalScreen = document.getElementById("finalScreen");
const lessonCounter = document.getElementById("lessonCounter");
const player = document.getElementById("player");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const skipBtn = document.getElementById("skipBtn");
const hintBtn = document.getElementById("hintBtn");

function loadLesson(index) {
  if (playlist.length === 0) {
    lessonCounter.textContent = "";
    player.style.display = "none";
    return;
  }
  if (index >= playlist.length) {
    showFinalScreen();
    return;
  }
  const lesson = playlist[index];
  player.src = lesson.videoUrl;
  player.load();
  answerInput.innerText = "";
  answerInput.classList.remove("correct", "shake");
  answerInput.contentEditable = "true";
  feedback.innerHTML = "";
  feedback.classList.remove("success");
  checkBtn.disabled = false;
  checkBtn.classList.remove("correct-state", "hidden");
  nextBtn.classList.add("hidden");
  skipBtn.disabled = false;
  skipBtn.classList.remove("hidden");
  lessonCounter.textContent = "";
  
  // Reset de pista
  letrasReveladas = [];
  hintBtn.style.display = "none";
  haFalladoAlMenosUnaVez = false;
}

function normalize(text) {
  return text.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"’]/g, "").replace(/\s+/g, " ");
}

function checkAnswer() {
  const lesson = playlist[currentIndex];
  const userRaw = answerInput.innerText.trim();
  const userAnswerNormalized = normalize(userRaw);
  const correctRaw = lesson.answer.trim();
  const correctAnswerNormalized = normalize(correctRaw);

  if (userAnswerNormalized.length === 0) {
    feedback.textContent = "Type what you hear before checking.";
    feedback.classList.remove("success");
    return;
  }
  if (userRaw === correctRaw) { handleCorrectAnswer("perfecto"); return; }
  if (userAnswerNormalized === correctAnswerNormalized) { handleCorrectAnswer("auditivo"); return; }

  const letrasDeDiferencia = calcularDistancia(userAnswerNormalized, correctAnswerNormalized);
  let toleranceMax = (correctAnswerNormalized.length >= 15 && correctAnswerNormalized.length <= 40) ? 1 : (correctAnswerNormalized.length > 40 ? 2 : 0);

  if (letrasDeDiferencia <= toleranceMax) { handleCorrectAnswer("por_pelo"); return; }
  handleIncorrectAnswer();
}

function handleCorrectAnswer(tipoExito) {
  const lesson = playlist[currentIndex];
  const userRaw = answerInput.innerText;
  answerInput.classList.add("correct");
  checkBtn.classList.add("correct-state", "hidden");
  nextBtn.classList.remove("hidden");
  skipBtn.classList.add("hidden");
  answerInput.contentEditable = "false";
  feedback.classList.add("success");
  hintBtn.style.display = "none";
  rachaActual += 1;
  let textoRacha = (rachaActual >= 3) ? `<br><span style="color: #ffd700; font-weight: 800; font-size: 18px; text-shadow: 0 0 8px rgba(255,215,0,0.5);">${mensajesRacha[Math.floor(Math.random() * mensajesRacha.length)]} ${rachaActual} seguidas</span>` : "";
  const textoConColor = generarTextoResaltado(lesson.answer, userRaw);
  if (tipoExito === "perfecto") feedback.innerHTML = `${mensajesPerfectos[Math.floor(Math.random() * mensajesPerfectos.length)]} ${textoRacha}`;
  else if (tipoExito === "auditivo") feedback.innerHTML = `${mensajesAuditivos[Math.floor(Math.random() * mensajesAuditivos.length)]}<span class="correct-answer-display">Se escribe: "${textoConColor}"</span> ${textoRacha}`;
  else if (tipoExito === "por_pelo") feedback.innerHTML = `${mensajesPorPelo[Math.floor(Math.random() * mensajesPorPelo.length)]}<span class="correct-answer-display">Se escribe: "${textoConColor}"</span> ${textoRacha}`;
}

function handleIncorrectAnswer() {
  feedback.textContent = "Not quite - give it another listen and try again.";
  feedback.classList.remove("success");
  rachaActual = 0;
  answerInput.classList.remove("shake");
  void answerInput.offsetWidth;
  answerInput.classList.add("shake");
  haFalladoAlMenosUnaVez = true;
  hintBtn.style.display = "block";
}

// LÓGICA DE PISTA: Algoritmo LCS
hintBtn.addEventListener("click", () => {
  const lesson = playlist[currentIndex];
  const correct = lesson.answer;
  const userText = answerInput.innerText.trim();
  
  const m = correct.length;
  const n = userText.length;
  
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (correct[i - 1].toLowerCase() === userText[j - 1].toLowerCase()) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = m, j = n;
  const matchedIndices = [];
  while (i > 0 && j > 0) {
    if (correct[i - 1].toLowerCase() === userText[j - 1].toLowerCase()) {
      matchedIndices.push(i - 1);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  matchedIndices.reverse();

  for (let idx of matchedIndices) {
    if (/[a-zA-Z0-9]/.test(correct[idx]) && !letrasReveladas.includes(idx)) {
      letrasReveladas.push(idx);
    }
  }

  let indicesFaltantes = [];
  for (let k = 0; k < correct.length; k++) {
    if (/[a-zA-Z0-9]/.test(correct[k]) && !letrasReveladas.includes(k)) {
      indicesFaltantes.push(k);
    }
  }
  
  for (let k = 0; k < 2; k++) {
    if (indicesFaltantes.length > 0) {
      const azar = Math.floor(Math.random() * indicesFaltantes.length);
      letrasReveladas.push(indicesFaltantes.splice(azar, 1)[0]);
    }
  }

  let nuevoTexto = "";
  for (let k = 0; k < correct.length; k++) {
    if (letrasReveladas.includes(k) || !/[a-zA-Z0-9]/.test(correct[k])) {
      nuevoTexto += correct[k];
    } else {
      nuevoTexto += "•";
    }
  }
  
  answerInput.innerText = nuevoTexto;
  ponerCursorAlFinal(answerInput);
});

function advanceLesson() { currentIndex += 1; loadLesson(currentIndex); }

function skipSession() {
  const lesson = playlist[currentIndex];
  rachaActual = 0;
  answerInput.contentEditable = "false";
  checkBtn.classList.add("hidden");
  hintBtn.style.display = "none";
  feedback.innerHTML = `Sesión omitida. La frase correcta era:<span class="correct-answer-display" style="color: black; font-weight: bold; display: block; margin-top: 5px;">"${lesson.answer}"</span>`;
  skipBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
}

function showFinalScreen() { lessonView.classList.add("hidden"); finalScreen.classList.add("visible"); }

checkBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", advanceLesson);
skipBtn.addEventListener("click", skipSession);

answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (!nextBtn.classList.contains("hidden")) advanceLesson();
    else checkAnswer();
  }
});

loadLesson(currentIndex);

function calcularDistancia(str1, str2) {
  const matriz = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) matriz[0][i] = i;
  for (let j = 0; j <= str2.length; j += 1) matriz[j][0] = j;
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicadorSustitucion = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matriz[j][i] = Math.min(matriz[j - 1][i] + 1, matriz[j][i - 1] + 1, matriz[j - 1][i - 1] + indicadorSustitucion);
    }
  }
  return matriz[str2.length][str1.length];
}

// NUEVA VERSIÓN: Algoritmo LCS para mapear y resaltar sin desincronización
function generarTextoResaltado(correcto, usuario) {
  const m = correcto.length;
  const n = usuario.length;
  
  // Matriz para calcular la Subsecuencia Común Más Larga (LCS)
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const charC = correcto[i - 1];
      const charU = usuario[j - 1];
      
      // Coinciden si son la misma letra (ignorando mayúsculas) o si el usuario tiene el punto de pista '•'
      if (charC.toLowerCase() === charU.toLowerCase() || charU === '•') {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Traceback para guardar exactamente qué letra del usuario corresponde a qué letra original
  let i = m, j = n;
  const correspondencia = {}; 

  while (i > 0 && j > 0) {
    const charC = correcto[i - 1];
    const charU = usuario[j - 1];

    if (charC.toLowerCase() === charU.toLowerCase() || charU === '•') {
      correspondencia[i - 1] = j - 1;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  // Construcción visual basada en la ruta perfecta
  let resultado = "";
  for (let k = 0; k < m; k++) {
    const charCorrecto = correcto[k];
    
    if (correspondencia[k] !== undefined) {
      const charUsuario = usuario[correspondencia[k]];
      
      if (charUsuario === '•') {
        // 1. Es un punto de pista que el usuario reveló
        resultado += `<span style="color: #f59e0b; font-weight: bold;">${charCorrecto}</span>`;
      } else if (charCorrecto === charUsuario) {
        // 2. Coincidencia perfecta en letra y capitalización
        resultado += charCorrecto;
      } else {
        // 3. Coinciden pero falló la mayúscula/minúscula
        resultado += `<span class="diff-error">${charCorrecto}</span>`;
      }
    } else {
      // 4. El usuario no escribió este carácter o lo puso en un orden que rompió la secuencia
      resultado += `<span class="diff-error">${charCorrecto}</span>`;
    }
  }
  
  return resultado;
}

function ponerCursorAlFinal(el) {
    el.focus();
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}