
const val1Txt = document.getElementById("val1Txt")
const val2Txt = document.getElementById("val2Txt")
const formulaLbl = document.getElementById("formula");
const resultLbl = document.getElementById("result");
const operatorCmb = document.getElementById("operator");

val1Txt.addEventListener("input", calculate);
val2Txt.addEventListener("input", calculate);
operatorCmb.addEventListener("change", calculate);

function calculate() {
  const val1 = parseFloat(val1Txt.value);
  const val2 = parseFloat(val2Txt.value);

  if(isNaN(val1) || isNaN(val2)) {
    formulaLbl.textContent = "";
    resultLbl.innerHTML = `<span style="color: navy;">両方の数値を入力してください</span>`
    return;
  }
  let ope, result;
  if(operatorCmb.value === "addition") {
    ope = "+";
    result = val1 + val2;
  } else if(operatorCmb.value === "subtraction") {
    ope = "-";
    result = val1 - val2;
  } else if(operatorCmb.value === "multiplication") {
    ope = "·";
    result = val1 * val2;
  } else if(operatorCmb.value === "division") {
    if(val2 === 0) {
      formulaLbl.textContent = "";
      resultLbl.innerHTML = `<span style="color: red;">0で割ることはできません。</span>`
      return;
    }
    ope = "÷";
    result = val1 / val2;
  }
  formulaLbl.textContent = `計算式: ${val1} ${ope} ${val2}`;
  resultLbl.innerHTML = `計算結果: ${result}`;
}
