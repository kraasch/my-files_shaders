
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
vec3 d = vec3(0.0);

vec3 mkdot(vec3 bg, vec2 place, float radius, vec3 color, vec2 uv) {
	float border     = 0.03;
	float pct        = distance(uv, place);
	vec3 color_map   = vec3(1.0 - smoothstep(radius-border, radius+border, pct));
	vec3 res         = color_map * color;
	bg               = res + bg;
	return bg;
}

void main() {

	vec2 uv        = gl_FragCoord.xy / u_resolution;
	float speed    = 0.4;
	float pendulum = abs(mod(u_time * speed, 2.0) - 1.0);
	float time     = mod(u_time     * speed, 1.0);

	vec3 fg        = d;
	for (int i = 0; i < 5; i++) {
		float nth = float(i) / 10.0;
		float stp = pendulum;
		fg = mkdot(fg, vec2(0.5, 0.6 + stp * nth), 0.02, c, uv);
		fg = mkdot(fg, vec2(0.6 + stp * nth, 0.5), 0.02, r, uv);
		fg = mkdot(fg, vec2(0.5, 0.4 - stp * nth), 0.02, g, uv);
		fg = mkdot(fg, vec2(0.4 - stp * nth, 0.5), 0.02, m, uv);
	}
	gl_FragColor   = vec4(fg, 1.0);
}

