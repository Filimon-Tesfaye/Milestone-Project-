document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quiz-form");
  const resultDiv = document.getElementById("results");
  const resetBtn = document.getElementById("reset-btn");

  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const answers = {
      q1: "HyperText Transfer Protocol",
      q2: "1.1",
      q3: "QUIC",
      q4: "Chrome, Firefox, Edge",
      q5: ["Multiplexing", "Binary Framing"]
    };

    let score = 0;
    const total = 5;
    let resultHTML = "<h2>Quiz Results</h2>";

    const q1 = document.getElementById("q1").value.trim();
    if (q1.toLowerCase() === answers.q1.toLowerCase()) {
      score++; resultHTML += `<p>1. ✅ Correct</p>`;
    } else resultHTML += `<p>1. ❌ Incorrect (Answer: ${answers.q1})</p>`;

    ["q2", "q3", "q4"].forEach(q => {
      const selected = quizForm[q].value;
      if (selected === answers[q]) {
        score++; resultHTML += `<p>${q.slice(1)}. ✅ Correct</p>`;
      } else {
        resultHTML += `<p>${q.slice(1)}. ❌ Incorrect (Answer: ${answers[q]})</p>`;
      }
    });

    const checked = Array.from(quizForm.q5).filter(c => c.checked).map(c => c.value);
    const correct = answers.q5;
    const allCorrect = correct.every(a => checked.includes(a)) && checked.length === correct.length;
    if (allCorrect) { score++; resultHTML += `<p>5. ✅ Correct</p>`; }
    else resultHTML += `<p>5. ❌ Incorrect (Answers: ${correct.join(", ")})</p>`;

    const percentage = (score / total) * 100;
    const status = percentage >= 60 ? "PASS" : "FAIL";
    resultHTML += `<h3>Total: ${score}/${total} (${percentage.toFixed(0)}%) — <span style='color:${status === "PASS" ? "green" : "red"}'>${status}</span></h3>`;
    resultDiv.innerHTML = resultHTML;
  });

  resetBtn.addEventListener("click", () => {
    quizForm.reset();
    resultDiv.innerHTML = "";
  });
});