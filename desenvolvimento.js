const textos = document.querySelectorAll(".texto-animado");

const observerTexto = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visivel");
      observerTexto.unobserve(entry.target);
    }
  });
});

textos.forEach(texto => observerTexto.observe(texto));

const imagem = document.querySelector(".imagem-interativa img");

imagem.parentElement.addEventListener("mousemove", (e) => {
  const rect = imagem.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 10; // Inclinação vertical
  const rotateY = ((x - centerX) / centerX) * 10; // Inclinação horizontal

  imagem.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});

imagem.parentElement.addEventListener("mouseleave", () => {
  imagem.style.transform = "rotateX(0deg) rotateY(0deg)";
});

