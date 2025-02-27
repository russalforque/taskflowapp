<template>
    <div 
        class="loading-container" 
        :class="{ 'loading-overlay': overlay }"
        role="alert" 
        aria-busy="true"
    >
        <div class="loading-box" :style="{ width: computedSize }">
            <!-- Primary Loader -->
            <div class="loader-wrapper">
                <div 
                    class="spinner"
                    :style="{ 
                        borderColor: `${color}20`,
                        borderTopColor: color,
                        width: rippleSize,
                        height: rippleSize,
                        borderWidth: thickness + 'px'
                    }"
                ></div>
                <div 
                    class="spinner-inner"
                    :style="{ 
                        borderColor: `${color}10`,
                        borderTopColor: color,
                        width: innerSpinnerSize,
                        height: innerSpinnerSize,
                        borderWidth: (thickness * 0.7) + 'px'
                    }"
                ></div>
            </div>

            <!-- Loading Text -->
            <div 
                v-if="text" 
                class="loading-text"
                :style="{ color: textColor }"
            >
                <span class="text">{{ text }}</span>
                <span v-if="showDots" class="loading-dots">
                    <span class="dot">•</span>
                    <span class="dot">•</span>
                    <span class="dot">•</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TheLoader',
    props: {
        text: {
            type: String,
            default: 'Loading',
        },
        color: {
            type: String,
            default: '#76ABAE',
        },
        textColor: {
            type: String,
            default: '#76ABAE',
        },
        size: {
            type: [String, Number],
            default: '100',
        },
        thickness: {
            type: Number,
            default: 3,
        },
        overlay: {
            type: Boolean,
            default: true,
        },
        showDots: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        computedSize() {
            const size = this.size;
            if (typeof size === 'number' || !isNaN(size)) {
                return `${parseInt(size)}px`;
            }
            return size.includes('px') ? size : `${size}px`;
        },
        rippleSize() {
            const size = parseInt(this.computedSize);
            return `${Math.floor(size * 0.8)}px`;
        },
        innerSpinnerSize() {
            const size = parseInt(this.rippleSize);
            return `${Math.floor(size * 0.65)}px`;
        }
    }
});
</script>

<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(24, 26, 30, 0.95);
    z-index: 9999;
    backdrop-filter: blur(4px);
}

.loading-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
}

.loader-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner {
    border-style: solid;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
}

.spinner-inner {
    position: absolute;
    border-style: solid;
    border-radius: 50%;
    animation: spin 0.8s linear infinite reverse;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-text {
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.loading-dots {
    display: inline-flex;
    gap: 2px;
    margin-left: 2px;
}

.dot {
    animation: dotFade 1.4s infinite;
    opacity: 0;
    font-size: 1.2rem;
    line-height: 0.5;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes dotFade {
    0%, 100% { opacity: 0; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-2px); }
}
</style>