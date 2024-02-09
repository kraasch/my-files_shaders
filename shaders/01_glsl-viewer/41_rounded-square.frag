
#ifdef GL_ES
precision mediump float;
#endif

// source: https://thndl.com/square-shaped-shaders.html

#define PI 3.14159265359
#define TAU 6.28318530718

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

void main() {

	vec2 uv        = gl_FragCoord.xy / u_resolution;
	float speed    = 0.2;
	float pendulum = abs(mod(u_time * speed, 2.0) - 1.0);
	float time     = mod(u_time     * speed, 1.0);
	uv = uv * 2.0 - 1.0; // remap to -1 to 1.

  // vec2 r = abs(uv);
  vec2 r = vec2(length(max(abs(uv)-0.3, 0.0)));

  r = r * (pendulum + 0.5);

  float s = max(r.x, r.y);

  // vec3 color = vec3(r, 0.0);
  float s1 = step(0.4, s);
  float s2 = step(s, 0.5);
  vec3 color = vec3(s1 * s2);

  gl_FragColor = vec4(color, 1.0);

}

