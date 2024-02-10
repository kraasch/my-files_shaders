
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
  float new_bg   = max(bg, 1.0 - new_obj);
  return new_bg;
}

void main(){
	vec2 uv        = gl_FragCoord.xy / u_resolution;
	float p_speed  = 0.1;
	float t_speed  = 0.2;
	float pendulum = abs(mod(u_time * p_speed, 2.0) - 1.0);
	float time     = mod(u_time     * t_speed, 1.0);
  float twist    = time * TAU;

    vec2 translate = vec2(cos(u_time),sin(u_time));
    uv += translate * 0.35;

    float shapez = 0.0;
    shapez       = mk_shape(shapez,  0.5, 0.5,  uv, 3, twist, 0.1 * pendulum + 0.05);
    vec3 color   = vec3(uv.x, uv.y, 0.0);
    color       += vec3(shapez);

    gl_FragColor = vec4(color, 1.0);
}

