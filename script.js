// ===== Simple UI behaviors: reveal on scroll + skill bars animate + small header effect =====

// Reveal elements with .fade-in using IntersectionObserver
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
  
  // Animate skill bars when visible
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.bar-fill');
        fills.forEach(fill => {
          const w = fill.getAttribute('data-fill') || '0%';
          fill.style.width = w;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) skillObserver.observe(skillsSection);
  
  // Tiny header shadow on scroll for depth
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    if (window.scrollY > 20) header.style.backdropFilter = 'saturate(120%) blur(6px)';
    else header.style.backdropFilter = 'none';
  });
  
  // Optional: add small hover tilt for project cards (mouse movement)
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${ -y * 3 }deg) rotateY(${ x * 3 }deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
  