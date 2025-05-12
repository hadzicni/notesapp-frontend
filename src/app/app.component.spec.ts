import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { authConfig, HttpLoaderFactory } from 'src/main';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        OAuthModule.forRoot({ resourceServer: { sendAccessToken: true } }),
        AppRoutingModule,
        MatMomentDateModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }), AppComponent],
    providers: [
        { provide: AuthConfig, useValue: authConfig },
        provideHttpClient(withInterceptorsFromDi())
    ],
    teardown: {destroyAfterEach: true}
}).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
