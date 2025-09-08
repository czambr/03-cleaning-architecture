import express, { Router } from 'express';

interface Options {
    port?: number;
    routes: Router
}

export class Server {
    public readonly app = express();
    private port: number;
    private routes: Router;

    constructor(options: Options) {
        const { port = 3100, routes } = options;
        this.port = port;
        this.routes = routes
    }

    async start() {

        // Middelware to serialize the data to JSON
        this.app.use(express.json())

        // Use the routes defined
        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server running in the port ${this.port}`);
        });
    }
}
