import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db"
import { users } from "./schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const email = (credentials.email as string).toLowerCase().trim()
        const password = credentials.password as string
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
        if (!user || !user.password) return null
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return null
        return { id: user.id, name: user.name, email: user.email, image: user.image, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        ;(token as any).role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = (token as any).role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
