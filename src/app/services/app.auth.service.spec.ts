import { TestBed } from '@angular/core/testing';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AppAuthService } from './app.auth.service';

describe('AppAuthService', () => {
  let service: AppAuthService;

  const mockOAuthService = {
    hasValidAccessToken: () => true,
    getAccessToken: () => 'fake-token',
    getIdentityClaims: () => ({
      preferred_username: 'testuser',
      given_name: 'Test',
      family_name: 'User',
    }),
    configure: () => {},
    loadDiscoveryDocumentAndTryLogin: () => {},
    setupAutomaticSilentRefresh: () => {},
    events: { subscribe: (_: any) => {} },
    initLoginFlow: () => {},
    logOut: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OAuthService,
          useValue: {
            getAccessToken: () =>
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
              'eyJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0IiwiZ2l2ZW5fbmFtZSI6IlRlc3QiLCJmYW1pbHlfbmFtZSI6IlVzZXIiLCJyZXNvdXJjZV9hY2Nlc3MiOnsibm90ZXMiOnsicm9sZXMiOlsiUk9MRV9VU0VSIl19fX0.' +
              'dummy-signature',
            getIdentityClaims: () => ({
              preferred_username: 'testuser',
              given_name: 'Test',
              family_name: 'User',
              resource_access: {
                NotesApp: {
                  roles: ['ROLE_USER'],
                },
              },
            }),
            hasValidAccessToken: () => true,
            events: { subscribe: () => {} },
            configure: () => {},
            loadDiscoveryDocumentAndTryLogin: () => {},
            setupAutomaticSilentRefresh: () => {},
            initLoginFlow: () => {},
            logOut: () => {},
          },
        },
        { provide: AuthConfig, useValue: {} },
        { provide: AuthConfig, useValue: {} },
        AppAuthService,
      ],
    });

    service = TestBed.inject(AppAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
