const input = document.createElement("input");
input.placeholder = "Ask your doubt...";
document.body.appendChild(input);

const btn = document.createElement("button");
btn.innerText = "Ask AI";
document.body.appendChild(btn);

const output = document.createElement("p");
document.body.appendChild(output);

btn.onclick = () => {
  const q = input.value;
  output.innerText = "Thinking... 🤖";

  setTimeout(() => {
    output.innerText = "Answer: " + q + " (AI response demo)";
  }, 1000);
};
