<template>
    <section class="section">
        <div class="section-inner">
            <h2>Modern, low-maintenance living</h2>
            <p>{{ property.description }}</p>
        </div>
    </section>
</template>

<script setup>
defineProps({
    property: { type: Object, required: true },
});
</script>
