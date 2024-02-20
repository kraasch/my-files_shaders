
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

// YUV to RGB matrix and RGB to YUV matrix.
mat3 yuv2rgb = mat3( 
          1.0,       0.0,     1.13983,
          1.0,     -0.39465, -0.58060,
          1.0,      2.03211,  0.0
  );
mat3 rgb2yuv = mat3( 
          0.2126,   0.7152,   0.0722,
         -0.09991, -0.33609,  0.43600,
          0.615,   -0.5586,  -0.05639
  );

void main(){

  // basic setup.
  vec2 uv        = gl_FragCoord.xy / u_resolution;
  float p_speed  = 0.1;
  float t_speed  = 0.2;
  float pendulum = abs(mod(u_time * p_speed, 2.0) - 1.0);
  float time     = mod(u_time     * t_speed, 1.0);
  float twist    = time * TAU;
  vec3 color     = vec3(0.0);

  uv = (uv - 0.5) * 2.0; // UV values goes from -1 to 1 so we need to remap uv (0.0 to 1.0). Turn into range -0.5 to 0.5. Then turn into range -1.0 to 1.0.
  color = yuv2rgb * vec3(0.5, uv.x, uv.y); // we pass uv as the y & z values of a three dimensional vector to be properly multiply by a 3x3 matrix.

  gl_FragColor = vec4(color, 1.0);
}
