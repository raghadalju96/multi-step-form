document.addEventListener("DOMContentLoaded", () => {
  const nextSteps = document.querySelectorAll(".next-step");
  const preSteps = document.querySelectorAll(".prev-step");
  const monthlySvg = document.getElementById("monthlySvg");
  const yearlySvg = document.getElementById("yearlySvg");
  const monthlyPrices = document.querySelectorAll(".monthly-price");
  const yearlyPrices = document.querySelectorAll(".yearly-price");
  const billingCycleContainer = document.querySelector(".billing-cycle");
  const billingCycleLabels = document.querySelectorAll(".billing-cycle-lable");
  const plansContainer = document.querySelector(".plans");
  const plans = document.querySelectorAll(".plan");

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

  plansContainer.addEventListener("click", (event) => {
    const plan = event.target.closest(".plan");
    console.log(plan);

    if (!plan) return;

    plans.forEach((plan) => {
      plan.classList.remove("active");
    });
    plan.classList.add("active");
  });

  billingCycleContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "LABEL" || event.target.closest("LABEL")) {
      monthlySvg.classList.toggle("d-none");
      yearlySvg.classList.toggle("d-none");

      billingCycleLabels.forEach((billingCycleLabel) => {
        billingCycleLabel.classList.toggle("active");
      });

      // Toggle plan prices

      monthlyPrices.forEach((price) => price.classList.toggle("d-none"));
      yearlyPrices.forEach((price) => price.classList.toggle("d-none"));
    }
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
