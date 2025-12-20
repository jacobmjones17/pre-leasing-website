<template>
  <div class="app-shell">
    <header class="top-nav">
      <div class="top-nav-inner">
        <a href="#overview" class="brand">
          <span class="brand-mark">PS</span>
          <span class="brand-text">
            <span class="brand-name">Pilot Station Place</span>
            <span class="brand-location">Goldsboro, NC</span>
          </span>
        </a>
        <nav class="nav-links">
          <a href="#overview">Overview</a>
          <a href="#homes">Homes</a>
          <a href="#location">Location</a>
          <a href="#leasing">Leasing</a>
          <a href="#contact">Contact</a>
          <a href="#preleasing" class="nav-cta">Join list</a>
        </nav>
      </div>
    </header>

    <main>
      <!-- HERO -->
      <section id="overview" class="hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">Now pre-leasing • New construction</p>
            <h1>Brand new duplex homes in Goldsboro</h1>
            <p>
              Thoughtfully designed 2-bedroom, 2-bath duplex homes with modern
              finishes, low-maintenance living, and quick access to Seymour
              Johnson Air Force Base.
            </p>
            <div class="hero-actions">
              <a
                href="#preleasing"
                class="btn-primary"
                @click="interestType = 'join'"
              >
                Join pre-leasing list
              </a>
              <a
                href="#preleasing"
                class="btn-primary"
                @click="interestType = 'showing'"
              >
                Request a showing
              </a>
            </div>
            <div class="hero-stats">
              <div class="stat">
                <span class="stat-label">Starting at</span>
                <span class="stat-value">$1,400 / mo</span>
              </div>
              <div class="stat">
                <span class="stat-label">Early-bird</span>
                <span class="stat-value">$1,350 / mo</span>
              </div>
              <div class="stat">
                <span class="stat-label">Availability</span>
                <span class="stat-value">8 homes</span>
              </div>
            </div>
          </div>
          <aside class="hero-panel" aria-label="Quick leasing snapshot">
            <div class="hero-panel-card">
              <p class="panel-label">Pilot Station Place</p>
              <p class="panel-heading">2 bed / 2 bath duplexes</p>
              <div class="panel-row">
                <span>Approx. 900 sq ft heated</span>
                <span class="pill">New for 2025</span>
              </div>
              <ul class="panel-list">
                <li>Large covered front porch</li>
                <li>Private exterior storage room</li>
                <li>Energy-efficient construction</li>
              </ul>
              <div class="panel-footer">
                <span class="panel-price">From $1,400 / mo</span>
                <span class="panel-note">Ask about early-bird pricing</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <!-- QUICK FACTS STRIP -->
      <section id="homes" class="strip">
        <div class="strip-inner">
          <div class="strip-item">
            <span class="strip-label">Layout</span>
            <span class="strip-value">2 bed · 2 bath</span>
          </div>
          <div class="strip-item">
            <span class="strip-label">Size</span>
            <span class="strip-value">≈ 900 sq ft heated</span>
          </div>
          <div class="strip-item">
            <span class="strip-label">Style</span>
            <span class="strip-value">Low-density duplex community</span>
          </div>
        </div>
      </section>

      <!-- LIVING DESCRIPTION -->
      <section class="section">
        <div class="section-inner">
          <h2>Modern, low-maintenance living</h2>
          <p>
            Pilot Station Place offers brand-new duplex homes just outside
            Goldsboro. Enjoy modern finishes, energy-efficient construction, and
            quiet surroundings that are ideal for military members,
            professionals, and long-term residents seeking comfortable, low-
            maintenance living.
          </p>
        </div>
      </section>

      <!-- FEATURES -->
      <section id="features" class="section section-alt">
        <div class="section-inner section-grid">
          <div>
            <h2>Inside each home</h2>
            <ul class="list">
              <li>2 bedrooms and 2 full bathrooms</li>
              <li>Approximately 900 sq ft heated</li>
              <li>Luxury vinyl plank flooring</li>
              <li>Granite countertops</li>
            </ul>
          </div>
          <div>
            <h2>Community details</h2>
            <ul class="list">
              <li>Large covered porches</li>
              <li>Private storage included</li>
              <li>Energy-efficient construction</li>
              <li>Quiet, low-density setting</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- MEDIA PLACEHOLDERS -->
      <section id="photos" class="section">
        <div class="section-inner">
          <div class="media-header">
            <h2>Photos & floor plans</h2>
            <div class="media-controls">
              <button
                type="button"
                class="media-arrow"
                @click="prevPhoto"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <span class="media-counter">
                {{ activePhotoIndex + 1 }} / {{ photos.length }}
              </span>
              <button
                type="button"
                class="media-arrow"
                @click="nextPhoto"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
          </div>
          <div class="media-grid">
            <article
              v-for="(photo, index) in photos"
              :key="photo.title"
              class="media-card"
              :class="{ 'is-active': index === activePhotoIndex }"
            >
              <div class="media-box">{{ photo.title }}</div>
              <p class="media-text">{{ photo.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- LOCATION SPLIT -->
      <section id="location" class="section section-alt">
        <div class="section-inner section-grid">
          <div>
            <h2>Easy access to everything</h2>
            <p>
              100–106 Pilot Station Drive, Goldsboro, NC 27534.
              <br />
              A small duplex community tucked just off key corridors, with
              everyday essentials only a short drive away.
            </p>
            <ul class="nearby-list" aria-label="Nearby destinations">
              <li class="nearby-item">
                <span class="nearby-label">Seymour Johnson Air Force Base</span>
                <span class="nearby-detail">Convenient commute via US-70 and local connectors.</span>
              </li>
              <li class="nearby-item">
                <span class="nearby-label">Shopping & dining</span>
                <span class="nearby-detail">Close to Berkeley Blvd retailers, groceries, and restaurants.</span>
              </li>
              <li class="nearby-item">
                <span class="nearby-label">Schools & everyday services</span>
                <span class="nearby-detail">Area schools, medical offices, and daily conveniences within a short drive.</span>
              </li>
            </ul>
          </div>
          <div class="map-wrap">
            <iframe
              src="https://www.google.com/maps?q=35.288056,-77.895&hl=en&z=16&output=embed"
              width="100%"
              height="280"
              style="border: 0;"
              loading="lazy"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      <!-- LEASING DETAILS -->
      <section id="leasing" class="section">
        <div class="section-inner">
          <h2>Leasing details</h2>
          <div class="details-grid">
            <div class="detail">
              <h3>Lease term</h3>
              <p>Minimum 12-month lease.</p>
            </div>
            <div class="detail">
              <h3>Security deposit</h3>
              <p>Equal to one month’s rent.</p>
            </div>
            <div class="detail">
              <h3>Utilities</h3>
              <p>Tenant is responsible for all utilities.</p>
            </div>
            <div class="detail">
              <h3>Pets</h3>
              <p>Allowed with fee; breed and size restrictions apply.</p>
            </div>
            <div class="detail">
              <h3>Screening</h3>
              <p>Income verification, background, and credit check required.</p>
            </div>
            <div class="detail">
              <h3>Availability</h3>
              <p>8 units initially available.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- PRE-LEASING + SHOWING FORM (UNIFIED) -->
      <section id="preleasing" class="section section-form">
        <div class="section-inner form-layout">
          <div class="form-copy">
            <h2>Join the pre-leasing list or request a showing</h2>
            <p>
              Share a bit about yourself and how we can help&mdash;whether you
              just want updates or you’d like to see a home in person.
            </p>
          </div>
          <form name="interest" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="interest" />
            <input type="text" name="name" placeholder="Full name" required />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
            />
            <input type="tel" name="phone" placeholder="Phone number" />
            <select name="interestType" v-model="interestType">
              <option value="join">Join pre-leasing list</option>
              <option value="showing">Request a showing</option>
            </select>
            <textarea
              name="details"
              :placeholder="
                interestType === 'showing'
                  ? 'Preferred showing days / times and any questions'
                  : 'Move-in timeline or questions'
              "
            ></textarea>
            <button type="submit" class="btn-primary">Submit</button>
          </form>
        </div>
      </section>

      <!-- CONTACT DETAILS -->
      <section id="contact" class="section section-form section-alt">
        <div class="section-inner form-layout">
          <div class="form-copy">
            <h2>Have questions?</h2>
            <p>
              Prefer to talk? Call or email using the details below, or use the
              form above and we’ll follow up with available times.
            </p>
            <p>
              <strong>Phone:</strong>
              <a href="tel:12525217965">
                252-521-7965</a>
              <br />
              <strong>Email:</strong>
              <a href="mailto:Fjpbholdings.ben@gmail.com">
                Fjpbholdings.ben@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <p>Pilot Station Place • Goldsboro, North Carolina</p>
      <p>Professionally managed by FJPB Holdings</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const interestType = ref('join');

const photos = [
  {
    title: 'Exterior rendering coming soon',
    description: 'Street view and exterior elevations.',
  },
  {
    title: '2 bed / 2 bath layout',
    description: 'Efficient, open-concept floor plan.',
  },
  {
    title: 'Interior finishes preview',
    description: 'Granite, LVP flooring, and modern trim.',
  },
];

const activePhotoIndex = ref(0);

const nextPhoto = () => {
  activePhotoIndex.value = (activePhotoIndex.value + 1) % photos.length;
};

const prevPhoto = () => {
  activePhotoIndex.value =
    (activePhotoIndex.value - 1 + photos.length) % photos.length;
};

onMounted(() => {
  document.title = 'Pilot Station Place | Brand New Duplexes in Goldsboro, NC';
});
</script>

<style>
:root {
  --bg-page: #020617;
  --bg-page-soft: #020617;
  --bg-surface: #020617;
  --bg-card: #020617;
  --border-subtle: rgba(148, 163, 184, 0.28);
  --border-strong: rgba(148, 163, 184, 0.6);
  --text-main: #e5e7eb;
  --text-muted: #9ca3af;
  --accent: #38bdf8;
  --accent-soft: rgba(56, 189, 248, 0.08);
  --accent-strong: #0ea5e9;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), transparent
        55%),
    radial-gradient(circle at bottom right, rgba(129, 140, 248, 0.16),
        transparent 55%),
    linear-gradient(180deg, #020617, #020617);
  color: var(--text-main);
  line-height: 1.6;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--text-main);
}

.top-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(14px);
  background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.18),
        rgba(15, 23, 42, 1));
  border-bottom: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 14px 45px rgba(15, 23, 42, 0.75);
}

.top-nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
}

.brand-mark {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 20%, #38bdf8, #0ea5e9);
  color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.brand-location {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 999px;
  transition: background-color 0.18s ease, color 0.18s ease,
    box-shadow 0.18s ease;
}

.nav-links a:hover {
  color: #e5e7eb;
  background-color: rgba(15, 23, 42, 0.7);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.9);
}

.nav-cta {
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: #e5e7eb;
  background: radial-gradient(circle at 30% 20%, #38bdf8, #0ea5e9);
  box-shadow: 0 12px 35px rgba(56, 189, 248, 0.45);
}

.hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(148, 163, 184, 0.4);
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.2), transparent
        65%),
    radial-gradient(circle at bottom right, rgba(129, 140, 248, 0.35),
        transparent 60%),
    linear-gradient(135deg, #020617, #020617 48%, #020617 100%);
}

.hero-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px 46px;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 32px;
  align-items: stretch;
}

.hero-copy {
  max-width: 640px;
}

.hero-copy h1 {
  margin: 6px 0 14px;
  font-size: clamp(2.1rem, 4vw, 2.8rem);
}

.hero-copy p {
  margin: 0;
  color: var(--text-muted);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 10px 3px 4px;
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e5e7eb;
  background-color: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.5);
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.8);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
}

.stat {
  min-width: 120px;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.stat-value {
  font-weight: 600;
  font-size: 0.98rem;
}

.hero-panel {
  display: flex;
  align-items: stretch;
}

.hero-panel-card {
  border-radius: 18px;
  padding: 18px 18px 20px;
  width: 100%;
  max-width: 340px;
  margin-left: auto;
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.22),
        rgba(15, 23, 42, 0.95)),
    linear-gradient(135deg, #020617, #020617);
  border: 1px solid rgba(148, 163, 184, 0.7);
  box-shadow:
    0 18px 55px rgba(15, 23, 42, 0.95),
    0 0 0 1px rgba(15, 23, 42, 0.7);
}

.panel-label {
  margin: 0 0 4px;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.9);
}

.panel-heading {
  margin: 0 0 10px;
  font-size: 1.02rem;
  font-weight: 600;
}

.panel-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 0.86rem;
  color: var(--text-muted);
}

.pill {
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.7);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.panel-list {
  margin: 12px 0 12px;
  padding-left: 1rem;
  font-size: 0.86rem;
  color: var(--text-muted);
}

.panel-list li + li {
  margin-top: 4px;
}

.panel-footer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

.panel-price {
  font-size: 0.96rem;
  font-weight: 600;
}

.panel-note {
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.96);
}

.strip {
  border-bottom: 1px solid rgba(148, 163, 184, 0.45);
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(16px);
}

.strip-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 10px 20px 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  font-size: 0.9rem;
}

.strip-item {
  display: flex;
  flex-direction: column;
}

.strip-label {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.strip-value {
  font-weight: 500;
}

.section {
  padding: 40px 20px;
}

.section-inner {
  max-width: 1120px;
  margin: 0 auto;
  background: radial-gradient(circle at top left, rgba(15, 23, 42, 0.86),
        #020617);
  border-radius: 22px;
  padding: 26px 24px 28px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.95);
}

.section-alt {
  background: transparent;
}

.section h2 {
  margin: 0 0 10px;
  font-size: 1.35rem;
}

.section p {
  margin: 0;
  color: var(--text-muted);
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.list {
  padding-left: 1rem;
  margin: 4px 0 0;
  color: var(--text-muted);
}

.list li + li {
  margin-top: 4px;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 12px;
}

.media-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.media-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.media-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.media-arrow {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  background: rgba(15, 23, 42, 0.8);
  color: var(--text-main);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.media-counter {
  min-width: 40px;
  text-align: center;
}

.media-box {
  height: 170px;
  border-radius: 10px;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.media-text {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.map-wrap iframe {
  border-radius: 10px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 10px;
}

.nearby-list {
  list-style: none;
  padding: 12px 0 0;
  margin: 12px 0 0;
  border-top: 1px solid rgba(148, 163, 184, 0.4);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nearby-item {
  display: flex;
  flex-direction: column;
}

.nearby-label {
  font-size: 0.88rem;
  font-weight: 500;
  color: #e5e7eb;
}

.nearby-detail {
  font-size: 0.84rem;
  color: var(--text-muted);
}

.detail {
  padding: 10px 0;
  border-top: 1px solid var(--border-subtle);
}

.detail:first-child {
  border-top: none;
}

.detail h3 {
  margin: 0 0 4px;
  font-size: 0.98rem;
}

.detail p {
  margin: 0;
  color: var(--text-muted);
}

.section-form .section-inner {
  max-width: 960px;
}

.form-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr);
  gap: 24px;
  align-items: flex-start;
}

.form-copy p {
  margin-top: 6px;
}

form {
  margin-top: 4px;
}

form input,
form textarea,
form select {
  width: 100%;
  padding: 9px 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
  font-size: 0.95rem;
  font-family: inherit;
}

form textarea {
  min-height: 110px;
  resize: vertical;
}

.btn-primary,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  color: #e5e7eb;
  box-shadow: 0 18px 55px rgba(56, 189, 248, 0.55);
}

.btn-ghost {
  background-color: rgba(15, 23, 42, 0.9);
  color: var(--text-main);
  border-color: rgba(148, 163, 184, 0.5);
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  text-decoration: none;
  color: var(--accent-strong);
}

.site-footer {
  padding: 20px;
  font-size: 0.85rem;
  color: rgba(148, 163, 184, 0.95);
  text-align: center;
  border-top: 1px solid rgba(148, 163, 184, 0.45);
}

.site-footer p {
  margin: 4px 0;
}

@media (max-width: 768px) {
  .top-nav-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-wrap: wrap;
    row-gap: 6px;
  }

  .hero-inner {
    padding: 22px 14px 26px;
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-actions .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .hero-panel {
    display: none;
  }

  .section {
    padding: 22px 14px;
  }

  .section-inner {
    padding: 16px 14px 18px;
    border-radius: 16px;
  }

  .media-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .media-card {
    display: none;
  }

  .media-card.is-active {
    display: flex;
  }

  .media-controls {
    display: flex;
  }

  .map-wrap iframe {
    height: 220px;
  }

  .form-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .details-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  form button {
    width: 100%;
  }
}
</style>
