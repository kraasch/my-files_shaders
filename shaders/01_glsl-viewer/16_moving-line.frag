
#ifdef GL_ES
precision mediump float;
#endif

// source: https://www.youtube.com/watch?v=cU5WcrU_YI4

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {

	vec2 uv = gl_FragCoord.xy / u_resolution;
	float time = abs(mod(u_time, 2.0) - 1.0);
	vec2 mouse = u_mouse.xy / u_resolution;

	vec4 y = vec4(1.0, 1.0, 0.0, 1.0);
	vec4 m = vec4(1.0, 0.0, 1.0, 1.0);
	vec4 c = vec4(0.0, 1.0, 1.0, 1.0);
	vec4 r = vec4(1.0, 0.0, 0.0, 1.0);
	vec4 g = vec4(0.0, 1.0, 0.0, 1.0);
	vec4 b = vec4(0.0, 0.0, 1.0, 1.0);
	vec4 w = vec4(1.0, 1.0, 1.0, 1.0);
	vec4 d = vec4(0.0, 0.0, 0.0, 1.0);

 	vec3 change = vec3(time);
	float radius = 0.05;
	float thick = 0.04;
	gl_FragColor = d;

	vec2 p1 = vec2(0.1, 0.2);
	vec2 p2 = mouse.xy;

	if (length(uv - p1) < radius) {
		gl_FragColor += r;
	}

	if (length(uv - p2) < radius) {
		gl_FragColor += r;
	}

	vec2 p3 = uv;
	vec2 p12 = p2 - p1;
	vec2 p13 = p3 - p1;

	float x = dot(p12, p13) / length(p12);
	vec2 p4 = p1 + normalize(p12) * x;

	if (length(p4 - p3) < thick * sin(time)
		&& length(p4 - p1) <= length(p12)
		&& length(p4 - p2) <= length(p12)) {
		gl_FragColor += g;
	}

}

