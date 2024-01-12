
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

void main() {

	float x = gl_FragCoord.x;
	float y = gl_FragCoord.y;
	vec2 xy = vec2(x,y);

	// float time_fast   = u_time * 20.0;
	// float time_slow   = u_time * 0.01;
	// float time_normal = u_time;
	// float time_half   = u_time * 0.5;
	float time_double    = u_time * 2.0;
	float time           = time_double;

        // float r = abs(sin(time * 1.1 + 1.0));
        // float g = abs(sin(time * 1.2 + 2.0));
        // float b = abs(sin(time * 1.3 + 3.0));
	// float alpha = 1.0;
	// vec4 color = vec4(r, g, b, alpha);
	// vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
	// vec4 white = vec4(1.0, 1.0, 1.0, 1.0);

	vec2 st = (xy / u_resolution); //* abs(sin(u_time));
	vec2 mouse = u_mouse.xy / u_resolution;
	float interval = abs(sin(u_time)) * 2.0;

	float dist = distance(mouse, st);
	float radius = 0.3;

	if (dist < radius) {
		dist /= radius;
		gl_FragColor = vec4(0.0, 0.0, dist, 1.0);
	} else {
		if (interval < st.x + st.y) {
			gl_FragColor = vec4(1.0-st.y, 1.0-st.x, 0.0, 1.0);
		} else {
			gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
		}
	}
}
