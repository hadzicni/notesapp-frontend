export const environment = {
  frontendBaseUrl: 'http://localhost:4200',
  production: true,
  apiUrl: 'http://localhost:9090/api',
  keycloak: {
    issuer: 'https://localhost:8080/realms/NotesApp',
    clientId: 'NotesApp',
    requireHttps: false,
  },
};
