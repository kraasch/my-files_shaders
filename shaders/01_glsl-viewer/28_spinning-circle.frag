
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {

	vec2 uv = gl_FragCoord.xy / u_resolution;
	float pendulum = abs(mod(u_time, 2.0) - 1.0);
	float time = mod(u_time, 1.0);

	vec3 y = vec3(1.0, 1.0, 0.0);
	vec3 m = vec3(1.0, 0.0, 1.0);
	vec3 c = vec3(0.0, 1.0, 1.0);
	vec3 r = vec3(1.0, 0.0, 0.0);
	vec3 g = vec3(0.0, 1.0, 0.0);
	vec3 b = vec3(0.0, 0.0, 1.0);
	vec3 w = vec3(1.0);
	vec3 d = vec3(0.0);

	time       = time * PI * 2.0;
 	vec2 place = vec2(cos(time), sin(time));
 	place      = place * 0.2;
 	place      = place + 0.5;

	float pct    = distance(uv, place);
	vec3 color   = vec3(step(pct, 0.1));
	gl_FragColor = vec4(color*c + ((1.0-color)*b), 1.0);

}

