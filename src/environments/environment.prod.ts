export const environment = {
  production: true,
  frontendBaseUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost:9090/api',
  keycloak: {
    issuer: 'https://auth.nikolahadzic.net/realms/NotesApp',
    clientId: 'NotesApp',
    requireHttps: false,
  },
};
