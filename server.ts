import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { renderApp } from "./dist/server/ServerApp.ts";
import fs from 'fs'

const  __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const html = fs.readFileSync(path.resolve(__dirname, './dist/client/index.html')).toString()


const parts = html.split("not rendered");

const app = express()
app.use("assets", express.static(path.resolve(__dirname, "./dist/client/assets")))

app.use((req, res) => {
    res.write(parts[0]);

    const stream = renderApp(req.url, {
        onShellReady() {
            // If it is the crawler, do nothing here
            stream.pipe(res)
        },
        onShellError() {
            // do error handling here
        },
        onAllReady() {
            // If it is the crawler, do nothing here
            // stream.pipe(res)

            res.write(parts[1]);
            res.end();
        },
        onError(err) {
            console.log(err)
        }
    })
})
// log here
app.listen(PORT)