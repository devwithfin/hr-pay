import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

export default function validate(
  schema: ZodObject<any>,
  source: "body" | "query" | "params",
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req[source]);
      for (const key in req[source]) {
        delete req[source][key];
      }
      Object.assign(req[source], validatedData);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const hasUnrecognizedKeys = error.issues.some(
          (issue) => issue.code === "unrecognized_keys",
        );

        const mainMessage = hasUnrecognizedKeys
          ? "URL request contains unauthorized parameters"
          : "Required fields are missing or invalid";

        return res.status(400).json({
          message: mainMessage,
          error: {
            details: error.issues.map((issue) => {
              if (issue.code === "unrecognized_keys") {
                const ilegalKeys = issue.keys.join(", ");
                return {
                  field: ilegalKeys,
                  message: `The parameter '${ilegalKeys}' is not allowed on this endpoint`,
                };
              }

              return {
                field: issue.path.join("."),
                message: issue.message,
              };
            }),
          },
        });
      }
      next(error);
    }
  };
}
