<template>
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
                    <button type="button" class="media-arrow" @click="$emit('prevPhoto')" aria-label="Previous photo"></button>
                    <span class="media-counter">
                        {{ activePhotoIndex + 1 }} / {{ photos.length }}
                    </span>
                    <button type="button" class="media-arrow" @click="$emit('nextPhoto')" aria-label="Next photo"> </button>
                </div>
            </div>
            <div class="media-grid">
                <article v-for="(photo, index) in photos" :key="photo.title" class="media-card" :class="{ 'is-active': index === activePhotoIndex }">
                    <div class="media-box" @click="$emit('openLightbox', index)">
                        <img :src="photo.src" :alt="photo.alt" :style="{ objectFit: photo.fit || 'cover' }" />
                    </div>
                    <p class="media-text">
                        <strong>{{ photo.title }}</strong>
                        <br />
                        {{ photo.description }}
                    </p>
                </article>
            </div>
            <div v-if="activeLightboxPhoto" class="lightbox-backdrop" @click.self="$emit('closeLightbox')">
                <div class="lightbox-dialog">
                    <button type="button" class="lightbox-close" @click="$emit('closeLightbox')" aria-label="Close image">x</button>
                    <div class="lightbox-image-wrap">
                        <img :src="activeLightboxPhoto.src" :alt="activeLightboxPhoto.alt" />
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
</template>
<script setup>
import { defineProps } from 'vue';
defineProps({
    photos: Array,
    activePhotoIndex: Number,
    activeLightboxPhoto: Object,
});
</script>
