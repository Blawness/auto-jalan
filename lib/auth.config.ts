export const authConfig = {
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        ;(token as any).role = (user as any).role
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = (token as any).role
      }
      return session
    },
  } as any,
  pages: {
    signIn: "/login",
  },
}
