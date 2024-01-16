
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
	float radius = 0.2;
	gl_FragColor = b;

	if (length(uv - mouse.xy) < radius) {
		gl_FragColor = c;
	}

}

