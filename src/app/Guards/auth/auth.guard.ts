import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const hasValidToken = await this.authService.checkIsAuthenticated();
    const isTokenExpired = await this.authService.isTokenExpired();
    console.log(hasValidToken && !isTokenExpired);


    if (hasValidToken && !isTokenExpired) {
      return true;
    }

    this.authService.removeSession();
    this.router.navigate(['/login']); // Replace with your login page path
    return false;
  }
}
