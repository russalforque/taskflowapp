<template>
    <div class="loading-box">
        <div class="lds-ripple">
            <div></div>
            <div></div>
        </div>
        <div>{{ text }}</div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            required: false,
            type: String,
            default: 'Loading',
        },
    },
};
</script>

<style scoped>
.loading-box {
    position: fixed;
    top: 50%;
    width: 25%;
    margin: auto;
    z-index: 999;
    left: 0;
    right: 0;
    text-align: center;
}

.lds-ripple {
  color: #000
}
.lds-ripple,
.lds-ripple div {
  box-sizing: border-box;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid currentColor;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    opacity: 0;
  }
}
</style>