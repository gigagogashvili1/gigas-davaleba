import { Request, Response } from "express";
import crypto from "crypto";
import { Worker } from "worker_threads";
import path from "path";

export function asyncController(req: Request, res: Response) {
  const payload: string = "Random text to hash -_-";
  const algorithm = "sha512";
  const salt = crypto.randomBytes(64);
  const iteration = 1000000;
  const keyLength = 64;

  crypto.pbkdf2(
    payload,
    salt,
    iteration,
    keyLength,
    algorithm,
    (err: Error | null, encryptedPayload: Buffer) => {
      if (err) {
        res.status(500).send("Server error");
      }
      const jsonData = encryptedPayload.toJSON();
      res.status(200).send(jsonData);
    }
  );
}

export function syncController(req: Request, res: Response) {
  const workerPath = path.resolve(process.cwd(), "src", "worker", "index.js");
  const worker = new Worker(workerPath);

  worker.on("message", (data: any) => {
    console.log(data);
    worker.terminate();
  });

  worker.on("error", (err: Error) => {
    console.log(err);
    worker.terminate();
  });

  worker.on("exit", (exitCode: number) => {
    console.log(exitCode);
  });

  res.send("Hello sync");
}
