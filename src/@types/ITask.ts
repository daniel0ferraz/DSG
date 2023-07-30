import {Realm} from '@realm/react';

export type ITask = {
  id?: string;
  titleTask: string;
  responsible: string;
  dateDeadline: string;
  description: string;
  status: string;
};

export type ITaskObject = ITask & Realm.Object;
