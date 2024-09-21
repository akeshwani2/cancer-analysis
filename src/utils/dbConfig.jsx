import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"

const sql = neon("postgresql://neondb_owner:dEm0V5xfeNpc@ep-round-bar-a5lzxgk0.us-east-2.aws.neon.tech/neondb?sslmode=require");

// Sets up the drizzle to interact with the db and the schema
export const db = drizzle(sql, { schema });