
#ifdef GL_ES
precision mediump float;
#endif

// source: Coding a Bezier curve from scratch! by The Art of Code: https://www.youtube.com/watch?v=a4zMX6dDVXI

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

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 p, vec2 c) {
  float d = length(p-c);
  return smoothstep(d, 0.0, d - 0.02);
}

vec2 bezier(vec2 a, vec2 b, vec2 c, float t) {
  return mix(mix(a,c,t), mix(c,b,t), t);
}

float line(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p-a;
  vec2 ba = b-a;
  float t = clamp(dot(pa, ba)/dot(ba,ba), 0.0, 1.0);
  vec2 c = a+ba*t;
  float d = length(c-p);
  return smoothstep(d, 0.0, d-0.001);
}

void main() {

  vec2  uv       = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
  vec2  mouse    = (u_mouse.xy      * 2.0 - u_resolution.xy) / u_resolution.y;
  float p_speed  = 0.1;
  float t_speed  = 0.2;
  float pendulum = abs(mod(u_time * p_speed, 2.0) - 1.0);
  float time     = mod(u_time     * t_speed, 1.0);
  float twist    = time * TAU;
  vec3  color    = vec3(0.0);
  vec3  c0       = vec3(0.3, 0.3, 0.3);
  vec3  c1       = vec3(0.2, 0.1, 0.8);
  vec3  c2       = vec3(0.9, 0.8, 0.3);
  vec3  c3       = vec3(0.3, 0.4, 0.8);

  float t = sin(u_time) * 0.5 + 0.5;
  vec2 A = vec2(-0.4, -0.2);
  vec2 B = vec2(0.4, 0.2);
  vec2 C = mouse.xy;
  vec2 AC  = mix(A, C, t);
  vec2 BC  = mix(B, C, 1.0-t);
  vec2 ACB = mix(AC, BC, t);

  color += color_r * circle(uv, A);
  color += color_b * circle(uv, B);
  color += color_c * circle(uv, C);
  color += color_w * circle(uv, ACB);

  if (pendulum < 0.5) {
    color += color_y * circle(uv, AC);
    color += color_m * circle(uv, BC);
    color += line(uv, A, C);
    color += line(uv, C, B);
    color += line(uv, AC, BC);
  }

  int NUM = 10;
  vec2 pp = A;
  vec2 p  = A;

  for (int i = 1; i <= NUM; i++) {
    t = float(i)/float(NUM);
    p = bezier(A, B, C, t);
    color = max(color, line(uv, p, pp));
    pp = p;
  }

  gl_FragColor = vec4(color, 1.0);
}

