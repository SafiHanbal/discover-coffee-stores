import { table, getMinifiedRecords, findRecordByFilter } from '@/lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method !== 'POST')
    return res.status(400).json({ message: 'Request type must be POST' });

  const { id, name, address, neighbourhood, voting, imgUrl } = req.body;
  if (!id) return res.status(400).json({ message: 'Id is missing' });

  try {
    // find a record
    const records = await findRecordByFilter(id);

    if (records.length !== 0) {
      return res.status(200).json(records);
    } else {
      // create a record
      if (!name) return res.status(400).json({ message: 'Name is missing' });
      const newRecords = await table.create([
        {
          fields: {
            id,
            name,
            address,
            neighbourhood,
            voting,
            imgUrl,
          },
        },
      ]);
      const records = getMinifiedRecords(newRecords);
      return res.status(201).json(records);
    }
  } catch (err) {
    console.error('Error creating or finding store');
    return res.status(500).json({ message: 'Error creating or finding store' });
  }
};

export default createCoffeeStore;
