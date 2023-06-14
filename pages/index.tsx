import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();
	if (session && session.user) {
		console.log('user=', session.user);
		console.log('session=', session);
		return <>
			Signed in as {session.user?.email} <br />
			{session?.user?.image && <img src={session?.user?.image} alt='avatar' width={50} height={50}></img>}
			{session?.user?.name}
			<hr></hr>
			<button onClick={() => signOut()}>Sign out</button>
		</>;
	}
	return <>
		Not signed in <br />
		<button onClick={() => signIn()}>Sign in</button>
	</>;
}
