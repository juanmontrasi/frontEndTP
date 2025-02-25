import { HttpInterceptorFn } from '@angular/common/http';

const excludedRoutes: { pattern: RegExp; methods: string[] }[] = [
  { pattern: /^\/products\/\d+$/, methods: ['GET'] },
  { pattern: /^\/users\/\d+$/, methods: ['GET'] },
  { pattern: /^\/products\/search$/, methods: ['GET'] },
  { pattern: /^\/products$/, methods: ['GET'] },
  { pattern: /^\/users$/, methods: ['POST'] },
];

export const authenticateInterceptor: HttpInterceptorFn = (req, next) => {
  const isExcluded = excludedRoutes.some(route =>
    route.pattern.test(req.url) && route.methods.includes(req.method)
  );

  if (isExcluded) {
    return next(req);
  }

  const token = sessionStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(clonedRequest);
  }

  return next(req);
};

