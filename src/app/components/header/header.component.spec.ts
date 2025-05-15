import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule],
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
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
