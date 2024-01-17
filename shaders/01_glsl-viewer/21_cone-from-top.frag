
#ifdef GL_ES
precision mediump float;
#endif

// source: https://thebookofshaders.com/07/

#define PI  3.14159265359
#define TAU 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {

	float speed   = 0.5;
	float time    = mod(u_time * speed, 1.0);

	vec2 st       = gl_FragCoord.xy/u_resolution;
	vec3 color    = vec3(0.0);

	vec2 toCenter = vec2(0.5)-st;
	float angle   = atan(toCenter.y, toCenter.x); // + (TAU * time);
	float radius  = length(toCenter)*2.0;

	float hue     = (angle/TAU) + 0.5;
	hue           = abs(1.0 - (hue * 2.0));
	color         = vec3(hue, radius, 1.0);

	if (length(st - 0.5) < 0.5) {
		gl_FragColor = vec4(color,1.0);
	}
}

