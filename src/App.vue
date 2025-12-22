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
            <section id="overview" class="hero" :style="heroBackground">
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
                            <a href="#preleasing" class="btn-primary" @click="wantsShowing = false">
                                Join pre-leasing list
                            </a>
                            <a href="#preleasing" class="btn-primary" @click="wantsShowing = true">
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

            <!-- LIVING DESCRIPTION -->
            <section class="section">
                <div class="section-inner">
                    <h2>Modern, low-maintenance living</h2>
                    <p>
                        Pilot Station Place offers brand-new duplex homes just outside
                        Goldsboro. Enjoy modern finishes, energy-efficient construction, and
                        quiet surroundings that are ideal for military members,
                    </p>
                </div>
            </section>

            <!-- MEDIA PLACEHOLDERS -->
            <section id="photos" class="section">
                <div class="section-inner">
                    <div class="media-header">
                        <div class="media-title-with-info">
                            <h2>Photos & floor plans</h2>
                            <div class="media-info-tooltip" aria-label="Renderings; final homes may vary">
                                <span class="media-info-icon">i</span>
                                <span class="media-info-text">
                                    Renderings only; final homes may vary slightly.
                                </span>
                            </div>
                        </div>
                        <div class="media-controls">
                            <button
                                type="button"
                                class="media-arrow"
                                @click="prevPhoto"
                                aria-label="Previous photo"
                            >
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
                            <div class="media-box" @click="openLightbox(index)">
                                <img
                                    :src="photo.src"
                                    :alt="photo.alt"
                                    :style="{ objectFit: photo.fit || 'cover' }"
                                />
                            </div>
                            <p class="media-text">
                                <strong>{{ photo.title }}</strong>
                                <br />
                                {{ photo.description }}
                            </p>
                        </article>
                    </div>

                    <!-- LIGHTBOX FOR PHOTOS -->
                    <div
                        v-if="activeLightboxPhoto"
                        class="lightbox-backdrop"
                        @click.self="closeLightbox"
                    >
                        <div class="lightbox-dialog">
                            <button
                                type="button"
                                class="lightbox-close"
                                @click="closeLightbox"
                                aria-label="Close image"
                            >
                                x
                            </button>
                            <div class="lightbox-image-wrap">
                                <img
                                    :src="activeLightboxPhoto.src"
                                    :alt="activeLightboxPhoto.alt"
                                />
                            </div>
                            <p class="lightbox-caption">
                                <strong>{{ activeLightboxPhoto.title }}</strong>
                                <br />
                                {{ activeLightboxPhoto.description }}
                            </p>
                        </div>
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
                                <span class="nearby-detail">Close to Berkeley Blvd retailers, groceries, and
                                    restaurants.</span>
                            </li>
                            <li class="nearby-item">
                                <span class="nearby-label">Schools & everyday services</span>
                                <span class="nearby-detail">Area schools, medical offices, and daily conveniences within
                                    a short drive.</span>
                            </li>
                        </ul>
                    </div>
                    <div class="map-wrap">
                        <iframe src="https://www.google.com/maps?q=35.288056,-77.895&hl=en&z=16&output=embed"
                            width="100%" height="280" style="border: 0;" loading="lazy" allowfullscreen></iframe>
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
                        <h2>Join the pre-leasing list</h2>
                        <p>
                            Join the interest list for Pilot Station Place. You can also
                            optionally request a showing by checking the box below.
                        </p>
                        <div class="form-status" aria-live="polite">
                            <div
                                v-if="submitStatus === 'success'"
                                class="form-banner form-banner-success"
                            >
                                Thank you! Your information has been received. We'll be in touch soon.
                            </div>
                            <div
                                v-else-if="submitStatus === 'error'"
                                class="form-banner form-banner-error"
                            >
                                Something went wrong submitting the form. Please try again in a
                                moment.
                            </div>
                        </div>
                    </div>
                    <form
                        name="interest"
                        method="POST"
                        data-netlify="true"
                        @submit.prevent="handleSubmit"
                    >
                        <input type="hidden" name="form-name" value="interest" />
                        <input type="hidden" name="interestType" :value="interestType" />
                        <input type="text" name="name" placeholder="Full name" required />
                        <input type="email" name="email" placeholder="Email address" required />
                        <input type="tel" name="phone" placeholder="Phone number" />
                        <label class="showing-toggle">
                            <input type="checkbox" name="requestShowing" value="yes" v-model="wantsShowing" />
                            <span>Also request a showing</span>
                        </label>
                        <textarea name="details" placeholder="Move-in timeline or questions"></textarea>
                        <textarea v-if="wantsShowing" name="showingDetails"
                            placeholder="Preferred showing days / times and any questions"></textarea>
                        <button type="submit" class="btn-primary" :disabled="isSubmitting">
                            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
                        </button>
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
import { computed, onMounted, ref } from 'vue';
import heroImage from '../images/Render.png';
import frontImage from '../images/Front.png';
import kitchenImage from '../images/Kitchen Render.png';
import bathroomImage from '../images/Bathroom Render.png';
import floorPlanImage from '../images/floor plan.png';

const wantsShowing = ref(false);
const interestType = computed(() => (wantsShowing.value ? 'showing' : 'join'));

const isSubmitting = ref(false);
const submitStatus = ref(null); // 'success' | 'error' | null

const photos = [
    {
        title: 'Front exterior',
        description: 'Street view of the duplex homes.',
        src: frontImage,
        alt: 'Front exterior of Pilot Station Place duplex homes',
        fit: 'cover',
    },
    {
        title: 'Kitchen and living area',
        description: 'Open kitchen and living space with modern finishes.',
        src: kitchenImage,
        alt: 'Interior view of the kitchen and living area',
        fit: 'cover',
    },
    {
        title: 'Bathroom finishes',
        description: 'Bathroom with modern fixtures and clean finishes.',
        src: bathroomImage,
        alt: 'Interior bathroom finishes',
        fit: 'cover',
    },
    {
        title: 'Floor plan',
        description: '2 bed / 2 bath layout for each duplex home.',
        src: floorPlanImage,
        alt: 'Floor plan of the 2 bed 2 bath duplex home',
        fit: 'cover',
    },
];

const activePhotoIndex = ref(0);
const lightboxIndex = ref(null);

const nextPhoto = () => {
    activePhotoIndex.value = (activePhotoIndex.value + 1) % photos.length;
};

const prevPhoto = () => {
    activePhotoIndex.value =
        (activePhotoIndex.value - 1 + photos.length) % photos.length;
};

const openLightbox = (index) => {
    lightboxIndex.value = index;
};

const closeLightbox = () => {
    lightboxIndex.value = null;
};

const activeLightboxPhoto = computed(() =>
    lightboxIndex.value === null ? null : photos[lightboxIndex.value]
);

const handleSubmit = async (event) => {
    const form = event.target;

    if (isSubmitting.value) return;

    isSubmitting.value = true;
    submitStatus.value = null;

    try {
        const formData = new FormData(form);

        const payload = {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone') || '',
            interestType: formData.get('interestType') || interestType.value,
            details: formData.get('details') || '',
            // Map to `message` as well so the Faltor `contact`
            // function (which requires name, email, message)
            // can be used as a backend.
            message: formData.get('details') || '',
            showingDetails: formData.get('showingDetails') || '',
            site_url: window.location.origin,
        };

        // Use a configurable function URL so production can point at
        // the working Faltor Drafting function, while dev can still
        // hit the local Netlify function.
        const functionUrl = import.meta.env.VITE_SUBMISSION_FUNCTION_URL || '/.netlify/functions/submission-created';

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Form submission failed');

        submitStatus.value = 'success';
        form.reset();
        wantsShowing.value = false;
    } catch (error) {
        console.error(error);
        submitStatus.value = 'error';
    } finally {
        isSubmitting.value = false;
    }
};

const heroBackground = computed(() => ({
    backgroundImage: `linear-gradient(135deg, rgba(2, 6, 23, 0.78), rgba(2, 6, 23, 0.7)), url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 65%',
    backgroundRepeat: 'no-repeat',
}));

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
        radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), transparent 55%),
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
        radial-gradient(circle at top left, rgba(56, 189, 248, 0.2), transparent 65%),
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

.panel-list li+li {
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

.list li+li {
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
    cursor: pointer;
}

.media-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.media-title-with-info {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.media-info-tooltip {
    position: relative;
    display: inline-flex;
    align-items: center;
}

.media-info-icon {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    border: 1px solid var(--border-subtle);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: var(--text-muted);
    background-color: rgba(15, 23, 42, 0.9);
    cursor: default;
}

.media-info-text {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 8px);
    transform: translateX(-50%);
    max-width: 320px;
    padding: 6px 10px;
    border-radius: 8px;
    background-color: rgba(15, 23, 42, 0.98);
    border: 1px solid var(--border-subtle);
    color: var(--text-muted);
    font-size: 0.78rem;
    line-height: 1.3;
    box-shadow: 0 14px 35px rgba(15, 23, 42, 0.9);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.16s ease, transform 0.16s ease;
    z-index: 10;
}

.media-info-tooltip:hover .media-info-text {
    opacity: 1;
    transform: translate(-50%, -4px);
}

.media-controls {
    display: none;
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
    height: 150px;
    border-radius: 10px;
    background-color: #020617;
    overflow: hidden;
}

.media-box img {
    width: 100%;
    height: 100%;
    display: block;
}

.media-text {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.9rem;
    text-align: center;
}

.media-disclaimer {
    margin-top: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--text-muted);
}

.media-disclaimer-icon {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    border: 1px solid var(--border-subtle);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
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

.lightbox-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 40;
}

.lightbox-dialog {
    max-width: 960px;
    width: 100%;
    padding: 18px 18px 20px;
    border-radius: 18px;
    background: #020617;
    border: 1px solid var(--border-subtle);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
}

.lightbox-image-wrap {
    border-radius: 12px;
    overflow: hidden;
    height: min(70vh, 600px);
    max-width: 100%;
}

.lightbox-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: #020617;
}

.lightbox-caption {
    margin: 10px 0 0;
    font-size: 0.9rem;
    color: var(--text-muted);
    text-align: left;
}

.lightbox-close {
    position: absolute;
    top: 14px;
    right: 18px;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    border: 1px solid var(--border-subtle);
    background: rgba(15, 23, 42, 0.95);
    color: var(--text-main);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
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

.showing-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 4px 0 10px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid var(--border-subtle);
    background-color: rgba(15, 23, 42, 0.9);
    font-size: 0.88rem;
    color: var(--text-muted);
}

.showing-toggle input {
    width: auto;
    margin: 0;
    accent-color: var(--accent-strong);
}

.form-status {
    margin-top: 8px;
}

.form-banner {
    padding: 8px 10px;
    border-radius: 8px;
    font-size: 0.88rem;
    margin-top: 8px;
}

.form-banner-success {
    background-color: rgba(22, 163, 74, 0.16);
    border: 1px solid rgba(22, 163, 74, 0.7);
    color: #bbf7d0;
}

.form-banner-error {
    background-color: rgba(220, 38, 38, 0.18);
    border: 1px solid rgba(239, 68, 68, 0.85);
    color: #fecaca;
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
