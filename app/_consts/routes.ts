export enum Routes {
  Home = '/',
  Login = '/login',
  Register = '/register',
  Trackers = '/trackers',
  History = '/history'
}

export enum ProtectedRoutes {
  '/trackers' = 0,
  '/history' = 1
}

export const unprotectedRoutes = ['/login', '/register'];
