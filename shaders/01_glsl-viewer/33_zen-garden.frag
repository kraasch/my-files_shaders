
#ifdef GL_ES
precision mediump float;
#endif

// source:https://thebookofshaders.com/07/

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 y = vec3(1.0, 1.0, 0.0);
vec3 m = vec3(1.0, 0.0, 1.0);
vec3 c = vec3(0.0, 1.0, 1.0);
vec3 r = vec3(1.0, 0.0, 0.0);
vec3 g = vec3(0.0, 1.0, 0.0);
vec3 b = vec3(0.0, 0.0, 1.0);
vec3 w = vec3(1.0);
vec3 dark = vec3(0.0);

void main(){
	vec2 uv        = gl_FragCoord.xy / u_resolution;
	float speed    = 0.4;
	float pendulum = abs(mod(u_time * speed, 2.0) - 1.0);
	float time     = mod(u_time     * speed, 1.0);

	vec3 color = vec3(0.0);
	float d = 0.0;
	// Remap the space to -1. to 1.
	uv = uv *2.-1.;
	// Make the distance field
	d = length( abs(uv)-.3 );
	// d = length( min(abs(uv)-.3,0.) );
	// d = length( max(abs(uv)-.3,0.) );
	// Visualize the distance field
	gl_FragColor = vec4(vec3(fract(d*10.0)),1.0);
	// Drawing with the distance field
	// gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
	// gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
	// gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);

}


