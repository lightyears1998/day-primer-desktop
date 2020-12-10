import path from "path";

import { createConnection } from "typeorm";

import * as entities from "./entity";

export async function createDatabaseConnection(appDocumentsPath: string): Promise<void> {
  await createConnection({
    entities: [entities.Action, entities.Project],
    type: "better-sqlite3",
    database: path.resolve(appDocumentsPath, "./database.sqlite3"),
    logger: "advanced-console",
    logging: "all"
  });
}
