import { fetchCoffeeStores } from '@/lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: 'Oh no! Something went wrong' });
  }
};

export default getCoffeeStoresByLocation;
