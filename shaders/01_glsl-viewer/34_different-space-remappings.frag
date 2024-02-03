
#ifdef GL_ES
precision mediump float;
#endif

// source:https://thebookofshaders.com/07/

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 y = vec3(1.0, 1.0, 0.0);
vec3 m = vec3(1.0, 0.0, 1.0);
vec3 c = vec3(0.0, 1.0, 1.0);
vec3 r = vec3(1.0, 0.0, 0.0);
vec3 g = vec3(0.0, 1.0, 0.0);
vec3 b = vec3(0.0, 0.0, 1.0);
vec3 w = vec3(1.0);
vec3 d = vec3(0.0);

void main(){
	vec2 uv        = gl_FragCoord.xy / u_resolution;
	float speed    = 0.4;
	float pendulum = abs(mod(u_time * speed, 2.0) - 1.0);
	float time     = mod(u_time     * speed, 1.0);

	// uv = uv - 0.5;         // remap the space between 0.5 to -0.5.
	// uv = 0.5 - uv;         // remap the space between 0.5 to -0.5 (and flip x and y axis).
	// uv = uv * 2.0 - 1.0;   // remap the space between 1.0 to -1.0.
	   uv = (0.5 - uv) * 2.0; // remap the space between 1.0 to -1.0 (and flip x and y axis).

	float dist   = length(uv);
	float res    = fract(dist * 5.0);
	vec3  col    = vec3(uv.x*res, uv.y*res, res);
	gl_FragColor = vec4(col, 1.0);

}

