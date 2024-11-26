import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  SERVER_URL: str({
    default: "http://localhost:3005/api/graphql",
  }),
});
