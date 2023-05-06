import { useState } from 'react';
import { useContext } from 'react';
import { StoreContext, ACTION_TYPES } from '@/store/store-context';

const useTrackLocation = () => {
  const [locationErrMsg, setLocationErrMsg] = useState('');
  // const [latLong, setLatLong] = useState('');
  const { latLong, dispatch } = useContext(StoreContext);
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: `${latitude},${longitude}`,
    });
    setIsFindingLocation(false);
    setLocationErrMsg('');
  };

  const error = () => {
    setIsFindingLocation(false);
    setLocationErrMsg('Unable to retrive your location');
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrMsg('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    isFindingLocation,
    handleTrackLocation,
    locationErrMsg,
  };
};

export default useTrackLocation;
