export default {
    dialect: "postgresql",
    schema: "./src/utils/schema.jsx",
    out: "./drizzle",

    dbCredentials: {
        url: 'postgresql://neondb_owner:dEm0V5xfeNpc@ep-round-bar-a5lzxgk0.us-east-2.aws.neon.tech/neondb?sslmode=require',
        connectionString: 'postgresql://neondb_owner:dEm0V5xfeNpc@ep-round-bar-a5lzxgk0.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
}