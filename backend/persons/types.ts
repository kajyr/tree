import { ObjectId } from 'mongodb';

import { Person } from '../types';

export type DAL = {
  findOneAndUpdate: (id: ObjectId, values: Partial<Person>) => Promise<unknown>;
  findOne(id: ObjectId): Promise<Person | null>;
};
