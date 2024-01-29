
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {

	vec2 uv = gl_FragCoord.xy / u_resolution;
	float time = abs(mod(u_time, 2.0) - 1.0);

	vec3 y = vec3(1.0, 1.0, 0.0);
	vec3 m = vec3(1.0, 0.0, 1.0);
	vec3 c = vec3(0.0, 1.0, 1.0);
	vec3 r = vec3(1.0, 0.0, 0.0);
	vec3 g = vec3(0.0, 1.0, 0.0);
	vec3 b = vec3(0.0, 0.0, 1.0);
	vec3 w = vec3(1.0);
	vec3 d = vec3(0.0);

 	vec3 change = vec3(time);
	float radius = 0.2;

	// draw cricle with LENGTH.
	float location_r = 0.7;
	if (length(uv - location_r) < radius) {
		gl_FragColor = vec4(r, 1.0);
	}

	// draw cricle with DISTANCE.
	float location_g = 0.5;
	if (distance(uv, vec2(location_g)) < radius) {
		gl_FragColor = vec4(g, 1.0);
	}

	// draw cricle with SQRT.
	float location_b = 0.3;
	vec2 point = vec2(uv.x - location_b, uv.y - location_b);
	if (sqrt(point.x*point.x + point.y*point.y) < radius) {
		gl_FragColor = vec4(b, 1.0);
	}

}

