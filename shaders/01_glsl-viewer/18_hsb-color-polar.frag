
#ifdef GL_ES
precision mediump float;
#endif

// source: https://thebookofshaders.com/06/

#define PI  3.14159265359
#define TAU 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const vec3 color_y = vec3(1.0, 1.0, 0.0);
const vec3 color_m = vec3(1.0, 0.0, 1.0);
const vec3 color_c = vec3(0.0, 1.0, 1.0);
const vec3 color_r = vec3(1.0, 0.0, 0.0);
const vec3 color_g = vec3(0.0, 1.0, 0.0);
const vec3 color_b = vec3(0.0, 0.0, 1.0);
const vec3 color_w = vec3(1.0, 1.0, 1.0);
const vec3 color_d = vec3(0.0, 0.0, 0.0);

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
	vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
	rgb = rgb*rgb*(3.0-2.0*rgb);
	return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = color_d;

	// Use polar coordinates instead of cartesian
	vec2 toCenter = vec2(0.5)-st;
	float angle = atan(toCenter.y,toCenter.x);
	float radius = length(toCenter)*2.0;

	// Map the angle (-PI to PI) to the Hue (from 0 to 1)
	// and the Saturation to the radius
	color = hsb2rgb(vec3((angle/TAU)+0.5,radius,1.0));

	if (length(st - 0.5) < 0.5) {
		gl_FragColor = vec4(color,1.0);
	}
}

