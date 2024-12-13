import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchWeather } from '../../store/weatherSlice';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import styles from './CityDetails.module.scss';

export default function CityDetails() {
  const { cityName } = useParams<{ cityName: string }>();
  const dispatch = useDispatch();

  const weatherData = useSelector((state: any) => state.weather.data);

  useEffect(() => {
    if (cityName) {
      dispatch(fetchWeather(cityName));
    }
  }, [cityName, dispatch]);

  const cityWeather =
    weatherData.find((city) => city.name === cityName) || null;

  return (
    <div className={styles.cityDetails}>
      <Link className={styles.backButton} to={'/'}>
        Go Back
      </Link>

      <h1 className={styles.title}>Weather Forecast for {cityName}</h1>
      {cityWeather && (
        <div className={styles.weatherInfo}>
          <h2 className={styles.subtitle}>Current Weather</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Wind Speed:</span>
              <span className={styles.value}>
                {cityWeather.wind?.speed} m/s
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Wind Direction:</span>
              <span className={styles.value}>{cityWeather.wind?.deg}°</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Temperature:</span>
              <span className={styles.value}>
                {Math.round(cityWeather.main?.temp - 273.15)}°C
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Humidity:</span>
              <span className={styles.value}>
                {cityWeather.main?.humidity}%
              </span>
            </div>
          </div>
        </div>
      )}
      <div className={styles.chartContainer}>
        <h2 className={styles.subtitle}>Temperature Forecast</h2>
        <TemperatureChart />
      </div>
    </div>
  );
}
