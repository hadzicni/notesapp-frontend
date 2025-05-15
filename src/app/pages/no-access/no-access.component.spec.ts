import { TestBed } from '@angular/core/testing';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { NoAccessComponent } from './no-access.component';

describe('NoAccessComponent', () => {
  let oauthServiceMock: any;

  beforeEach(() => {
    oauthServiceMock = {
      getAccessToken: jasmine
        .createSpy('getAccessToken')
        .and.returnValue(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.H5x60k_aYr_RB_FwpOaYcHhwPnk3Tt5eeqF66xd6z6kY'
        ),
      getIdentityClaims: jasmine
        .createSpy('getIdentityClaims')
        .and.returnValue({ preferred_username: 'testuser' }),
      configure: jasmine.createSpy('configure'),
      events: { subscribe: jasmine.createSpy('subscribe') },
      loadDiscoveryDocumentAndTryLogin: jasmine.createSpy(
        'loadDiscoveryDocumentAndTryLogin'
      ),
      setupAutomaticSilentRefresh: jasmine.createSpy(
        'setupAutomaticSilentRefresh'
      ),
      hasValidAccessToken: jasmine
        .createSpy('hasValidAccessToken')
        .and.returnValue(true),
      logOut: jasmine.createSpy('logOut'),
      initLoginFlow: jasmine.createSpy('initLoginFlow'),
    };

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: OAuthService, useValue: oauthServiceMock },
        { provide: AuthConfig, useValue: {} },
      ],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NoAccessComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
