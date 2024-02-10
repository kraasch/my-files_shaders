
#ifdef GL_ES
precision mediump float;
#endif

// source: https://thebookofshaders.com/08/

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

float mk_shape(float bg, float x, float y, vec2 uv, int N, float twist, float scale);
float mk_star(float bg, float x, float y, vec2 uv, float twist, float scale, int N, float offset);

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float mk_shape(float bg, float x, float y, vec2 uv, int N, float twist, float scale) {
  uv            -= vec2(x, y);
  uv            /= scale;
  float a        = atan(uv.x, uv.y) + twist;             // calculate the angle of each point (A for angle).
  float b        = TAU / float(N);                       // n-th fraction of TAU (the radius).
  float polygon  = floor(0.5 + a / b) * b - a;           // an abstract polygon.
  float dfield   = cos(polygon) * length(uv);
  float new_obj  = step(0.5, dfield);
  float new_bg   = min(bg, new_obj);
  return new_bg;
}

float mk_star(float bg, float x, float y, vec2 uv, float twist, float scale, int N, float offset) {
  float shapez = bg;
  shapez = mk_shape(shapez, x, y, uv, N, twist + offset, scale);
  shapez = mk_shape(shapez, x, y, uv, N, twist,          scale);
  return shapez;
}

float mk_star_six(float bg, float x, float y, vec2 uv, float twist, float scale) {
  return mk_star(bg, x, y, uv, twist, scale, 3, PI);
}

float mk_star_eight(float bg, float x, float y, vec2 uv, float twist, float scale) {
  return mk_star(bg, x, y, uv, twist, scale, 4, PI * 0.25);
}

void main() {
	vec2 uv        = gl_FragCoord.xy / u_resolution;
	float p_speed  = 0.1;
	float t_speed  = 0.2;
	float pendulum = abs(mod(u_time * p_speed, 2.0) - 1.0);
	float time     = mod(u_time     * t_speed, 1.0);
  float twist    = time * TAU;

  vec2 translate = vec2(cos(u_time), sin(u_time));
  uv += translate * 1.0;
  uv *= 1.2;

  float shapez  = 1.0;

  shapez = mk_shape(     shapez, 1.5, 1.5,  uv, 3, twist, 0.10);
  shapez = mk_shape(     shapez, 1.2, 1.3,  uv, 6, twist, 0.30);
  shapez = mk_shape(     shapez, 1.7, 1.8,  uv, 5, twist * 2.0, 0.20);
  shapez = mk_shape(     shapez, 1.8, 1.4,  uv, 4, twist, 0.20);
  shapez = mk_shape(     shapez, 1.2, 1.8,  uv, 7, twist, 0.20);
  shapez = mk_star_six(  shapez, 1.5, 1.15, uv,    twist, 0.1);
  shapez = mk_star_eight(shapez, 1.8, 1.15, uv,    twist, 0.1);

  shapez = mk_shape(     shapez, 1.5, 0.5,  uv, 3, twist, 0.10);
  shapez = mk_shape(     shapez, 1.2, 0.3,  uv, 6, twist, 0.30);
  shapez = mk_shape(     shapez, 1.7, 0.8,  uv, 5, twist * 2.0, 0.20);
  shapez = mk_shape(     shapez, 1.8, 0.4,  uv, 4, twist, 0.20);
  shapez = mk_shape(     shapez, 1.2, 0.8,  uv, 7, twist, 0.20);
  shapez = mk_star_six(  shapez, 1.5, 0.15, uv,    twist, 0.1);
  shapez = mk_star_eight(shapez, 1.8, 0.15, uv,    twist, 0.1);

  shapez = mk_shape(     shapez, 0.5, 0.5,  uv, 3, twist, 0.10);
  shapez = mk_shape(     shapez, 0.2, 0.3,  uv, 6, twist, 0.30);
  shapez = mk_shape(     shapez, 0.7, 0.8,  uv, 5, twist * 2.0, 0.20);
  shapez = mk_shape(     shapez, 0.8, 0.4,  uv, 4, twist, 0.20);
  shapez = mk_shape(     shapez, 0.2, 0.8,  uv, 7, twist, 0.20);
  shapez = mk_star_six(  shapez, 0.5, 0.15, uv,    twist, 0.1);
  shapez = mk_star_eight(shapez, 0.8, 0.15, uv,    twist, 0.1);

  shapez = mk_shape(     shapez, 0.5, 1.5,  uv, 3, twist, 0.10);
  shapez = mk_shape(     shapez, 0.2, 1.3,  uv, 6, twist, 0.30);
  shapez = mk_shape(     shapez, 0.7, 1.8,  uv, 5, twist * 2.0, 0.20);
  shapez = mk_shape(     shapez, 0.8, 1.4,  uv, 4, twist, 0.20);
  shapez = mk_shape(     shapez, 0.2, 1.8,  uv, 7, twist, 0.20);
  shapez = mk_star_six(  shapez, 0.5, 1.15, uv,    twist, 0.1);
  shapez = mk_star_eight(shapez, 0.8, 1.15, uv,    twist, 0.1);

  shapez = mk_shape(     shapez, -0.5,  0.5,  uv, 3, twist, 0.10);
  shapez = mk_shape(     shapez, -0.2,  0.3,  uv, 6, twist, 0.30);
  shapez = mk_shape(     shapez, -0.7,  0.8,  uv, 5, twist * 2.0, 0.20);
  shapez = mk_shape(     shapez, -0.8,  0.4,  uv, 4, twist, 0.20);
  shapez = mk_shape(     shapez, -0.2,  0.8,  uv, 7, twist, 0.20);
  shapez = mk_star_six(  shapez, -0.5,  0.15, uv,    twist, 0.1);
  shapez = mk_star_eight(shapez, -0.8,  0.15, uv,    twist, 0.1);

  shapez = mk_shape(     shapez, -0.5, -0.5,  uv, 3, twist, 0.10);
  shapez = mk_shape(     shapez, -0.2, -0.3,  uv, 6, twist, 0.30);
  shapez = mk_shape(     shapez, -0.7, -0.8,  uv, 5, twist * 2.0, 0.20);
  shapez = mk_shape(     shapez, -0.8, -0.4,  uv, 4, twist, 0.20);
  shapez = mk_shape(     shapez, -0.2, -0.8,  uv, 7, twist, 0.20);
  shapez = mk_star_six(  shapez, -0.5, -0.15, uv,    twist, 0.1);
  shapez = mk_star_eight(shapez, -0.8, -0.15, uv,    twist, 0.1);

  shapez = mk_shape(     shapez,  0.5, -0.5,  uv, 3, twist, 0.10);
  shapez = mk_shape(     shapez,  0.2, -0.3,  uv, 6, twist, 0.30);
  shapez = mk_shape(     shapez,  0.7, -0.8,  uv, 5, twist * 2.0, 0.20);
  shapez = mk_shape(     shapez,  0.8, -0.4,  uv, 4, twist, 0.20);
  shapez = mk_shape(     shapez,  0.2, -0.8,  uv, 7, twist, 0.20);
  shapez = mk_star_six(  shapez,  0.5, -0.15, uv,    twist, 0.1);
  shapez = mk_star_eight(shapez,  0.8, -0.15, uv,    twist, 0.1);

  vec4 color    = vec4(vec3(shapez), 1.0);
  gl_FragColor  = color;

}

