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
uniform vec2 u_resolution;
varying vec2 vUv;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    // Tacky Casino Carpet Pattern
    
    // Create a tiling grid
    vec2 grid = st * 6.0; // Scale of the pattern
    
    // Diamond / Damask pattern base
    vec2 g_fv = fract(grid) - 0.5;
    vec2 g_id = floor(grid);
    
    // Pattern Maths: Sines and weird mods
    float d = length(g_fv);
    
    // Swirly ornamentation
    float swirls = sin(grid.x * 2.0 + sin(grid.y * 3.0 + u_time * 0.2)) * cos(grid.y * 2.0);
    
    // Geometric backing
    float geom = sin(g_id.x * 0.5 + u_time * 0.1) * cos(g_id.y * 0.5);
    
    // Combine for maximum busy-ness
    float pattern = swirls + geom * 0.5;
    
    // Complex kaleidoscopic effect
    pattern += sin(length(g_fv * 2.0) * 10.0 - u_time * 0.5) * 0.2;

    // Color Palette: The "High Roller Suite"
    vec3 redVelvet = vec3(0.35, 0.0, 0.05); // Deep, dark red
    vec3 goldLeaf = vec3(0.8, 0.6, 0.1);    // Tacky gold
    vec3 royalPurple = vec3(0.2, 0.0, 0.4); // Purple shadows
    
    // Mixing logic based on pattern intensity
    vec3 color = redVelvet;
    
    // Add purple shadows in the "valleys" of the pattern
    color = mix(color, royalPurple, smoothstep(-1.0, -0.2, pattern));
    
    // Add gold "embroidery" on the peaks
    // Using abs() or smoothstep for thin lines
    float goldMask = smoothstep(0.4, 0.5, pattern) - smoothstep(0.5, 0.6, pattern);
    // Also gold swirls
    goldMask += smoothstep(0.6, 0.7, sin(pattern * 5.0));
    
    color = mix(color, goldLeaf, clamp(goldMask, 0.0, 1.0));

    // Texture: Make it look like fabric/carpet
    // Fine noise or scanlines
    float thread = sin((st.x + st.y) * 400.0) * 0.05;
    color += thread;
    
    // Vignette for dramatic effect
    float vignette = smoothstep(1.5, 0.2, length(vUv - 0.5));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
}
`;

export default function ShaderBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

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
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
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
            className="fixed inset-0 -z-10 pointer-events-none no-print"
            style={{ isolation: 'isolate' }}
        />
    );
}
