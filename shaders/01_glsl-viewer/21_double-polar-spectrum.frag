
#ifdef GL_ES
precision mediump float;
#endif

// source: https://thebookofshaders.com/07/

#define PI  3.14159265359
#define TAU 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
	vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
	rgb = rgb*rgb*(3.0-2.0*rgb);
	if (rgb.r > 0.0) {
		rgb.r += 0.5;
	}
	if (rgb.g > 0.0) {
		rgb.g += 0.5;
	}
	if (rgb.b > 0.0) {
		rgb.b += 0.5;
	}
	return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {

	float speed   = 0.5;
	float time    = mod(u_time * speed, 1.0);

	vec2 st       = gl_FragCoord.xy/u_resolution;
	vec3 color    = vec3(0.0);

	vec2 toCenter = vec2(0.5)-st;
	float angle   = atan(toCenter.y, toCenter.x); // + (TAU * time);
	float radius  = length(toCenter)*2.0;

	float hue     = (angle/TAU) + 0.5;
	hue           = abs(1.0 - (hue * 2.0));
	color         = vec3(hue, radius * 2.0, 1.0);
	color         = hsb2rgb(color);

	if (length(st - 0.5) < 0.5) {
		gl_FragColor = vec4(color,1.0);
	}
}

