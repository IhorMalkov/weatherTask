import { WeatherProps } from './WeatherProps';
import styles from './WeatherCard.module.scss';
import { Link } from 'react-router-dom';

export default function WeatherCard({
  data,
  loading,
  error,
  updateData,
  removeData,
  updating,
}: WeatherProps): JSX.Element {
  return (
    <div className={styles.weatherCardContainer}>
      {loading && <p className={styles.loadingText}>Loading...</p>}
      {error && <p className={styles.errorText}>Error: {error}</p>}
      <div className={styles.cardGrid}>
        {data.map((weatherData, index) => (
          <div key={index} className={styles.card}>
            <Link
              to={`/weather/${weatherData.name}`}
              className={styles.cardLink}
            >
              <h3 className={styles.cityName}>{weatherData.name}</h3>
              <p className={styles.weatherDescription}>
                {weatherData.weather[0].description}
              </p>
              <p className={styles.temperature}>
                {Math.round(weatherData.main.temp - 273.15)}°C
              </p>
            </Link>
            {updating ? (
              <p className={styles.updatingText}>Updating...</p>
            ) : (
              <button
                className={styles.update}
                onClick={() => updateData(weatherData.name)}
              >
                Update Data
              </button>
            )}
            <button
              className={styles.remove}
              onClick={() => removeData(weatherData.name)}
            >
              Remove City
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
