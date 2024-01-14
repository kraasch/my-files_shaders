#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
	//return  smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
	//return  sin(pct*st.y);
	return  sin(pct*st.y)/cos(pct);
}

void main() {
	vec2 st       = gl_FragCoord.xy/u_resolution;

	vec3 red      = vec3(1.0, 0.0, 0.0);
	vec3 green    = vec3(0.0, 1.0, 0.0);
	vec3 blue     = vec3(0.0, 0.0, 1.0);
	vec3 yellow   = vec3(1.0, 1.0, 0.0);
	vec3 magenta  = vec3(1.0, 0.0, 1.0);
	vec3 cyan     = vec3(0.0, 1.0, 1.0);

	int max = 6;
	float speed = 0.3;
	float time = u_time * speed;

	float ys[6];
	ys[0] = abs(mod(time + 0.0, 1.0) - 0.5) * 2.0;
	ys[1] = abs(mod(time + 1.4, 1.0) - 0.5) * 2.0;
	ys[2] = abs(mod(time + 1.7, 1.0) - 0.5) * 2.0;
	ys[3] = sin(abs(mod(time + 0.0, PI)));
	ys[4] = sin(abs(mod(time + 1.4, PI)));
	ys[5] = sin(abs(mod(time + 1.7, PI)));

	vec3 cs[6];
	cs[0] = red;
	cs[1] = green;
	cs[2] = blue;
	cs[3] = yellow;
	cs[4] = magenta;
	cs[5] = cyan;

	vec3 color = vec3(0.0);
	for (int i = 0; i < max; i++) {
		color += plot(st, ys[i]) * cs[i];
	}
	gl_FragColor  = vec4(color,1.0);
}

