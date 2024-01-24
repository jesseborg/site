/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'github.githubassets.com',
				pathname: '/images/**'
			}
		]
	}
};

module.exports = nextConfig;
