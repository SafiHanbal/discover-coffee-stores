import { table, findRecordByFilter, getMinifiedRecords } from '@/lib/airtable';

const favoriteCoffeeStoreById = async (req, res) => {
  if (req.method !== 'PUT')
    return res.status(400).json({ message: 'Request must be "PUT"' });

  const { id } = req.body;
  if (!id) return req.status(400).json({ message: 'Id is missing' });

  try {
    const records = await findRecordByFilter(id);

    if (records.length !== 0) {
      const record = records[0];
      const calculateVoting = parseInt(record.voting) + 1;

      // update a record

      const updateRecord = await table.update([
        {
          id: record.recordId,
          fields: {
            voting: calculateVoting,
          },
        },
      ]);

      if (updateRecord) {
        const minifiedRecords = getMinifiedRecords(updateRecord);
        return res.status(200).json({ records: minifiedRecords });
      }
    } else {
      return res
        .status(400)
        .json({ message: `coffee store id doesn't exitst`, id });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error upvoting coffee store' });
  }
};

export default favoriteCoffeeStoreById;
