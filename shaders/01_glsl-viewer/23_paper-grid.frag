
#ifdef GL_ES
precision mediump float;
#endif

// source: https://thebookofshaders.com/07/

#define PI  3.14159265359
#define TAU 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float mystep(float x, float stx) {
	float a = step(x   + 0.05, stx);
	float b = step(stx + 0.05, x);
	return min(1.0, a + b);
}

void main() {
	vec2 st      = gl_FragCoord.xy / u_resolution.xy;
	float x      = 0.5;
	float left   = mystep(x, st.x);
	float bottom = mystep(x, st.y);
	vec3 shape   = vec3(left * bottom);
	vec3 bg      = vec3(0.0, 1.0, 0.0);
	gl_FragColor = vec4(shape * bg, 1.0);
}
