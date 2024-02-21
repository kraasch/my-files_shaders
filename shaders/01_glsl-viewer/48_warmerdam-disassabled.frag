
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


  float radius_a = 0.02;
  float radius_b = 0.1;
  float radius_c = 0.75;
  float radius_d = 0.05;

  vec2 grid1 = vec2(0.0);
  vec2 grid2 = vec2(0.0);

  grid1 = tile(uv + vec2(cos(u_time), sin(u_time)) * 0.01, 8.0);
  grid2 = tile(uv + vec2(cos(u_time), sin(u_time)) * 0.02, 2.0);

  float circle_e = circlePattern(grid2, radius_a);
  float circle_d = circlePattern(grid2, radius_b);
  float circle_c = circlePattern(grid1, radius_d);
  float circle_b = circlePattern(grid1, radius_c);
  float circle_a = circle_b - circle_c;

  color += mix(color_y, color_r, circle_a);
  color = mix(color,   color_g, circle_d) - circle_e;

  gl_FragColor = vec4(color, 1.0);
}
