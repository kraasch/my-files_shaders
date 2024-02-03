
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
	vec2  uv       = gl_FragCoord.xy / u_resolution;
	float speed    = 0.4;
	float pendulum = abs(mod(u_time * speed, 2.0) - 1.0);
	float time     = mod(u_time     * speed, 1.0);
	float x        = abs(uv.x) * (pendulum + 0.7);
	float y        = abs(uv.y) * (pendulum + 0.7);
	float res_x    = fract((x+time) * 10.0);
	float res_y    = fract((y+time) * 10.0);
	vec3  col      = vec3(res_x * res_y, 1.0-pendulum, pendulum);
	gl_FragColor   = vec4(col, 1.0);

}

