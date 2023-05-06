import { table, getMinifiedRecords, findRecordByFilter } from '@/lib/airtable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (!id) return res.status(400).json({ message: 'Id is missing' });

    // find a record
    const records = await findRecordByFilter(id);

    if (records.length !== 0) {
      return res.status(200).json(records);
    } else {
      return res.status(200).json({ message: `Store not found` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default getCoffeeStoreById;
