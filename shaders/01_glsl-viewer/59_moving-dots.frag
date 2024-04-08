
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


vec2 move_tile(vec2 uv, float time) {
  float ft  = fract(time);
  if (ft > 0.5) {
    uv.x += fract(uv.y * 0.5) > 0.5 ? ft * 2.0 : -(ft * 2.0);
  }
  if (ft < 0.5) {
    uv.y += fract(uv.x * 0.5) > 0.5 ? ft * 2.0 : -(ft * 2.0);
  }
  return uv;
}

float circle(in vec2 uv, in float r) {
  vec2  l        = uv - vec2(0.5);
  float offset   = r * 0.01;
  float scale    = 4.0;
  float circle   = dot(l, l) * scale;
  float inverted = 1.0 - smoothstep(r - offset, r + offset, circle);
  return inverted;
}

void main() {

  // vec2  uv    = (gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
  vec2  uv       =  gl_FragCoord.xy / u_resolution.xy;
  vec2  mouse    = (u_mouse.xy * 2.0 - u_resolution.xy) / u_resolution.y;
  float p_speed  = 1.2;
  float t_speed  = 0.2;
  float pendulum = abs(mod(u_time * p_speed, 2.0) - 1.0);
  float real_t   = u_time * t_speed;
  float time     = mod(real_t, 1.0);
  float twist    = time * TAU;
  vec3  color    = vec3(0.0);
  vec3  c0       = vec3(0.8, 0.2, 0.3);
  vec3  c1       = vec3(0.3, 0.1, 0.8);
  vec3  c2       = vec3(0.8, 0.5, 0.3);
  vec3  c3       = vec3(0.2, 0.4, 0.8);

  uv *= 9.0;                // apply zoom.
  uv = move_tile(uv, time); // move tile.
  uv = fract(uv);           // copy tile.

  color += vec3(circle(uv, 0.4) * c3); // draw a circle.

  gl_FragColor = vec4(color, 1.0);

}

