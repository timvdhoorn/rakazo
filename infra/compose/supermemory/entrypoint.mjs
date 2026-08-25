import { spawn } from "node:child_process";

const API_KEY_PATTERN = /sm_[A-Za-z0-9_-]{8,}/g;

function forwardRedacted(stream, destination) {
  let pending = "";
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => {
    pending += chunk;
    const lines = pending.split("\n");
    pending = lines.pop() ?? "";
    for (const line of lines)
      destination.write(`${line.replace(API_KEY_PATTERN, "sm_[redacted]")}\n`);
  });
  stream.on("end", () => {
    if (pending) destination.write(pending.replace(API_KEY_PATTERN, "sm_[redacted]"));
  });
}

const server = spawn("/usr/local/bin/supermemory-server", process.argv.slice(2), {
  env: process.env,
  stdio: ["inherit", "pipe", "pipe"],
});

forwardRedacted(server.stdout, process.stdout);
forwardRedacted(server.stderr, process.stderr);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.kill(signal));
}

server.on("error", (error) => {
  console.error(`Could not start Supermemory: ${error.message}`);
  process.exitCode = 1;
});

server.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
