<template>
    <section id="location" class="section section-alt">
        <div class="section-inner section-grid">
            <div>
                <h2>Easy access to everything</h2>
                <p>
                    {{ property.address }}.<br />
                    A small duplex community tucked just off key corridors, with
                    everyday essentials only a short drive away.
                </p>
                <ul class="nearby-list" aria-label="Nearby destinations">
                    <li v-for="item in property.nearby" :key="item.label" class="nearby-item">
                        <span class="nearby-label">{{ item.label }}</span>
                        <span class="nearby-detail">{{ item.detail }}</span>
                    </li>
                </ul>
            </div>
            <div class="map-wrap">
                <iframe
                    :src="`https://www.google.com/maps?q=${property.mapQuery}&hl=en&z=16&output=embed`"
                    width="100%"
                    height="280"
                    style="border: 0;"
                    loading="lazy"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    </section>
</template>

<script setup>
defineProps({
    property: { type: Object, required: true },
});
</script>
