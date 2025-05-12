export const environment = {
  frontendBaseUrl: 'http://localhost:4200',
  production: true,
  apiUrl: 'http://localhost:9090/api',
  keycloak: {
    issuer: 'https://auth.nikolahadzic.net/realms/NotesApp',
    clientId: 'NotesApp',
    requireHttps: false,
  },
};
