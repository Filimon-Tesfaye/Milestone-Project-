// ==========================================================================
// script.js
// IT3203 Milestone 3
// Handles HTTP quiz grading and result display.
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quiz-form");
  const resultDiv = document.getElementById("results");
  const resetBtn = document.getElementById("reset-btn");

  if (!quizForm) {
    // Safety check: only run on pages that actually contain the quiz.
    return;
  }

  // Handle quiz submission: compute score and show feedback
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

    // Question 1: text input
    const q1Input = document.getElementById("q1");
    const q1 = q1Input ? q1Input.value.trim() : "";
    if (q1.toLowerCase() === answers.q1.toLowerCase()) {
      score++;
      resultHTML += "<p>1. ✅ Correct</p>";
    } else {
      resultHTML += `<p>1. ❌ Incorrect (Answer: ${answers.q1})</p>`;
    }

    // Questions 2–4: single-choice radio buttons
    ["q2", "q3", "q4"].forEach((qName, index) => {
      const group = quizForm[qName];
      let selected = "";
      if (group) {
        if (group.length === undefined) {
          if (group.checked) selected = group.value;
        } else {
          for (const input of group) {
            if (input.checked) {
              selected = input.value;
              break;
            }
          }
        }
      }
      const questionNumber = index + 2;
      if (selected === answers[qName]) {
        score++;
        resultHTML += `<p>${questionNumber}. ✅ Correct</p>`;
      } else {
        resultHTML += `<p>${questionNumber}. ❌ Incorrect (Answer: ${answers[qName]})</p>`;
      }
    });

    // Question 5: multiple checkboxes (all-or-nothing scoring)
    const q5Inputs = quizForm.q5;
    let checkedValues = [];
    if (q5Inputs) {
      const list = q5Inputs.length === undefined ? [q5Inputs] : Array.from(q5Inputs);
      checkedValues = list.filter(c => c.checked).map(c => c.value);
    }

    const correct = answers.q5;
    const allCorrect =
      correct.every(a => checkedValues.includes(a)) &&
      checkedValues.length === correct.length;

    if (allCorrect) {
      score++;
      resultHTML += "<p>5. ✅ Correct</p>";
    } else {
      resultHTML += `<p>5. ❌ Incorrect (Answers: ${correct.join(", ")})</p>`;
    }

    const percentage = (score / total) * 100;
    const status = percentage >= 60 ? "PASS" : "FAIL";

    resultHTML += `
      <h3>
        Total: ${score}/${total} (${percentage.toFixed(0)}%) —
        <span style="color:${status === "PASS" ? "green" : "red"}">
          ${status}
        </span>
      </h3>
    `;

    resultDiv.innerHTML = resultHTML;
  });

  // Handle reset button: clear form and results
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      quizForm.reset();
      resultDiv.innerHTML = "";
    });
  }
});
