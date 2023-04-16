import { ObjectSchema } from "realm";

export const TaskSchema : ObjectSchema= {
  name: "Task",

  properties: {
    _id: "string",
    titleTask: "string",
    responsible: "string",
    dateDeadline: "string",
    description: "string",
    status: "string",
  },

  primaryKey: "_id",
}