import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


// Init aplication
async function main() {
    console.log("Hello,sss World!");
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })
        .start()
}


// Start aplication
(() => {
    main();
})();