document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-loaded");

  const forms = document.querySelectorAll("[data-form]");
  forms.forEach((form) => {
    const success = form.querySelector(".form-success");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.classList.add("is-submitted");
      if (success) {
        success.hidden = false;
      }
      form.reset();
    });
  });

  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) {
    return;
  }

  const reveal = (element) => element.classList.add("is-visible");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach(reveal);
  }
});
