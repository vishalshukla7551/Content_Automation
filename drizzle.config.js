/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_yoKx3M0tsjpg@ep-nameless-breeze-a5pvjyok.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
  };
  