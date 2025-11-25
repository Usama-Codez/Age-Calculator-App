// =====================================
// DOM Elements
// =====================================

const form = document.getElementById("age-form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const dayLabel = document.getElementById("day-label");
const monthLabel = document.getElementById("month-label");
const yearLabel = document.getElementById("year-label");

const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

const yearsResult = document.getElementById("years-result");
const monthsResult = document.getElementById("months-result");
const daysResult = document.getElementById("days-result");

// =====================================
// Validation Functions
// =====================================

/**
 * Validates if a string contains only numeric characters
 */
function isNumeric(str) {
  return /^\d+$/.test(str);
}

/**
 * Checks if a date is valid
 */
function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === parseInt(year) &&
    date.getMonth() === month - 1 &&
    date.getDate() === parseInt(day)
  );
}

/**
 * Clears all error states
 */
function clearErrors() {
  [dayInput, monthInput, yearInput].forEach((input) => {
    input.classList.remove("!border-red-error");
  });

  [dayLabel, monthLabel, yearLabel].forEach((label) => {
    label.classList.remove("!text-red-error");
  });

  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";
}

/**
 * Sets an error state for an input field
 */
function setError(input, label, errorElement, message) {
  input.classList.add("!border-red-error");
  label.classList.add("!text-red-error");
  errorElement.textContent = message;
}

/**
 * Validates the entire form
 */
function validateForm() {
  clearErrors();

  const day = dayInput.value.trim();
  const month = monthInput.value.trim();
  const year = yearInput.value.trim();

  let isValid = true;

  // Check for empty fields
  if (!day) {
    setError(dayInput, dayLabel, dayError, "This field is required");
    isValid = false;
  }

  if (!month) {
    setError(monthInput, monthLabel, monthError, "This field is required");
    isValid = false;
  }

  if (!year) {
    setError(yearInput, yearLabel, yearError, "This field is required");
    isValid = false;
  }

  // If any field is empty, return early
  if (!isValid) {
    return false;
  }

  // Check if values are numeric
  if (!isNumeric(day)) {
    setError(dayInput, dayLabel, dayError, "Must be a valid day");
    isValid = false;
  }

  if (!isNumeric(month)) {
    setError(monthInput, monthLabel, monthError, "Must be a valid month");
    isValid = false;
  }

  if (!isNumeric(year)) {
    setError(yearInput, yearLabel, yearError, "Must be a valid year");
    isValid = false;
  }

  // If any field is not numeric, return early
  if (!isValid) {
    return false;
  }

  // Convert to numbers
  const dayNum = parseInt(day);
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);

  // Check ranges
  if (dayNum < 1 || dayNum > 31) {
    setError(dayInput, dayLabel, dayError, "Must be a valid day");
    isValid = false;
  }

  if (monthNum < 1 || monthNum > 12) {
    setError(monthInput, monthLabel, monthError, "Must be a valid month");
    isValid = false;
  }

  const currentYear = new Date().getFullYear();
  if (yearNum > currentYear) {
    setError(yearInput, yearLabel, yearError, "Must be in the past");
    isValid = false;
  }

  // If ranges are invalid, return early
  if (!isValid) {
    return false;
  }

  // Check if date is valid (e.g., 31/04/1991 is invalid)
  if (!isValidDate(dayNum, monthNum, yearNum)) {
    setError(dayInput, dayLabel, dayError, "Must be a valid date");
    isValid = false;
    return false;
  }

  // Check if date is in the future
  const inputDate = new Date(yearNum, monthNum - 1, dayNum);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate > today) {
    setError(dayInput, dayLabel, dayError, "Must be in the past");
    isValid = false;
  }

  return isValid;
}

// =====================================
// Age Calculation Functions
// =====================================

/**
 * Calculates the age based on the input date
 */
function calculateAge(day, month, year) {
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    // Get days in previous month
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

/**
 * Animates a number from 0 to target value
 */
function animateNumber(element, target) {
  const duration = 1000; // Animation duration in milliseconds
  const frameDuration = 1000 / 60; // 60fps
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const currentValue = Math.round(target * easeOutQuad(progress));

    element.textContent = currentValue;

    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = target;
    }
  }, frameDuration);
}

/**
 * Easing function for smooth animation
 */
function easeOutQuad(t) {
  return t * (2 - t);
}

/**
 * Displays the calculated age with animation
 */
function displayAge(years, months, days) {
  animateNumber(yearsResult, years);
  animateNumber(monthsResult, months);
  animateNumber(daysResult, days);
}

// =====================================
// Event Listeners
// =====================================

/**
 * Handle form submission
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    const day = parseInt(dayInput.value.trim());
    const month = parseInt(monthInput.value.trim());
    const year = parseInt(yearInput.value.trim());

    const age = calculateAge(day, month, year);
    displayAge(age.years, age.months, age.days);
  }
});

/**
 * Clear error on input
 */
[dayInput, monthInput, yearInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (input.classList.contains("!border-red-error")) {
      clearErrors();
    }
  });
});

/**
 * Allow only numeric input
 */
[dayInput, monthInput, yearInput].forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if (!/\d/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault();
    }
  });
});

// =====================================
// Initialize
// =====================================

console.log("Age Calculator App initialized successfully!");
