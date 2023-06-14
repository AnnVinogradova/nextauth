import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import VkProvider from "next-auth/providers/vk";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
export const authOptions = {
	// adapter: PrismaAdapter(prisma),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),

		VkProvider({
			clientId: process.env.VK_CLIENT_ID,
			clientSecret: process.env.VK_CLIENT_SECRET
		}),

		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' }
			},
			// eslint-disable-next-line no-unused-vars
			async authorize(credentials) {
				console.log('credentials', credentials);


				if ('111' === credentials.username && '111' === credentials.password)
					return { id: '1', name: 'J Smith', email: 'jsmith@example.com' };
				return null;
			}
		})

	],
};

const resf = NextAuth(authOptions);

export default (...params) => {
	const [req] = params;
	console.log('pages/api/auth/[...nextauth].js ');
	console.log('>> ', req.method, ' запрос на', req.url, req.query);
	return resf(...params);
};