<template>
  <div class="bg" aria-hidden="true">
    <div class="bg__grid" />
    <span class="bg__blob bg__blob--violet" />
    <span class="bg__blob bg__blob--cyan" />
    <span class="bg__blob bg__blob--magenta" />
    <div class="bg__scanlines" />
    <div class="bg__vignette" />
  </div>
</template>

<style scoped lang="scss">
.bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(1200px 700px at 80% -10%, rgba(124, 92, 255, 0.16), transparent 60%),
    radial-gradient(900px 600px at 0% 20%, rgba(34, 211, 238, 0.1), transparent 55%),
    var(--bg);
}

.bg__grid {
  position: absolute;
  inset: -20%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 62px 62px;
  mask-image: radial-gradient(circle at 50% 30%, #000 0%, transparent 78%);
  -webkit-mask-image: radial-gradient(circle at 50% 30%, #000 0%, transparent 78%);
  transform: perspective(700px) rotateX(52deg) translateY(-6%);
  transform-origin: center top;
  opacity: 0.5;
}

.bg__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.42;
  will-change: transform;
}

.bg__blob--violet {
  top: -80px;
  left: -60px;
  width: 460px;
  height: 460px;
  background: radial-gradient(circle, #7c5cff, transparent 68%);
  animation: float-a 22s ease-in-out infinite;
}

.bg__blob--cyan {
  top: 40%;
  right: -120px;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, #22d3ee, transparent 68%);
  animation: float-b 28s ease-in-out infinite;
}

.bg__blob--magenta {
  bottom: -140px;
  left: 30%;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, #ff2d95, transparent 70%);
  opacity: 0.28;
  animation: float-c 32s ease-in-out infinite;
}

.bg__scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.018) 0px,
    rgba(255, 255, 255, 0.018) 1px,
    transparent 1px,
    transparent 4px
  );
  opacity: 0.6;
}

.bg__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.65) 100%);
}

@keyframes float-a {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(80px, 60px, 0) scale(1.12);
  }
}

@keyframes float-b {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-90px, -50px, 0) scale(1.08);
  }
}

@keyframes float-c {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(60px, -70px, 0) scale(1.15);
  }
}
</style>
