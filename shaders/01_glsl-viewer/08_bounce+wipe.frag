#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

void main() {
	vec2 st       = gl_FragCoord.xy/u_resolution;

	vec3 red      = vec3(1.0, 0.0, 0.0);
	vec3 green    = vec3(0.0, 1.0, 0.0);
	vec3 blue     = vec3(0.0, 0.0, 1.0);
	vec3 yellow   = vec3(1.0, 1.0, 0.0);
	vec3 magenta  = vec3(1.0, 0.0, 1.0);
	vec3 cyan     = vec3(0.0, 1.0, 1.0);

	float y_a     = abs(mod(u_time * 0.5, 1.0) - 0.5) * 2.0;
	float y_b     = sin(abs(mod(u_time, PI)));
	vec3 color    =
		plot(st, y_a) * cyan +
		plot(st, y_b) * blue;
	gl_FragColor  = vec4(color,1.0);
}

