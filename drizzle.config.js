export default {
    dialect: "postgresql",
    schema: "./src/utils/schema.jsx",
    out: "./drizzle",

    dbCredentials: {
        url: 'postgresql://neondb_owner:XpHOs4MQB7gT@ep-steep-brook-a54rg0gq.us-east-2.aws.neon.tech/beat_cancer?sslmode=require',
        connectionString: 'postgresql://neondb_owner:XpHOs4MQB7gT@ep-steep-brook-a54rg0gq.us-east-2.aws.neon.tech/beat_cancer?sslmode=require',
    }
}