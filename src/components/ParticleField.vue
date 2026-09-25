<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const host = ref(null)

let renderer = null
let scene = null
let camera = null
let group = null
let particles = null
let shell = null
let clock = null
let frameId = null
let observer = null
let running = true

const pointer = { x: 0, y: 0 }
const eased = { x: 0, y: 0 }

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function buildScene() {
  const width = host.value.clientWidth || window.innerWidth
  const height = host.value.clientHeight || window.innerHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
  camera.position.set(0, 0, 9)

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)
  host.value.appendChild(renderer.domElement)

  group = new THREE.Group()
  scene.add(group)

  // ---- Particle nebula ------------------------------------------------
  const count = 1700
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  const violet = new THREE.Color('#7c5cff')
  const cyan = new THREE.Color('#22d3ee')
  const magenta = new THREE.Color('#ff2d95')
  const tmp = new THREE.Color()

  const radius = 5.6

  for (let i = 0; i < count; i++) {
    const r = radius * (0.55 + Math.random() * 0.5)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.74
    positions[i * 3 + 2] = r * Math.cos(phi)

    if (Math.random() < 0.5)
      tmp.copy(violet).lerp(cyan, Math.random())
    else
      tmp.copy(cyan).lerp(magenta, Math.random() * 0.7)

    colors[i * 3] = tmp.r
    colors[i * 3 + 1] = tmp.g
    colors[i * 3 + 2] = tmp.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  })

  particles = new THREE.Points(geometry, material)
  group.add(particles)

  // ---- Wireframe shell ------------------------------------------------
  const shellGeo = new THREE.IcosahedronGeometry(radius + 0.25, 1)
  const shellMat = new THREE.MeshBasicMaterial({
    color: '#5b5bff',
    wireframe: true,
    transparent: true,
    opacity: 0.09,
  })
  shell = new THREE.Mesh(shellGeo, shellMat)
  group.add(shell)

  clock = new THREE.Clock()
}

function animate() {
  frameId = requestAnimationFrame(animate)

  if (!running || !renderer)
    return

  const t = clock.getElapsedTime()

  eased.x += (pointer.x - eased.x) * 0.05
  eased.y += (pointer.y - eased.y) * 0.05

  group.rotation.y = t * 0.06 + eased.x * 0.55
  group.rotation.x = Math.sin(t * 0.14) * 0.08 + eased.y * 0.35

  if (shell) {
    shell.rotation.y = -t * 0.05
    shell.rotation.z = t * 0.02
  }

  if (particles)
    particles.rotation.z = t * 0.03

  renderer.render(scene, camera)
}

function onResize() {
  if (!renderer || !host.value)
    return

  const width = host.value.clientWidth || window.innerWidth
  const height = host.value.clientHeight || window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = (event.clientY / window.innerHeight) * 2 - 1
}

function dispose() {
  if (frameId)
    cancelAnimationFrame(frameId)

  observer?.disconnect()
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onPointerMove)

  if (particles) {
    particles.geometry.dispose()
    particles.material.dispose()
  }

  if (shell) {
    shell.geometry.dispose()
    shell.material.dispose()
  }

  renderer?.dispose()
  renderer?.domElement?.remove()
  renderer = null
}

onMounted(() => {
  if (!host.value)
    return

  buildScene()

  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })

  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting
    })
    observer.observe(host.value)
  }

  if (reduceMotion()) {
    // Render a single static frame instead of animating.
    renderer.render(scene, camera)
    return
  }

  animate()
})

onBeforeUnmount(dispose)
</script>

<template>
  <div ref="host" class="particle-field" aria-hidden="true" />
</template>

<style scoped>
.particle-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.particle-field :deep(canvas) {
  width: 100%;
  height: 100%;
}
</style>
