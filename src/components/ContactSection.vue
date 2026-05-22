<template>
    <section id="contact" class="section section-form section-alt">
        <div class="section-inner form-layout">
            <div class="form-copy">
                <h2>Have questions?</h2>
                <p>
                    Prefer to talk? Call or email using the details below, or use the
                    pre-leasing form and we'll follow up with available times.
                </p>
                <p>
                    <strong>Phone:</strong>
                    <a :href="company.phoneHref">{{ company.phone }}</a><br />
                    <strong>Email:</strong>
                    <a :href="`mailto:${company.email}`">{{ company.email }}</a>
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { company } from '../data/properties.js';
</script>
