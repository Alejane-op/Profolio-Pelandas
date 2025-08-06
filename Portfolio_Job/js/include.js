  function includeHTML(callback) {
    const elements = document.querySelectorAll('[w3-include-html]');
    let remaining = elements.length;

    if (remaining === 0 && typeof callback === 'function') {
      callback();
      return;
    }

    elements.forEach((el) => {
      const file = el.getAttribute('w3-include-html');
      if (file) {
        fetch(file)
          .then((response) => {
            if (!response.ok) throw new Error('Page not found');
            return response.text();
          })
          .then((data) => {
            el.innerHTML = data;
            el.removeAttribute('w3-include-html');
            includeHTML(callback); // Handle nested includes
          })
          .catch((error) => {
            el.innerHTML = error.message;
          });
      } else {
        remaining--;
        if (remaining === 0 && typeof callback === 'function') {
          callback();
        }
      }
    });
  }

  // ✅ Wait for DOM to load before injecting HTML
  document.addEventListener("DOMContentLoaded", function () {
    includeHTML(() => {
      const hamburger = document.getElementById('hamburger');
      const navLinks = document.getElementById('nav-links');

      if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('active');
          navLinks.classList.toggle('active');
        });

        // ✅ Close mobile nav on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
          });
        });
      }
    });
  });