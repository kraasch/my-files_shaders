
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

void main() {

	float x = gl_FragCoord.x;

	float time_fast   = u_time * 20.0;
	float time_slow   = u_time * 0.01;
	float time_normal = u_time;
	float time_double = u_time * 2.0;
	float time_half   = u_time * 0.5;

	float time        = time_double;

        float r = abs(sin(time * 1.1 + 1.0));
        float g = abs(sin(time * 1.2 + 2.0));
        float b = abs(sin(time * 1.3 + 3.0));
	float alpha = 1.0;

	vec4 color = vec4(r, g, b, alpha);

	gl_FragColor = vec4(color);
}
