
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {

	vec2 uv        = gl_FragCoord.xy / u_resolution;
	float speed    = 0.4;
	float pendulum = abs(mod(u_time * speed, 2.0) - 1.0);
	float time     = mod(u_time     * speed, 1.0);
	vec3 y         = vec3(1.0, 1.0, 0.0);
	vec3 m         = vec3(1.0, 0.0, 1.0);
	vec3 c         = vec3(0.0, 1.0, 1.0);
	vec3 r         = vec3(1.0, 0.0, 0.0);
	vec3 g         = vec3(0.0, 1.0, 0.0);
	vec3 b         = vec3(0.0, 0.0, 1.0);
	vec3 w         = vec3(1.0);
	vec3 d         = vec3(0.0);

 	vec2 place   = vec2(0.5);
	float pct    = distance(uv, place);
	float pct_1  = pct*2.0;       // grow circle to the edges.
	float pct_2  = pct*sqrt(2.0); // grow circle to the corners.
	vec3 color_1 = vec3(1.0 - step(pendulum -pct_1, 0.0)) * b;
	vec3 color_2 = vec3(1.0 - step(time     -pct_2, 0.0)) * r;
	gl_FragColor = vec4(color_1 + color_2, 1.0);

}

