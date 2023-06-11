import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
	providers: [
		// eslint-disable-next-line new-cap
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' }
			},
			// eslint-disable-next-line no-unused-vars
			async authorize(credentials, req) {
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