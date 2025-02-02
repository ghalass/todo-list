import { z } from "zod";

import * as yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
setLocale(fr);

export const createTodoSchema = yup.object().shape({
  task: yup.string().required().min(3),
  description: yup.string().required().min(2),
  status: yup.boolean(),
});

// // Create Article Schema
// export const createArticleSchema = z.object({
//   title: z
//     .string({
//       required_error: "Title is required",
//       invalid_type_error: "Title should be of type string",
//     })
//     .min(2, { message: "Title must be more than 2 characters" })
//     .max(200, { message: "Title must be less than 200 characters" }),

//   description: z
//     .string({
//       required_error: "Description is required",
//       invalid_type_error: "Description should be of type string",
//     })
//     .min(10, { message: "Description must be more than 10 characters" }),
// });

// // Register Schema
// export const registerSchema = z.object({
//   username: z
//     .string({
//       required_error: "Username is required",
//       invalid_type_error: "Username should be of type string",
//     })
//     .min(2, { message: "Username must be more than 2 characters" })
//     .max(100, { message: "Username must be less than 100 characters" }),

//   email: z
//     .string()
//     .email()
//     .min(3, { message: "Email must be more than 3 characters" })
//     .max(200, { message: "Email must be less than 200 characters" }),

//   password: z
//     .string({
//       required_error: "Password is required",
//       invalid_type_error: "Password should be of type string",
//     })
//     .min(6, { message: "Password must be more than 6 characters" }),
// });

// // Login Schema
// export const loginSchema = z.object({
//   email: z
//     .string()
//     .email()
//     .min(3, { message: "Email must be more than 3 characters" })
//     .max(200, { message: "Email must be less than 200 characters" }),

//   password: z
//     .string({
//       required_error: "Password is required",
//       invalid_type_error: "Password should be of type string",
//     })
//     .min(6, { message: "Password must be more than 6 characters" }),
// });

// // Create Comment Schema
// export const createCommentSchema = z.object({
//   text: z
//     .string()
//     .min(2, { message: "Text must be more than 2 characters" })
//     .max(500, { message: "Text must be less than 500 characters" }),

//   articleId: z.number({
//     required_error: "articleId is required",
//   }),
// });

// // Register Schema
// export const updateUserSchema = z.object({
//   username: z
//     .string({
//       required_error: "Username is required",
//       invalid_type_error: "Username should be of type string",
//     })
//     .min(2, { message: "Username must be more than 2 characters" })
//     .max(100, { message: "Username must be less than 100 characters" })
//     .optional(),

//   email: z
//     .string()
//     .email()
//     .min(3, { message: "Email must be more than 3 characters" })
//     .max(200, { message: "Email must be less than 200 characters" })
//     .optional(),

//   password: z
//     .string({
//       required_error: "Password is required",
//       invalid_type_error: "Password should be of type string",
//     })
//     .min(6, { message: "Password must be more than 6 characters" })
//     .optional(),
// });

// // Create Site Schema
// export const createSiteSchema = z.object({
//   name: z.string().min(4),
// });

// // Create Typeparc Schema
// export const createTypeparcSchema = z.object({
//   name: z.string().min(4),
// });

// // Create Parc Schema
// export const createParcSchema = z.object({
//   name: z
//     .string({
//       required_error: "Parc name is required",
//       invalid_type_error: "Parc should be of type string",
//     })
//     .min(3),
//   typeparcId: z.number({
//     required_error: "Typeparc name is required",
//     invalid_type_error: "Typeparc should be of type number",
//   }),
// });

// // Create Engin Schema
// export const createEnginSchema = z.object({
//   name: z
//     .string({
//       required_error: "Engin name is required",
//       invalid_type_error: "Engin should be of type string",
//     })
//     .min(1, { message: "Engin name must be more than 3 characters" }),
//   parcId: z.number(),
//   siteId: z.number(),
// });

// // Update Engin Schema
// export const updateEnginSchema = z.object({
//   name: z.string().min(1).optional(),
//   active: z.boolean().optional(),
//   parcId: z.number().optional(),
//   siteId: z.number().optional(),
// });

// // Create Typelubrifiant Schema
// export const createTypelubrifiantSchema = z.object({
//   name: z
//     .string({
//       required_error: "Typelubrifiant name is required",
//       invalid_type_error: "Typelubrifiant should be of type string",
//     })
//     .min(3, { message: "Typelubrifiant name must be more than 3 characters" }),
// });

// // Create Lubrifiant Schema
// export const createLubrifiantSchema = z.object({
//   name: z
//     .string({
//       required_error: "Lubrifiant name is required",
//       invalid_type_error: "Lubrifiant should be of type string",
//     })
//     .min(3, { message: "Lubrifiant name must be more than 3 characters" }),
//   typelubrifiantId: z.number({
//     required_error: "Type Lubrifiant name is required",
//     invalid_type_error: "Type Lubrifiant should be of type number",
//   }),
// });

// // Create Saisielubrifiant Schema
// export const createSaisielubrifiantSchema = z.object({
//   enginId: z.number({
//     required_error: "Engin name is required",
//     invalid_type_error: "Engin should be of type string",
//   }),
//   lubrifiantId: z.number({
//     required_error: "Lubrifiant name is required",
//     invalid_type_error: "Lubrifiant name should be of type number",
//   }),
//   du: z.string().datetime("Invalid Date DU datetime"),
//   au: z.string().datetime("Invalid Date AU datetime"),
//   hrm: z.number({
//     required_error: "HRM is required",
//     invalid_type_error: "HRM should be of type number",
//   }),
//   qte: z.number({
//     required_error: "QTE is required",
//     invalid_type_error: "QTE should be of type number",
//   }),
// });

// // Update Saisielubrifiant Schema
// export const updateSaisielubrifiantSchema = z.object({
//   enginId: z
//     .number({
//       required_error: "Engin name is required",
//       invalid_type_error: "Engin should be of type string",
//     })
//     .optional(),
//   lubrifiantId: z
//     .number({
//       required_error: "Lubrifiant name is required",
//       invalid_type_error: "Lubrifiant name should be of type number",
//     })
//     .optional(),
//   du: z.string().datetime("Invalid Date DU datetime").optional(),
//   au: z.string().datetime("Invalid Date AU datetime").optional(),
//   hrm: z
//     .number({
//       required_error: "HRM is required",
//       invalid_type_error: "HRM should be of type number",
//     })
//     .optional(),
//   qte: z
//     .number({
//       required_error: "QTE is required",
//       invalid_type_error: "QTE should be of type number",
//     })
//     .optional(),
// });
