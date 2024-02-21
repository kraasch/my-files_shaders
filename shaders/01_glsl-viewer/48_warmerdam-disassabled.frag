
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

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 uv, float zoom){
  uv = uv * zoom;
  return fract(uv);
}

float circle(vec2 uv, float radius){
  vec2 pos = vec2(0.5) - uv;
  radius = radius * 0.75;
  return 1.0 - smoothstep(radius-(radius*0.05), radius+(radius*0.05), dot(pos,pos)*3.14);
}

float circlePattern(vec2 uv, float radius) {
  return 
    circle(uv + vec2(+0.0, -0.5), radius)+
    circle(uv + vec2(+0.0, +0.5), radius)+
    circle(uv + vec2(-0.5, +0.0), radius)+
    circle(uv + vec2(+0.5, +0.0), radius);
}

void main() {

  vec2  uv       = gl_FragCoord.xy / u_resolution;
  // uv.x          *= u_resolution.x  / u_resolution.y;
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
  c2 = color_r;

  float radius_a = 0.02;
  float radius_b = 0.11;
  float radius_c = 0.75;
  float radius_d = 0.05;
  float zoom_a = 9.0;
  float zoom_b = 2.0;
  float sway_a = 0.02;
  float sway_b = 0.08;

  vec2 grid1 = vec2(0.0);
  vec2 grid2 = vec2(0.0);

  grid1 = tile(uv + vec2(cos(u_time), sin(u_time)) * sway_a, zoom_a);
  grid2 = tile(uv + vec2(cos(u_time), sin(u_time)) * sway_b, zoom_b);

  float circle_e = circlePattern(grid2, radius_a);
  float circle_d = circlePattern(grid2, radius_b);
  float circle_c = circlePattern(grid1, radius_d);
  float circle_b = circlePattern(grid1, radius_c);
  float circle_a = circle_b - circle_c;

  color += mix(c0,   c1, circle_a);

  vec3 actual_color = vec3(0.0);
  vec3 COLS[4];
  COLS[0] = c0;
  COLS[1] = c1;
  COLS[2] = c2;
  COLS[3] = c3;
  actual_color = COLS[int(time * 3.0)];

  color = mix(color, c2, circle_d) - actual_color;

  gl_FragColor = vec4(color, 1.0);
}
