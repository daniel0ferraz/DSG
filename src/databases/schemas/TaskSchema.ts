import {Realm} from '@realm/react';
import uuid from 'react-native-uuid';

type GenerateProps = {
  titleTask: string;
  responsible: string;
  dateDeadline: string;
  description: string;
  status: string;
};

export class TaskSchema extends Realm.Object<TaskSchema> {
  id!: string;
  titleTask!: string;
  responsible!: string;
  dateDeadline!: string;
  description!: string;
  status!: string;

  static generate({
    titleTask,
    responsible,
    dateDeadline,
    description,
    status,
  }: GenerateProps) {
    return {
      id: uuid.v4(),
      titleTask,
      responsible,
      dateDeadline,
      description,
      status,
    };
  }

  static schema = {
    name: 'task',
    primaryKey: 'id',

    properties: {
      id: 'string',
      titleTask: 'string',
      responsible: 'string',
      dateDeadline: 'string',
      description: 'string',
      status: 'string',
    },
  };
}

/* 
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
} */
