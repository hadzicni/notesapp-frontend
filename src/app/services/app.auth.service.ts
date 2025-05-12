import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthConfig, OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppAuthService {
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusSubject.asObservable();
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private usernameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly usernameObservable: Observable<string> =
    this.usernameSubject.asObservable();
  private useraliasSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly useraliasObservable: Observable<string> =
    this.useraliasSubject.asObservable();
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly accessTokenObservable: Observable<string> =
    this.accessTokenSubject.asObservable();

  constructor(
    private oauthService: OAuthService,
    private authConfig: AuthConfig
  ) {
    this.handleEvents(null);
  }

  private _decodedAccessToken: any;

  get decodedAccessToken() {
    return this._decodedAccessToken;
  }

  private _accessToken = '';

  get accessToken() {
    return this._accessToken;
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get userName(): string | null {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;

    const givenName = (claims as any)['given_name'];
    const familyName = (claims as any)['family_name'];
    const username = (claims as any)['preferred_username'];

    if (givenName && familyName) {
      return `${givenName} ${familyName}`;
    }

    return username || null;
  }

  async initAuth(): Promise<any> {
    return new Promise<void>(() => {
      this.oauthService.configure(this.authConfig);
      this.oauthService.events.subscribe((e) => this.handleEvents(e));
      this.oauthService.loadDiscoveryDocumentAndTryLogin();
      this.oauthService.setupAutomaticSilentRefresh();
    });
  }

  public getRoles(): Observable<Array<string>> {
    if (this._decodedAccessToken !== null) {
      return new Observable<Array<string>>((observer) => {
        if (this._decodedAccessToken.resource_access.NotesApp.roles) {
          if (
            Array.isArray(
              this._decodedAccessToken.resource_access.NotesApp.roles
            )
          ) {
            const resultArr =
              this._decodedAccessToken.resource_access.NotesApp.roles.map(
                (r: string) => r.replace('ROLE_', '')
              );
            observer.next(resultArr);
          } else {
            observer.next([
              this._decodedAccessToken.resource_access.NotesApp.roles.replace(
                'ROLE_',
                ''
              ),
            ]);
          }
        }
      });
    }
    return of([]);
  }

  public getIdentityClaims(): Record<string, any> {
    return this.oauthService.getIdentityClaims();
  }

  public logout() {
    this.oauthService.logOut();
    this.useraliasSubject.next('');
    this.usernameSubject.next('');
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  private handleEvents(event: any) {
    if (event instanceof OAuthErrorEvent) {
      console.error(event);
      this.authStatusSubject.next(false);
    } else {
      this._accessToken = this.oauthService.getAccessToken();
      this.accessTokenSubject.next(this._accessToken);
      this._decodedAccessToken = this.jwtHelper.decodeToken(this._accessToken);

      if (
        this._decodedAccessToken?.family_name &&
        this._decodedAccessToken?.given_name
      ) {
        const username =
          this._decodedAccessToken.given_name +
          ' ' +
          this._decodedAccessToken.family_name;
        this.usernameSubject.next(username);
      }

      const claims = this.getIdentityClaims();
      if (claims !== null && claims['preferred_username']) {
        this.useraliasSubject.next(claims['preferred_username']);
      }

      this.authStatusSubject.next(this.isLoggedIn);
    }
  }
}
