<template>
    <div class="app-shell">
        <TopNav />
        <main>
            <RouterView />
        </main>
        <SiteFooter />
    </div>
</template>

<script setup>
import TopNav from './components/TopNav.vue';
import SiteFooter from './components/SiteFooter.vue';
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
