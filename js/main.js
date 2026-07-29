document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const pingValue = document.querySelector("[data-ping]");

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("is-open");
    navLinks?.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton?.classList.remove("is-open");
      navLinks.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  window.setInterval(() => {
    if (!pingValue) return;
    const current = Number(pingValue.textContent) || 34;
    pingValue.textContent = String(Math.max(29, Math.min(39, current + Math.round(Math.random() * 4 - 2))));
  }, 1400);

  const finePointer = matchMedia("(pointer: fine) and (min-width: 981px)");
  let lastParticle = 0;
  window.addEventListener("pointermove", (event) => {
    if (!finePointer.matches) return;
    document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    document.body.classList.add("cursor-active");

    const now = performance.now();
    if (now - lastParticle < 45) return;
    lastParticle = now;
    const particle = document.createElement("i");
    particle.className = "mouse-particle";
    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;
    particle.style.setProperty("--dx", `${Math.random() * 24 - 12}px`);
    particle.style.setProperty("--dy", `${Math.random() * 24 - 12}px`);
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 700);
  }, { passive: true });

  document.documentElement.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-active");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: .12 });
  document.querySelectorAll(".scroll-reveal").forEach((item) => observer.observe(item));
});
