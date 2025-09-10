

let correctAnswer;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ["+", "-", "*", "/"];
  const op = operations[Math.floor(Math.random() * operations.length)];

  let questionText = `${num1} ${op} ${num2}`;
  switch (op) {
    case "+": correctAnswer = num1 + num2; break;
    case "-": correctAnswer = num1 - num2; break;
    case "*": correctAnswer = num1 * num2; break;
    case "/": correctAnswer = parseFloat((num1 / num2).toFixed(2)); break;
  }

  document.getElementById("question").textContent = `Quanto é ${questionText}?`;
  generateOptions(correctAnswer);
}

function generateOptions(correct) {
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  document.getElementById("feedback").textContent = "";

  let options = [correct];
  while (options.length < 4) {
    let fake = correct + Math.floor(Math.random() * 10) - 5;
    if (!options.includes(fake)) options.push(fake);
  }

  options = options.sort(() => Math.random() - 0.5);

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const feedback = document.getElementById("feedback");
  if (selected === correctAnswer) {
    feedback.textContent = "✅ Correto!";
    feedback.className = "correct";
  } else {
    feedback.textContent = `❌ Errado! A resposta certa é ${correctAnswer}.`;
    feedback.className = "incorrect";
  }
}

document.getElementById("next").onclick = generateQuestion;
generateQuestion();


function checkAnswer(selected) {
  const feedback = document.getElementById("feedback");
  const answersDiv = document.getElementById("answers");
  const nextBtn = document.getElementById("next");

  if (selected === correctAnswer) {
    feedback.textContent = "✅ Correto!";
    feedback.className = "correct";
  } else {
    feedback.textContent = `❌ Errado! A resposta certa era ${correctAnswer}. Fim de jogo.`;
    feedback.className = "incorrect";
    answersDiv.innerHTML = "";
    nextBtn.style.display = "none";
  }
}
