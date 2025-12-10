"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GoldLiquidShader() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ alpha: true });

        const { clientWidth, clientHeight } = container;
        renderer.setSize(clientWidth, clientHeight);
        container.appendChild(renderer.domElement);

        const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

        const fragmentShader = `
      uniform float time;
      varying vec2 vUv;

      // Noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                            0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                           -0.577350269189626,  // -1.0 + 2.0 * C.x
                            0.024390243902439); // 1.0 / 41.0
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i); // Avoid truncation effects in permutation
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        
        // Flowing gold liquid effect
        float t = time * 0.2;
        float noise1 = snoise(uv * 3.0 + vec2(t, t * 0.5));
        float noise2 = snoise(uv * 6.0 - vec2(t * 0.8, t * 0.2));
        
        float combinedNoise = (noise1 + noise2 * 0.5) * 0.5 + 0.5;
        
        // Gold Palette
        vec3 darkGold = vec3(0.2, 0.1, 0.0); 
        vec3 midGold = vec3(0.8, 0.6, 0.1); 
        vec3 brightGold = vec3(1.0, 0.9, 0.4); 
        vec3 highlight = vec3(1.0, 1.0, 0.9);
        
        vec3 color = mix(darkGold, midGold, combinedNoise);
        color = mix(color, brightGold, smoothstep(0.4, 0.7, combinedNoise));
        color += highlight * smoothstep(0.8, 1.0, combinedNoise) * 0.5; // Specular shine

        gl_FragColor = vec4(color, 0.95); // High opacity
      }
    `;

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
            },
            vertexShader,
            fragmentShader,
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        const startTime = Date.now();
        let animationId: number;

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            material.uniforms.time.value = (Date.now() - startTime) * 0.001;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            renderer.setSize(clientWidth, clientHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none rounded-xl overflow-hidden opacity-30" />;
}
