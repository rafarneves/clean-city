import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('CLEAN_CITY_TOKEN')

    const protectedRoutes = ['/dados-pessoais']
    const unprotectedRoutes = ['/quero-participar', '/cadastro']
    const isTokenValid = await validateToken(token?.value)
  
    if (protectedRoutes.includes(pathname)) {
      console.log('isTokenValid', isTokenValid)
      if (!isTokenValid) return NextResponse.redirect(new URL('/', request.url));
    }

    if (unprotectedRoutes.includes(pathname)) {
      if (isTokenValid) return NextResponse.redirect(new URL('/', request.url));
    }
}

async function validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`https://clean-city-059c7f60732d.herokuapp.com/clean-city/api/v1/auth/validate?token=${token}`);
  
      if (response.ok) {
        const data = await response.json();
        return data
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro ao validar o token:', error);
      return false;
    }
  }