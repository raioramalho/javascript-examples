import { spawn } from "child_process";

async function main() {
    console.clear();
    console.log(`Starting app....`);

    const call = spawn("python3", ["--version"]);

    call.stdout.on("data", data => {
        const result = `${data}`;
        console.log(result)
    });

}

main();