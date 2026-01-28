const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    const result = schema.safeParse(req[property]);

    if (result.success) {
      req[property] = result.data;
      return next();
    }

    // Collect unique field names
    const fields = [
      ...new Set(result.error.issues.map((err) => err.path.join("."))),
    ];

    return res.status(400).json({
      success: false,
      message: `Invalid or missing fields: ${fields.join(", ")}`,
    });
  };

export default validate;
