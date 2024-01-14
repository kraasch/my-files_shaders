#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 black    = vec3(0.0);
vec3 white    = vec3(1.0);
vec3 red      = vec3(1.0, 0.0, 0.0);
vec3 green    = vec3(0.0, 1.0, 0.0);
vec3 blue     = vec3(0.0, 0.0, 1.0);
vec3 yellow   = vec3(1.0, 1.0, 0.0);
vec3 magenta  = vec3(1.0, 0.0, 1.0);
vec3 cyan     = vec3(0.0, 1.0, 1.0);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {

	vec2 st    = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.0);
	vec3 pct   = vec3(st.x);

	// float factor = sin(mod(u_time*st.y*40.0,PI*2.0))/10.0;
	float time      = mod(u_time, PI);
	float factor    = (sin(time) - 0.7) * 0.2 * cos(st.x*PI*2.0);

	pct.r      = smoothstep(0.3, 0.5, st.y + factor) * 0.8 + 0.1;
	pct.g      = smoothstep(0.4, 1.0, st.y + factor) * 0.4 + 0.0;
	pct.b      = smoothstep(0.1, 0.6, st.y + factor) * 0.5 + 0.1;

	color      = mix(black, yellow, pct);

	//color    = mix(color, vec3(1.0,0.0,0.0), plot(st,pct.r));
	//color    = mix(color, vec3(0.0,1.0,0.0), plot(st,pct.g));
	//color    = mix(color, vec3(0.0,0.0,1.0), plot(st,pct.b));

	color      = mix(color, vec3(1.0,0.0,0.0), pct.r);
	color      = mix(color, vec3(0.0,1.0,0.0), pct.g);
	color      = mix(color, vec3(0.0,0.0,1.0), pct.b);

	gl_FragColor = vec4(color,1.0);
}
