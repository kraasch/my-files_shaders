
#ifdef GL_ES
precision mediump float;
#endif

// source: https://thebookofshaders.com/09/

#define PI 3.14159265359
#define TAU 6.28318530718

#define color_y vec3(1.0, 1.0, 0.0)
#define color_m vec3(1.0, 0.0, 1.0)
#define color_c vec3(0.0, 1.0, 1.0)
#define color_r vec3(1.0, 0.0, 0.0)
#define color_g vec3(0.0, 1.0, 0.0)
#define color_b vec3(0.0, 0.0, 1.0)
#define color_w vec3(1.0, 1.0, 1.0)
#define color_d vec3(0.0, 0.0, 0.0)

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

float line(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p-a;
  vec2 ba = b-a;
  float t = clamp(dot(pa, ba)/dot(ba,ba), 0.0, 1.0);
  vec2 c = a+ba*t;
  float d = length(c-p);
  float thickness = 0.003;
  return smoothstep(d, 0.0, d-thickness);
}

vec3 spinner(float time, vec3 color, vec2 uv, bool is_spin_right, float offset) {
  float dif = 0.3 + offset;
  float angle = time * PI;
  vec2 s = vec2(0.0);
  vec2 t = vec2(0.0);
  if (is_spin_right) {
    s = vec2(sin(angle - dif), cos(angle - dif));
    t = -s;
  } else {
    s = vec2(cos(angle - dif), sin(angle - dif));
    t = -s;
  }
  return line(uv, s, t) * (1.0-color);
}

vec3 sun(vec3 bg, float time, vec3 color, vec2 uv, bool is_spin_right, float offset, int max) {
  float f = 0.0;
  for (int i = 0; i < max; i++) {
    f = float(i) / float(max);
    bg += spinner(time + f, color, uv, is_spin_right, offset);
  }
  return bg;
}

void main() {

  vec2  uv       = (gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
  vec2  mouse    = (u_mouse.xy      * 2.0 - u_resolution.xy) / u_resolution.y;
  float p_speed  = 1.2;
  float t_speed  = 0.2;
  float pendulum = abs(mod(u_time * p_speed, 2.0) - 1.0);
  float time     = mod(u_time     * t_speed, 1.0);
  float twist    = time * TAU;
  vec3  color    = vec3(0.0);
  vec3  c0       = vec3(0.8, 0.2, 0.3);
  vec3  c1       = vec3(0.3, 0.1, 0.8);
  vec3  c2       = vec3(0.8, 0.5, 0.3);
  vec3  c3       = vec3(0.2, 0.4, 0.8);

  vec3 cs[4];
  cs[0] = c0;
  cs[1] = c1;
  cs[2] = c2;
  cs[3] = c3;

  float zs[4];
  zs[0] = 2.0;
  zs[1] = 2.3;
  zs[2] = 2.6;
  zs[3] = 2.9;

  float offs[4];
  offs[0] = 1.0;
  offs[1] = 2.1;
  offs[2] = 3.2;
  offs[3] = 4.3;

  bool spins[4];
  spins[0] = true;
  spins[1] = false;
  spins[2] = true;
  spins[3] = false;

  int factor = 2;

  int nums[4];
  nums[0] = 1 * factor;
  nums[1] = 2 * factor;
  nums[2] = 3 * factor;
  nums[3] = 4 * factor;

  float fac[4];
  fac[0] = 1.0;
  fac[1] = 1.0;
  fac[2] = 3.0;
  fac[3] = 2.0;

  for (int i = 0; i < 4; i++) {
    uv *= fac[i];
    uv = fract(uv);
    uv -= 0.5;
    uv /= fac[i];
    uv *= zs[i];
    color += sun(color, time, cs[i], uv, spins[i], offs[i], nums[i]);
    uv /= zs[i];
  }

  gl_FragColor = vec4(color, 1.0);
}

