
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
	uv = uv * 2.0 - 1.0;                                  // remap to -1 to 1.

  float twist   = 0.0;
  twist         = time * TAU;                           // NOTE: comment in for animation.
  int N         = 7;
  float a       = atan(uv.x, uv.y) + twist;             // calculate the angle of each point.
  float b       = TAU / float(N);                       // n-th fraction of TAU.

  // square.
  float square  = floor(a * 0.636 + 0.5) * 1.57 - a;    // scale the angle to be in range -1.5 to 2.5 (puts each point into one of four quadrants).

  // polygon. 
  float polygon = floor(0.5 + a / b) * b - a;           // abstract polygon.

  // NOTE: use 'polygon' or 'square'.
  float dfield  = cos(polygon) * length(uv);            // ORIGINAL COMMENT: We then turn that back into an angle and subtract the difference between that and the actual angle. Taking cos of that difference and multiplying by the length of the original point gives the distance of that point along the vector for the centre line of the quadrant.

  float shape   = step(0.5, dfield);
  vec4 color    = vec4(vec3(shape), 1.0);
  gl_FragColor  = color;

}

