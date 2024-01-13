
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

float plot(vec2 st) {
	return smoothstep(0.02, 0.0, abs(st.y - st.x));
}

void main() {

	vec3 green = vec3(0.0, 1.0, 0.0);
	vec2 st = (gl_FragCoord.xy / u_resolution);
	float y = st.x;
	vec3 color = vec3(y);
	float pct = plot(st);
	color = (1.0-pct)*color+pct*green;
	gl_FragColor = vec4(color, 1.0);
}
