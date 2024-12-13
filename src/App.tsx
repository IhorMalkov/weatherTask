import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchWeather, removeData } from '../store/weatherSlice';
import { useWeather } from '../customHooks/useWeather';
import { useLocation } from '../customHooks/useLocations';
import WeatherCard from '../components/Card/WeatherCard';
import Input from '../components/Input/Input';
import './global.scss';
import CityDetails from '../components/Pages/CityDetails';

export default function App() {
  const dispatch = useDispatch();
  const {
    location,
    savedLocations,
    handleLocationChange,
    handleLocationSubmit,
    setSavedLocations,
  } = useLocation();
  const { data, loading, error, updating } = useWeather(savedLocations);

  const handleSubmit = () => {
    handleLocationSubmit(location);
    dispatch(fetchWeather(location));
  };

  const handleUpdateData = (cityName: string) => {
    dispatch(fetchWeather(cityName));
  };

  const handleRemoveData = (cityName: string) => {
    dispatch(removeData(cityName));
    const normalizedCityName = cityName.toLowerCase();
    const updatedLocations = savedLocations.filter(
      (loc) => loc.toLowerCase() !== normalizedCityName,
    );
    setSavedLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  return (
    <div className="global-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Input
                location={location}
                onLocationChange={handleLocationChange}
                onSubmit={handleSubmit}
              />
              <WeatherCard
                loading={loading}
                data={data}
                error={error}
                updating={updating}
                updateData={handleUpdateData}
                removeData={handleRemoveData}
              />
            </>
          }
        />

        <Route path="/weather/:cityName" element={<CityDetails />} />
      </Routes>
    </div>
  );
}
