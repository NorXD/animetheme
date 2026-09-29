document.documentElement.classList.add("js");

const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#site-navigation");
const jumpSearch = document.querySelector("#jump-search");
const searchInput = document.querySelector("#game-search");
const gameCards = Array.from(document.querySelectorAll("[data-game-card]"));
const countLabel = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const yearLabel = document.querySelector("#year");
const heroArtLayer = document.querySelector(".hero-feature__art-layer");
const state = { platform: "all", genre: "all", query: "" };

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Deschide meniul");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", function () {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Deschide meniul" : "Închide meniul");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeMenu();
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    document.querySelector("#jocuri").scrollIntoView({ behavior: "smooth" });
    searchInput.focus({ preventScroll: true });
  }
});

jumpSearch.addEventListener("click", function () {
  closeMenu();
  document.querySelector("#jocuri").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(function () { searchInput.focus({ preventScroll: true }); }, 350);
});

function normalize(value) {
  return value.toLocaleLowerCase("ro").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function updateCatalog() {
  let visibleCount = 0;

  gameCards.forEach(function (card) {
    const matchesPlatform = state.platform === "all" || card.dataset.platforms.split(" ").includes(state.platform);
    const matchesGenre = state.genre === "all" || card.dataset.genres.split(" ").includes(state.genre);
    const matchesQuery = normalize(card.dataset.search).includes(state.query);
    const isVisible = matchesPlatform && matchesGenre && matchesQuery;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  countLabel.textContent = visibleCount + (visibleCount === 1 ? " joc" : " jocuri");
  emptyState.hidden = visibleCount > 0;
}

searchInput.addEventListener("input", function () {
  state.query = normalize(searchInput.value.trim());
  updateCatalog();
});

document.querySelectorAll("[data-platform-filter]").forEach(function (button) {
  button.addEventListener("click", function () {
    state.platform = button.dataset.platformFilter;
    document.querySelectorAll("[data-platform-filter]").forEach(function (option) {
      option.setAttribute("aria-pressed", String(option === button));
    });
    updateCatalog();
  });
});

document.querySelectorAll("[data-genre-filter]").forEach(function (button) {
  button.addEventListener("click", function () {
    state.genre = button.dataset.genreFilter;
    document.querySelectorAll("[data-genre-filter]").forEach(function (option) {
      option.setAttribute("aria-pressed", String(option === button));
    });
    updateCatalog();
  });
});

yearLabel.textContent = String(new Date().getFullYear());

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (heroArtLayer && !prefersReducedMotion) {
  let parallaxFrame = 0;
  const updateParallax = function () {
    const bounds = heroArtLayer.parentElement.getBoundingClientRect();
    if (bounds.bottom >= 0 && bounds.top <= window.innerHeight) {
      const progress = (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height);
      const offset = (Math.min(1, Math.max(0, progress)) - 0.5) * 24;
      heroArtLayer.style.setProperty("--parallax-y", offset.toFixed(1) + "px");
    }
    parallaxFrame = 0;
  };
  const scheduleParallax = function () {
    if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateParallax);
  };

  window.addEventListener("scroll", scheduleParallax, { passive: true });
  window.addEventListener("resize", scheduleParallax, { passive: true });
  updateParallax();
}

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach(function (element) {
    element.classList.add("is-visible");
  });
}
