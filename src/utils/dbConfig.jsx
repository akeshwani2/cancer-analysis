import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"

const sql = neon("postgresql://neondb_owner:XpHOs4MQB7gT@ep-steep-brook-a54rg0gq.us-east-2.aws.neon.tech/beat_cancer?sslmode=require");

// Sets up the drizzle to interact with the db and the schema
export const db = drizzle(sql, { schema });