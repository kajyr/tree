import { ObjectId } from 'mongodb';

import { DAL } from './types';
import setChildren from './update-children';

describe('setChildren', () => {
  test('sets the children relations', async () => {
    const childId = '62fd4f190fe2c463fa08b4e7';

    const person = {
      _id: '62fd4e0c00d62227b1a8b13d',
      birth: {
        date: '1983-06-27T22:00:00.000Z',
        place: 'Imperia'
      },
      dateOfBirth: '1983-06-27T22:00:00.000Z',
      events: [
        {
          child: '62fd4f190fe2c463fa08b4e7',
          type: 'child' as const
        }
      ],
      father: '63029f3713143c48abb09eca',
      gender: 'male' as const,
      mother: '62ffeff50bb3a1c9476e2069',
      name: 'Carlo',
      surname: 'Panzi',
      updatedAt: 1665694593053
    };

    const dal: DAL = { findOne: jest.fn(), findOneAndUpdate: jest.fn() };
    await setChildren(dal, person);

    expect(dal.findOneAndUpdate).toHaveBeenCalledWith(new ObjectId(childId), {
      father: new ObjectId('62fd4e0c00d62227b1a8b13d')
    });
  });
});
