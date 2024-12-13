import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../store/weatherSlice';
import { RootState } from '../store/store';

export function useWeather(savedLocations: string[]) {
  const dispatch = useDispatch();
  const { data, loading, error, updating } = useSelector(
    (state: RootState) => state.weather,
  );

  useEffect(() => {
    if (savedLocations.length > 0) {
      savedLocations.forEach((loc) => {
        if (loc.trim() !== '' && !data.some((city: any) => city.name === loc)) {
          dispatch(fetchWeather(loc));
        }
      });
    }
  }, [dispatch, savedLocations, data]);

  return { data, loading, error, updating };
}
