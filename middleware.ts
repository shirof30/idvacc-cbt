import { auth } from "@auth";
import { ROOT, DASHBOARD, DEFAULT_REDIRECT } from "@lib/routes";

export default auth(req => {
  const { nextUrl } = req

  const isAuthenticated = !!req.auth
  const isDashboard = DASHBOARD.includes(nextUrl.pathname)

  if(isAuthenticated && isDashboard) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
  }

  if(!isAuthenticated && !isDashboard) {
    return Response.redirect(new URL(ROOT, nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}