
#ifdef GL_ES
precision mediump float;
#endif

// source: https://thebookofshaders.com/07/
// source: https://gist.github.com/Hebali/6ebfc66106459aacee6a9fac029d0115

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

  vec2 pos        = vec2(0.5) - uv;

  // float size      = 3.0;
  float size      = 2.0 * pendulum + 2.5; // animated size.

  float r         = length(pos) * size;
  float animation = TAU * time;

  // float a         = atan(pos.y, pos.x);
  float a         = atan(pos.y, pos.x) + animation; // animated rotation.

  float k = abs(cos(a * 3.0));
  float g = abs(cos(a * 18.0));
  float h = smoothstep(-0.5, 1.0, cos(a * 10.0)) * 0.2 + 0.5;
  float dot = length(pos)+0.2;
  float l = cos(a * 9.0);

  // float h = 0.0;
  // float h = sin(a * 3.0);
  // float h = abs(cos(a * 6.0));
  // float h = abs(cos(a * 3.0));
  // float h = abs(cos(a * 2.5)) * 0.5 + 0.3;
  // float h = abs(cos(a * 12.0) * sin(a * 3.0)) * 0.8 + 0.1;
  // float h = smoothstep(-0.5, 1.0, cos(a * 10.0)) * 0.2 + 0.5;
  
  float f = 0.0;
  f = max(k, h); // union of k and h.
  f = min(f, g); // intersection of f and g.
  float f2 = 0.0;
  f2 = max(dot, l);

  vec3 c1 = vec3( 1.0 - smoothstep(f, f + 0.02, r) );
  vec3 c2 = vec3( 1.0 - smoothstep(f2, f2 + 0.02, r) );
  vec3 c3 = c1 * (1.0-c2); // subtract dot from snowflake.
  gl_FragColor = vec4(c3, 1.0);

}

