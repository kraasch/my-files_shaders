
#ifdef GL_ES
precision mediump float;
#endif

// source:https://thebookofshaders.com/07/

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 y = vec3(1.0, 1.0, 0.0);
vec3 m = vec3(1.0, 0.0, 1.0);
vec3 c = vec3(0.0, 1.0, 1.0);
vec3 r = vec3(1.0, 0.0, 0.0);
vec3 g = vec3(0.0, 1.0, 0.0);
vec3 b = vec3(0.0, 0.0, 1.0);
vec3 w = vec3(1.0);
vec3 dark = vec3(0.0);

void main(){
	vec2 uv        = gl_FragCoord.xy / u_resolution;
	float speed    = 0.4;
	float pendulum = abs(mod(u_time * speed, 2.0) - 1.0);
	float time     = mod(u_time     * speed, 1.0);

	vec3 color = vec3(0.0);
	float d = 0.0;

	// Remap the space to -1. to 1.
	uv = uv * 2.0 - 1.0;
	// uv = vec2(0.5) - uv;

	// Make the distance field
	vec2 uv2 = abs(uv) - 0.3;
	d = length(uv2);
	// d = length(min(uv2, 0.0));
	// d = length(max(uv2, 0.0));
	// d = max(uv2.x, uv2.y);
	// d = min(uv2.x, uv2.y);
	// d = uv2.x;
	// d = abs(uv.x - 0.2);
	// d = abs(uv2.x);
	// d = abs(uv.x * uv.y);
	// d = abs(uv.x + uv.y);
	// d = abs(uv.y / uv.x);
	// d = abs(uv.x / uv.y);

	// Visualize the distance field
	float res = 0.0;
	// res = fract(d);
	// res = fract(d * 2.0);
	// res = fract(d * 4.0);
	// res = fract(d * 20.0);
	res = fract(d * 10.0);
	// res = step(0.3, d);
	// res = step(0.3, d) * step(d, 0.4);
	// res = step(0.4, d) * step(d, 0.5);
	// res = smoothstep(0.3, 0.4, d) * smoothstep(0.6, 0.5, d);
	// res = step(d, 1.0);
	gl_FragColor = vec4(vec3(res), 1.0);

}


