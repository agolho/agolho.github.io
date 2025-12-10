"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 vUv;

// Random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Noise function
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// FBM (Fractal Brownian Motion)
#define OCTAVES 5
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.0; // Higher lacunarity for more detail
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Scale up space to break up big blobs
    st *= 3.0; // was implicit 1.0

    // Mouse influence
    vec2 mouse = u_mouse / u_resolution.xy;
    mouse.x *= u_resolution.x / u_resolution.y;
    mouse *= 3.0; // Match st scale
    
    // Calculate distance from mouse for interaction
    float dist = distance(st, mouse);
    // Subtle distortion near mouse
    float interaction = smoothstep(1.5, 0.0, dist) * 0.15; // Increased range

    // Movement
    vec2 q = vec2(0.);
    q.x = fbm(st + 0.05 * u_time);
    q.y = fbm(st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

    float f = fbm(st + r + interaction);

    // Color Palette: Refined Technomancer (Deep, sophisticated, no fuschia)
    
    // Base: Deep Void/Slate
    vec3 color = vec3(0.02, 0.02, 0.05); 
    
    // Flow 1: Muted Cyan/Teal (Magic)
    vec3 col1 = vec3(0.05, 0.3, 0.35); 
    
    // Flow 2: Deep Indigo/Midnight Blue (Tech)
    vec3 col2 = vec3(0.1, 0.1, 0.4); 
    
    // Highlights: Subtle Silver/Ice Blue
    vec3 col3 = vec3(0.6, 0.7, 0.8); 

    // Mix logic
    color = mix(color, col1, clamp(length(q), 0.0, 1.0));
    color = mix(color, col2, clamp(length(r), 0.0, 1.0));

    // Highlights based on noise peaks - much thinner lines
    float highlight = smoothstep(0.85, 1.0, f*f*f + 0.6*length(q) + 0.6*length(r));
    color = mix(color, col3, highlight * 0.4); // reduced intensity

    // Vignette
    // Need to un-scale uv for vignette to work on screen coordinates
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float vignette = smoothstep(1.2, 0.2, length(uv - 0.5));
    color *= vignette;
    
    // Final subtle scanline/grain effect for texture?
    // color += (random(st) - 0.5) * 0.02;

    gl_FragColor = vec4(color, 1.0);
}
`;

export default function ManaFlowBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ alpha: true });

        const container = containerRef.current;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            u_time: { value: 0.0 },
            u_mouse: { value: new THREE.Vector2() },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const startTime = Date.now();

        const animate = () => {
            requestAnimationFrame(animate);
            uniforms.u_time.value = (Date.now() - startTime) * 0.001;

            // Smooth mouse follow (lerp could be added here for smoother movement, but direct is responsive)
            uniforms.u_mouse.value.x = mouseRef.current.x;
            uniforms.u_mouse.value.y = window.innerHeight - mouseRef.current.y; // Flip Y for WebGL

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{ isolation: 'isolate' }}
        />
    );
}
