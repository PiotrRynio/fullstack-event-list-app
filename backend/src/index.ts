import { App } from './App';
console.log('Application was started');

const port = process.env.REST_API_PORT || 5000;

App().then(({ restApi }) =>
  restApi.listen(port, () => {
    console.log(`[App]: REST API listening on port ${port}`);
  }),
);
