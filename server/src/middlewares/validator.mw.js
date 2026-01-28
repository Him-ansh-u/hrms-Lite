const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    try {
      const parsed = schema.parse(req[property]);
      req[property] = parsed;
      
      next();

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error?.issues?.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
  };

export default validate;
