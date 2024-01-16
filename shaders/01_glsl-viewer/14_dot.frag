
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {

	vec2 uv = gl_FragCoord.xy / u_resolution;
	float time = abs(mod(u_time, 2.0) - 1.0);

	vec3 y = vec3(1.0, 1.0, 0.0);
	vec3 m = vec3(1.0, 0.0, 1.0);
	vec3 c = vec3(0.0, 1.0, 1.0);
	vec3 r = vec3(1.0, 0.0, 0.0);
	vec3 g = vec3(0.0, 1.0, 0.0);
	vec3 b = vec3(0.0, 0.0, 1.0);
	vec3 w = vec3(1.0);
	vec3 d = vec3(0.0);

 	vec3 change = vec3(time);
	float radius = 0.2;

	if (length(uv - 0.5) < radius) {
		gl_FragColor = vec4(b, 1.0);
	}

}

