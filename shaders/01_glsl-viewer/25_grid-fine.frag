
#ifdef GL_ES
precision mediump float;
#endif

// source: https://thebookofshaders.com/07/

#define PI  3.14159265359
#define TAU 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float margin        = 0.01;

float mystep(float x, float stx) {
	float a = step(x   + margin, stx);
	float b = step(stx + margin, x);
	return min(1.0, a + b);
}

float mycross(float shape, float x, float stx, float sty) {
	shape *= mystep(x, stx);
	shape *= mystep(x, sty);
	return shape;
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
	float shape = 1.0;
	for (int i = 1; i <= 5; i++) {
		shape *= mycross(shape, float(i) * 0.2 - 0.1, st.x, st.y);
	}
	vec3 bg      = vec3(0.0, 1.0, 0.0);
	gl_FragColor = vec4((1.0-shape)*bg, 1.0);
}
