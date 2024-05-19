document.addEventListener("DOMContentLoaded", () => {
  const nextSteps = document.querySelectorAll(".next-step");
  const preSteps = document.querySelectorAll(".prev-step");
  console.log(nextSteps);

  nextSteps.forEach((nextStep) => {
    nextStep.addEventListener("click", () => {
      const currentStep = parseInt(nextStep.getAttribute("data-step"));
      showStep(currentStep + 1);
    });
  });

  preSteps.forEach((preStep) => {
    preStep.addEventListener("click", () => {
      const currentStep = parseInt(preStep.getAttribute("data-step"));
      showStep(currentStep - 1);
    });
  });
});

function showStep(num) {
  const steps = document.querySelectorAll(`.step`);
  const stepNums = document.querySelectorAll(".step-num");

  steps.forEach((step, index) => {
    if (index === num - 1) step.classList.remove("d-none");
    else step.classList.add("d-none");
  });

  stepNums.forEach((step, index) => {
    if (index === num - 1) step.classList.add("active");
    else step.classList.remove("active");
  });
}
