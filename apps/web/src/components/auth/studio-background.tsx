import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

// The reduced shader keeps the silk treatment from the supplied OGL preset while
// avoiding the unused editor effects and their additional work on every pixel.
const fragment = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float time = uTime * 0.10;
  vec2 tex = uv;
  tex.y += 0.03 * sin(8.0 * tex.x - time * 4.16);
  float fold = 0.6 + 0.4 * sin(
    5.0 * (tex.x + tex.y + cos(3.0 * tex.x + 5.0 * tex.y)
      + 0.02 * time * 4.16) + sin(20.0 * (tex.x + tex.y - 0.1 * time * 4.16))
  );
  vec3 low = vec3(0.040, 0.015, 0.018);
  vec3 mid = vec3(0.480, 0.025, 0.045);
  vec3 high = vec3(0.920, 0.550, 0.580);
  vec3 color = mix(low, mid, clamp(fold, 0.0, 1.0));
  color = mix(color, high, smoothstep(0.85, 1.0, fold) * 0.35);
  color -= hash(gl_FragCoord.xy) * 0.007;
  float vignette = smoothstep(1.10, 0.15, length((uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0)));
  fragColor = vec4(color * mix(0.72, 1.0, vignette), 1.0);
}`;

/** Decorative WebGL silk background used by the authentication page. */
export function StudioBackground() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const renderer = new Renderer({
			webgl: 2,
			alpha: false,
			antialias: false,
			dpr: 1,
		});
		const gl = renderer.gl;
		const canvas = gl.canvas as HTMLCanvasElement;
		canvas.style.cssText = "display:block;height:100%;width:100%;";
		container.appendChild(canvas);

		const program = new Program(gl, {
			vertex,
			fragment,
			uniforms: {
				uResolution: { value: new Float32Array([1, 1]) },
				uTime: { value: 0 },
			},
		});
		const geometry = new Triangle(gl);
		const mesh = new Mesh(gl, { geometry, program });

		const resize = () => {
			const { width: rawWidth, height: rawHeight } =
				container.getBoundingClientRect();
			const width = Math.max(1, Math.round(rawWidth));
			const height = Math.max(1, Math.round(rawHeight));
			const pixelBudget = 1280 * 720;
			renderer.dpr = Math.max(
				0.5,
				Math.min(
					window.devicePixelRatio || 1,
					2,
					Math.sqrt(pixelBudget / (width * height)),
				),
			);
			renderer.setSize(width, height);
			const resolution = program.uniforms.uResolution.value as Float32Array;
			resolution[0] = gl.drawingBufferWidth;
			resolution[1] = gl.drawingBufferHeight;
		};

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(container);
		resize();

		let frame = 0;
		let lastFrame = 0;
		let visible = !document.hidden;
		const onVisibilityChange = () => {
			visible = !document.hidden;
		};
		document.addEventListener("visibilitychange", onVisibilityChange);

		const render = (now: number) => {
			if (visible && now - lastFrame >= 1000 / 30) {
				program.uniforms.uTime.value = now / 1000;
				renderer.render({ scene: mesh });
				lastFrame = now;
			}
			frame = requestAnimationFrame(render);
		};
		renderer.render({ scene: mesh });
		frame = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			document.removeEventListener("visibilitychange", onVisibilityChange);
			program.remove();
			geometry.remove();
			gl.getExtension("WEBGL_lose_context")?.loseContext();
			canvas.remove();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="absolute inset-0 overflow-hidden bg-[#0d0405]"
			aria-hidden="true"
		/>
	);
}
