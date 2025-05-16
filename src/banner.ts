import { environment } from './environments/environment';

export function printBanner(): void {
  if (!environment.production) {
    console.log(`
Information about the application:
-------------------------------------
Application Name: NotesApp

Production Mode: ${environment.production ? 'Yes' : 'No'}
Keycloak Issuer URL: ${environment.keycloak.issuer}
Keycloak Client ID: ${environment.keycloak.clientId}
API Base URL: ${environment.apiUrl}
`);
  } else {
    console.log('Welcome to NotesApp!');
  }
}
