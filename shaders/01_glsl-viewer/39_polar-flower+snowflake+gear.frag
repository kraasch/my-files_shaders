
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

void main() {

	vec2 uv        = gl_FragCoord.xy / u_resolution;
	float speed    = 0.4;
	float pendulum = abs(mod(u_time * speed, 2.0) - 1.0);
	float time     = mod(u_time     * speed, 1.0);

  vec2 pos       = vec2(0.5) - uv;
  float r        = length(pos) * 2.0;
  float a        = atan(pos.y, pos.x);
  float n        = a / (2.0 * PI) + 0.5; // normalized a.
  vec3 color     = vec3(0.0);

  float f = cos(a * 3.0);
  // f = abs(cos(a * 3.0));
  // f = abs(cos(a * 2.5)) * 0.5 + 0.3;
  // f = abs(cos(a * 12.0) * sin(a * 3.0)) * 0.8 + 0.1;
  // f = smoothstep(-0.5, 1.0, cos(a * 10.0)) * 0.2 + 0.5;

  color = vec3( 1.-smoothstep(f,f+0.02,r) );
  gl_FragColor = vec4(color, 1.0);

}

