const counter = (a,b,c,arrayA) => {
  let arrayB = [a, b, c].map(Number);
  let sumB = arrayB.reduce((sum, element) => sum + element);
  let sumA = arrayA.reduce((sum, element) => sum + element);
  return (sumA + 10) - sumB;
};

function start (){
  if (document.getElementById('submit')) {
    const submit = document.getElementById('submit');
    pointCount = document.getElementById('point');
    let point = 10
    pointCount.innerHTML = point

    const input1 = document.getElementById('bonus-input-1');
    const input2 = document.getElementById('bonus-input-2');
    const input3 = document.getElementById('bonus-input-3');
    let arrayA = [input1.value, input2.value, input3.value].map(Number);    

    input1.addEventListener("change", () => {
      point = counter(input1.value, input2.value, input3.value, arrayA);
      if (point < 0 || point >10){
        pointCount.style.color = 'red';
      } else {
        pointCount.style.color = 'black';
      };
       
      pointCount.innerHTML = point
    });
    input2.addEventListener("change", () => {
      point = counter(input1.value, input2.value, input3.value, arrayA);
      if (point < 0 || point >10){
        pointCount.style.color = 'red';
      } else {
        pointCount.style.color = 'black';
      };
       
      pointCount.innerHTML = point
    });
    input3.addEventListener("change", () => {
      point = counter(input1.value, input2.value, input3.value, arrayA);
      if (point < 0 || point >10){
        pointCount.style.color = 'red';
      } else {
        pointCount.style.color = 'black';
      };
       
      pointCount.innerHTML = point
    });

    submit.addEventListener('click', (e) => {
      if (point < 0 || point >10){
        e.preventDefault();
        // const form = document.getElementById("test");
        const html = `<p style="color:red;">割り振りは10ポイントまでです</p>`;
        submit.insertAdjacentHTML("afterend", html);
      }else{
        const startFlag = `<input value='true' name='start' type="hidden">`;
        submit.insertAdjacentHTML("afterend", startFlag);
      }
    });
  };  
};

window.addEventListener('load',start);