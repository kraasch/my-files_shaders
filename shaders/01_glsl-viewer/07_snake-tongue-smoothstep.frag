
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

// source:  Smoothstep: The most useful function -- The Art of Code -- https://www.youtube.com/watch?v=60VoL-F-jIQ

void main() {

	vec2 uv      = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.xy;
	vec3 green   =  vec3(0.0, 1.0, 0.0);
	vec3 color   =  vec3(0.0);
	float fork   =  smoothstep(0.0, 0.5, uv.y) * 0.1;
	float n      =  mix(0.05, 0.01, fork);
	float m      =  smoothstep(n, 0.0, abs(abs(uv.x)-fork));
	color       +=  m;
	gl_FragColor =  vec4(color, 1.0);
}
