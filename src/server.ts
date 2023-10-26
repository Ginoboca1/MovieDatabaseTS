import express, { Express, Router } from "express";


interface ServerOptions {
  port: number;
  routes: Router;
}

export class ServerApp {
  public app: Express;
  public port: number;

  constructor(options: ServerOptions) {
    const { port, routes } = options;
    this.app = express();
    this.port = port;
    this.app.use(routes);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`App listen in port ${this.port}`);
    });
  }
}
