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
  const checkBoxesContainer = document.querySelectorAll(".form-check");
  const confirmButton = document.querySelector(".confirm-step");
  const form = document.getElementById("multiStepForm");

  let selectedPlan = null;
  let selectedAddons = [];

  nextSteps.forEach((nextStep) => {
    nextStep.addEventListener("click", () => {
      const currentStep = parseInt(nextStep.getAttribute("data-step"));
      if (validateStep(currentStep)) {
        showStep(currentStep + 1);
      }
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

    selectedPlan = {
      name: plan.dataset.planName,
      priceMonthly: plan.dataset.planPriceMonthly,
      priceYearly: plan.dataset.planPriceYearly,
    };
    console.log(selectedPlan);
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

  checkBoxesContainer.forEach((checkBoxesContainer) => {
    checkBoxesContainer.addEventListener("change", (event) => {
      const checkedBox = event.target.closest(".form-check-input");
      if (!checkedBox) return;
      checkBoxesContainer.classList.toggle("checked-background");
    });
  });

  confirmButton.addEventListener("click", () => {
    if (validateStep(4)) {
      showStep(5);
      const formData = new FormData(form);
      if (selectedPlan) {
        const planName = selectedPlan.name;
        const billingCycleLabelActive = document
          .querySelector(".billing-cycle-lable.active")
          .textContent.trim();
        const planPrice =
          billingCycleLabelActive === "Monthly"
            ? selectedPlan.priceMonthly
            : selectedPlan.priceYearly;

        formData.append("planName", planName);
        formData.append("billingCycleLabelActive", billingCycleLabelActive);
        formData.append("planPrice", planPrice);
      }

      selectedAddons = Array.from(
        document.querySelectorAll(".form-check-input:checked")
      ).map((checkbox) => checkbox.value);

      formData.append("selectedAddons", selectedAddons);

      const formObject = Object.fromEntries(formData.entries());
      console.log("Form Data: ", formObject);
    }
  });

  function validateStep(stepNumber) {
    let isValid = true;
    const currentStep = document.querySelector(`.step-${stepNumber}`);
    const inputs = currentStep.querySelectorAll("input[required]");
    const alert = currentStep.querySelector(".alert");

    if (alert) alert.classList.add("d-none"); // Hide alert initially

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        input.classList.add("is-invalid");
        isValid = false;
      } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }
    });

    if (stepNumber === 2) {
      if (!selectedPlan) {
        alert.classList.remove("d-none");
        isValid = false;
      }
    }

    if (stepNumber === 3) {
      const checkedAddons = currentStep.querySelectorAll(
        ".form-check-input:checked"
      );
      if (checkedAddons.length === 0) {
        alert.classList.remove("d-none");
        isValid = false;
      }
    }

    return isValid;
  }
});

function showStep(num) {
  const steps = document.querySelectorAll(`.step`);
  const stepNums = document.querySelectorAll(".step-num");
  const multiForm = document.querySelector(".multi-form");

  if (num === 5) multiForm.classList.add("d-none");
  steps.forEach((step, index) => {
    if (index === num - 1) step.classList.remove("d-none");
    else step.classList.add("d-none");
  });

  stepNums.forEach((step, index) => {
    if (index === num - 1) step.classList.add("active");
    else step.classList.remove("active");
  });
}
