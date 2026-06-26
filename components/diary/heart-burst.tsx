'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'

export function HeartBurst({
  onContinue,
}: {
  onContinue?: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasHostRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const heartGroupRef = useRef<THREE.Group | null>(null)
  const sparkleRef = useRef<THREE.Points | null>(null)
  const interactionRef = useRef({ scale: 1, sparkle: 1 })

  useEffect(() => {
    const container = containerRef.current
    const canvasHost = canvasHostRef.current

    if (!container || !canvasHost) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    })

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.18
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.className = 'h-full w-full'
    renderer.domElement.style.display = 'block'
    canvasHost.appendChild(renderer.domElement)

    camera.position.set(0, 0.15, 8.2)

    scene.add(new THREE.AmbientLight(0xffd9cf, 1.15))

    const keyLight = new THREE.DirectionalLight(0xfff1dc, 3.2)
    keyLight.position.set(3.5, 3.2, 5)
    scene.add(keyLight)

    const rimLight = new THREE.PointLight(0xff4f70, 18, 14)
    rimLight.position.set(-3.2, -1.4, 3.4)
    scene.add(rimLight)

    const warmGlint = new THREE.PointLight(0xffc47a, 12, 12)
    warmGlint.position.set(2.6, -1.8, 4)
    scene.add(warmGlint)

    const heartShape = new THREE.Shape()
    heartShape.moveTo(0, -1.55)
    heartShape.bezierCurveTo(-2.25, -0.05, -1.95, 1.48, -0.76, 1.62)
    heartShape.bezierCurveTo(-0.25, 1.68, 0, 1.36, 0, 1.02)
    heartShape.bezierCurveTo(0, 1.36, 0.25, 1.68, 0.76, 1.62)
    heartShape.bezierCurveTo(1.95, 1.48, 2.25, -0.05, 0, -1.55)

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.86,
      bevelEnabled: true,
      bevelSegments: 22,
      bevelSize: 0.2,
      bevelThickness: 0.28,
      curveSegments: 96,
    })
    heartGeometry.center()

    const heartMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd60b27,
      clearcoat: 1,
      clearcoatRoughness: 0.09,
      emissive: 0x4a0010,
      emissiveIntensity: 0.28,
      metalness: 0.12,
      roughness: 0.16,
      sheen: 0.45,
      specularIntensity: 1,
    })

    const heart = new THREE.Mesh(heartGeometry, heartMaterial)
    heart.rotation.z = Math.PI

    const heartGroup = new THREE.Group()
    heartGroup.add(heart)
    heartGroupRef.current = heartGroup
    scene.add(heartGroup)

    const sparkleCount = 420
    const sparklePositions = new Float32Array(sparkleCount * 3)
    const sparkleBase = new Float32Array(sparkleCount * 3)
    const sparklePhase = new Float32Array(sparkleCount)

    for (let i = 0; i < sparkleCount; i += 1) {
      const angle = Math.random() * Math.PI * 2
      const radius = 1.4 + Math.random() * 1.65
      const vertical = (Math.random() - 0.5) * 3.4
      const depth = (Math.random() - 0.5) * 2.2
      const index = i * 3

      sparkleBase[index] = Math.cos(angle) * radius
      sparkleBase[index + 1] = vertical
      sparkleBase[index + 2] = Math.sin(angle) * 0.65 + depth
      sparklePositions[index] = sparkleBase[index]
      sparklePositions[index + 1] = sparkleBase[index + 1]
      sparklePositions[index + 2] = sparkleBase[index + 2]
      sparklePhase[i] = Math.random() * Math.PI * 2
    }

    const sparkleGeometry = new THREE.BufferGeometry()
    sparkleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(sparklePositions, 3)
    )

    const sparkleMaterial = new THREE.PointsMaterial({
      color: 0xffd8a8,
      depthWrite: false,
      opacity: 0.8,
      size: 0.055,
      sizeAttenuation: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial)
    sparkleRef.current = sparkles
    scene.add(sparkles)

    const resize = () => {
      const width = Math.max(canvasHost.clientWidth, 1)
      const height = Math.max(canvasHost.clientHeight, 1)

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.position.z = width < 360 ? 8.8 : 8.2
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvasHost)
    resize()

    const startedAt = window.performance.now()

    const animate = () => {
      const elapsed = (window.performance.now() - startedAt) / 1000
      const interaction = interactionRef.current
      const pulse = 1 + Math.sin(elapsed * 1.6) * 0.018

      heartGroup.scale.setScalar(interaction.scale * pulse)
      heartGroup.rotation.x = -0.14 + Math.sin(elapsed * 0.7) * 0.08
      heartGroup.rotation.y = Math.sin(elapsed * 0.78) * 0.34
      heartGroup.rotation.z = Math.sin(elapsed * 0.48) * 0.04

      warmGlint.position.x = Math.sin(elapsed * 1.1) * 2.6
      warmGlint.position.y = Math.cos(elapsed * 0.9) * 1.8

      const position = sparkleGeometry.getAttribute(
        'position'
      ) as THREE.BufferAttribute
      const drift = 0.035 * interaction.sparkle

      for (let i = 0; i < sparkleCount; i += 1) {
        const index = i * 3
        const phase = sparklePhase[i]

        position.setXYZ(
          i,
          sparkleBase[index] + Math.sin(elapsed * 1.25 + phase) * drift,
          sparkleBase[index + 1] + Math.cos(elapsed * 1.55 + phase) * drift,
          sparkleBase[index + 2] + Math.sin(elapsed * 1.05 + phase) * drift
        )
      }

      position.needsUpdate = true
      sparkles.rotation.y = -elapsed * 0.12
      sparkles.rotation.z = Math.sin(elapsed * 0.55) * 0.08
      sparkleMaterial.opacity =
        0.55 + Math.sin(elapsed * 3.2) * 0.1 + interaction.sparkle * 0.18
      sparkleMaterial.size = 0.045 + interaction.sparkle * 0.018

      renderer.render(scene, camera)
      animationRef.current = window.requestAnimationFrame(animate)
    }

    gsap.fromTo(
      container,
      {
        opacity: 0,
        scale: 0.72,
        y: 18,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.15,
        ease: 'power4.out',
      }
    )

    gsap.to(glowRef.current, {
      scale: 1.16,
      opacity: 0.72,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    animate()

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current)
      }

      resizeObserver.disconnect()
      gsap.killTweensOf(container)
      gsap.killTweensOf(glowRef.current)
      gsap.killTweensOf(interactionRef.current)

      heartGeometry.dispose()
      heartMaterial.dispose()
      sparkleGeometry.dispose()
      sparkleMaterial.dispose()
      renderer.dispose()

      if (renderer.domElement.parentElement === canvasHost) {
        canvasHost.removeChild(renderer.domElement)
      }

      heartGroupRef.current = null
      sparkleRef.current = null
    }
  }, [])

  const burst = () => {
    gsap.to(interactionRef.current, {
      scale: 1.12,
      sparkle: 1.9,
      duration: 0.45,
      ease: 'back.out(2)',
    })

    gsap.to(glowRef.current, {
      opacity: 0.92,
      scale: 1.38,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const rebuild = () => {
    gsap.to(interactionRef.current, {
      scale: 1,
      sparkle: 1,
      duration: 0.55,
      ease: 'power3.out',
    })

    gsap.to(glowRef.current, {
      opacity: 0.72,
      scale: 1.16,
      duration: 0.45,
      ease: 'power2.out',
    })
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/25 backdrop-blur-[2px]">
      <div
        ref={containerRef}
        onPointerEnter={burst}
        onPointerLeave={rebuild}
        onPointerDown={burst}
        onPointerUp={rebuild}
        className="relative h-[min(72vw,520px)] w-[min(72vw,520px)] cursor-pointer sm:h-[520px] sm:w-[520px]"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/35 blur-3xl"
        />

        <div
          ref={canvasHostRef}
          aria-hidden="true"
          className="absolute inset-0 z-10"
        />

        <div className="pointer-events-none absolute inset-0 z-20 rounded-full bg-[radial-gradient(circle_at_48%_38%,rgba(255,230,210,0.18),transparent_24%,transparent_72%,rgba(255,90,120,0.08))]" />
      </div>

      <button
        onClick={onContinue}
        className="mt-8 rounded-full border border-gold/40 px-6 py-2 text-parchment transition hover:bg-gold/10"
      >
        Continue
      </button>
    </div>
  )
}
