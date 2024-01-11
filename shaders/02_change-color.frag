#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
        float r = abs(sin(u_time * 1.1 + 1.0));
        float g = abs(sin(u_time * 1.2 + 2.0));
        float b = abs(sin(u_time * 1.3 + 3.0));
	float alpha = 1.0;
	vec4 color = vec4(r, g, b, alpha);
	gl_FragColor = vec4(color);
}
