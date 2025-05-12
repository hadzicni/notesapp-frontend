export const environment = {
  production: false,
  frontendBaseUrl: 'http://localhost:4200',
  apiUrl: 'http://WS568598.ms.uhbs.ch:9090/api',
  keycloak: {
    issuer: 'https://auth.nikolahadzic.net/realms/NotesApp',
    clientId: 'NotesApp',
    requireHttps: false,
  },
};
