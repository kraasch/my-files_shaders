
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

void main() {

	// setup the uv.
	vec2 st = gl_FragCoord.xy / u_resolution;

	// create some colors.
	vec3 green = vec3(0.0, 1.0, 0.0);
	vec3 background = vec3(st.x);

	float line_map  = smoothstep(0.02, 0.0, abs(st.y - st.x));
	vec3  bg_part   = (1.0-line_map) * background;
	vec3  line_part =      line_map  * green;
	vec3  color     = bg_part + line_part;

	gl_FragColor = vec4(color, 1.0);
}
