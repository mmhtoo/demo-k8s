import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";
import { configDotenv } from "dotenv";

export const MASTER_DATA_SERVICE_URL =
  process.env.MASTER_DATA_SERVICE_URL || "http://localhost:8000";
export const ACCOUNT_OPENING_SERVICE_URL =
  process.env.ACCOUNT_OPENING_SERVICE_URL || "http://localhost:8001";

configDotenv();

const app = new Hono();

app.get("/", (c) => {
  return c.text("Welcome to API Gateway!");
});

app.get("/api/v1/townships", async (c) => {
  try {
    const response = await fetch(MASTER_DATA_SERVICE_URL + "/townships");
    const data = (await response.json()) || [];
    return c.json({
      data,
      message: "Success!",
    });
  } catch (e) {
    console.log(e);
    return c.json(
      {
        error: (e as any)?.message || "Failed to retrieve townships!",
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

app.get("/api/v1/states", async (c) => {
  try {
    const response = await fetch(MASTER_DATA_SERVICE_URL + "/states");
    const data = (await response.json()) || [];
    return c.json({
      data,
      message: "Success!",
    });
  } catch (e) {
    console.log(e);
    return c.json(
      {
        error: (e as any)?.message || "Failed to retrieve states!",
      },
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
