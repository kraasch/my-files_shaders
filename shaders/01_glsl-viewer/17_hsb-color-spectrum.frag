
#ifdef GL_ES
precision mediump float;
#endif

// source: https://thebookofshaders.com/06/

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const vec4 color_y = vec4(1.0, 1.0, 0.0, 1.0);
const vec4 color_m = vec4(1.0, 0.0, 1.0, 1.0);
const vec4 color_c = vec4(0.0, 1.0, 1.0, 1.0);
const vec4 color_r = vec4(1.0, 0.0, 0.0, 1.0);
const vec4 color_g = vec4(0.0, 1.0, 0.0, 1.0);
const vec4 color_b = vec4(0.0, 0.0, 1.0, 1.0);
const vec4 color_w = vec4(1.0, 1.0, 1.0, 1.0);
const vec4 color_d = vec4(0.0, 0.0, 0.0, 1.0);

vec3 rgb2hsb( in vec3 c ){
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	vec4 p = mix(vec4(c.bg, K.wz),
			vec4(c.gb, K.xy),
			step(c.b, c.g));
	vec4 q = mix(vec4(p.xyw, c.r),
			vec4(c.r, p.yzx),
			step(p.x, c.r));
	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
			d / (q.x + e),
			q.x);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
	vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
					6.0)-3.0)-1.0,
			0.0,
			1.0 );
	rgb = rgb*rgb*(3.0-2.0*rgb);
	return c.z * mix(vec3(1.0), rgb, c.y);
}

void main(){

	vec2 uv = gl_FragCoord.xy / u_resolution;
	float time = abs(mod(u_time, 2.0) - 1.0);
	vec2 mouse = u_mouse.xy / u_resolution;
	vec3 change = vec3(time);
	gl_FragColor = color_d;


	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.0);

	// We map x (0.0 - 1.0) to the hue (0.0 - 1.0)
	// And the y (0.0 - 1.0) to the brightness
	color = hsb2rgb(vec3(st.x,1.0,st.y));

	gl_FragColor = vec4(color,1.0);
}


