import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutologinGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const hasValidToken = await this.authService.checkIsAuthenticated();
    const isTokenExpired = await this.authService.isTokenExpired();

    if (hasValidToken && !isTokenExpired) {
      this.router.navigate(['/main']); // Replace with your main page path
      return false;
    }

    return true;
  }
}