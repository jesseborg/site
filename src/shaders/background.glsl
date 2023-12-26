precision highp float;

uniform float iTime;
uniform vec2 iResolution;

uniform float dotsRadius;
uniform float dotsSpacing;
uniform float perlinScale;
uniform float perlinSpeed;

const vec4 WHITE = vec4(255.0, 255.0, 255.0, 1.0);
const vec4 BLACK = vec4(0.0, 0.0, 0.0, 1.0);

// Distance in pixels
float circleDist(vec2 p, vec2 center) {
	return distance(center, p) - dotsRadius;
}

float whiteNoise(vec4 pos, float evolve) {
	// Loop the evolution (over a very long period of time).
	float e = fract((evolve * 0.1));
	
	// Coordinates
	float cx  = pos.x * e;
	float cy  = pos.y * e;
	
	// Generate a "random" black or white value
	return fract(23.0 * fract(2.0 / fract(fract(cx * 2.4 / cy * 23.0 + pow(abs(cy / 22.4), 3.3)) * fract(cx * evolve / pow(abs(cy), 0.050)))));
}

vec2 getGradient(vec2 intPos, float t) {
	// Uncomment for calculated rand
	float rand = fract(sin(dot(intPos, vec2(12.9898, 78.233))) * 43758.5453);
	
	// Texture-based rand (a bit faster on my GPU)
	// float rand = texture(iChannel0, intPos / 64.0).r;
	
	// Rotate gradient: random starting rotation, random rotation rate
	float angle = 6.283185 * rand + 4.0 * t * rand;
	return vec2(cos(angle), sin(angle));
}

float perlinNoise(vec3 pos) {
	vec2 i = floor(pos.xy);
	vec2 f = pos.xy - i;
	vec2 blend = f * f * (3.0 - 2.0 * f);
	
	float noiseVal = mix(
		mix(
			dot(getGradient(i + vec2(0, 0), pos.z), f - vec2(0, 0)),
			dot(getGradient(i + vec2(1, 0), pos.z), f - vec2(1, 0)),
			blend.x
		),
		mix(
			dot(getGradient(i + vec2(0, 1), pos.z), f - vec2(0, 1)),
			dot(getGradient(i + vec2(1, 1), pos.z), f - vec2(1, 1)),
			blend.x
		),
		blend.y
	);
	return 0.1 + 0.5 * (noiseVal / 0.7); // normalize to about [-1..1]
}

float blendOverlay(float base, float blend) {
	return base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(
		blendOverlay(base.r, blend.r),
		blendOverlay(base.g, blend.g),
		blendOverlay(base.b, blend.b)
	);
}

vec3 blendDarken(vec3 base, vec3 blend) {
	return vec3(
		min(blend.r, base.r),
		min(blend.g, base.g),
		min(blend.b, base.b)
	);
}

void main() {
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
	
	// Dots
	vec2 center = dotsSpacing * floor(gl_FragCoord.xy / dotsSpacing) + dotsSpacing / 100.0;
	vec4 dotColor = mix(WHITE, BLACK, clamp(circleDist(gl_FragCoord.xy, center), 0.0, 1.0));
	vec4 dots = mix(dotColor, BLACK, 0.1 * distance(uv, vec2(0.5)));
	
	// Perlin Noise
	float pNoise = perlinNoise(vec3(uv * perlinScale, iTime / perlinSpeed));
	vec3 perlinDots = blendDarken(vec3(dots), vec3(pNoise));
	vec3 wNoise = vec3(whiteNoise(gl_FragCoord, 1.0));
	vec3 noiseOverlay = blendOverlay(perlinDots, wNoise);

	gl_FragColor = vec4(noiseOverlay, 1.0);
}