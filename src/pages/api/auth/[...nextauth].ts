import CredentialsProvider from "next-auth/providers/credentials";
import { ApiServer } from "../../../_services";
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			type: 'credentials',
			credentials: {
				email: { type: 'string' }, password: { type: 'string' }
			},
			async authorize(credentials, req) {
				try {
					const { data } = await ApiServer.post('/sessions', {
						email: credentials?.email,
						password: credentials?.password
					})
					return { ...data.user, admin: !!data.user.admin, token: data.token }
				} catch (error: any) {
					throw new Error(`${error.response.data.config.log}&status=${error.response.data.statusCode}`, { cause: error.response.data })
				}
			}
		})
	],
	callbacks: {
		async signIn({ user }) {
			if (user.id) return true
			return false
		},
		async redirect({ baseUrl }) {
			return baseUrl
		},
		async session({ session }) {
			session.user!.image = 'no-pic'
			return session
		},
		async jwt({ token, user }) {
			user?.token ? token.token = user.token : false
			return token
		}

	},
	pages: {
		error: '/login',
		signIn: '/account',
		signOut: '/',
	}
}

export default NextAuth(authOptions);

