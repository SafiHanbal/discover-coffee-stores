import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStoresPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30,
    orientation: 'landscape',
  });

  const unshplashResults = photos.response.results;

  return unshplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async (
  latLong = '43.64990206482973%2C-79.38448035304708',
  limit = 6
) => {
  const photos = await getListOfCoffeeStoresPhotos();
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const res = await fetch(
    getUrlForCoffeeStores(latLong, 'coffee', limit),
    options
  );

  const data = await res.json();
  return data.results.map((result, i) => {
    let address, neighbourhood;
    if (result.address) {
      address = result.address;
      neighbourhood = result.neighbourhood;
    } else {
      address = result.location.address;
      neighbourhood = result.location.locality;
    }
    return {
      id: result.fsq_id,
      name: result.name,
      address,
      neighbourhood: neighbourhood ? neighbourhood : '',
      imgUrl: photos[i],
    };
  });
};
