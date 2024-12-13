import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface WeatherState {
  data: any[];
  dailyData: any[];
  loading: boolean;
  updating: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: [],
  dailyData: [],
  loading: false,
  updating: false,
  error: null,
};

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (location: string) => {
    const currentWeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`,
    );
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`,
    );
    return {
      currentWeather: currentWeatherResponse.data,
      forecast: forecastResponse.data,
    };
  },
);
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    removeData(state, action: PayloadAction<string>) {
      state.data = state.data.filter((city) => city.name !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const cityExists = state.data.some(
          (city) => city.name === action.payload.currentWeather.name,
        );
        if (!cityExists) {
          state.data.push(action.payload.currentWeather);
        }
        state.dailyData = action.payload.forecast.list.map((item: any) => ({
          date: item.dt_txt,
          temperature: item.main.temp - 273.15,
        }));
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const { removeData } = weatherSlice.actions;
export default weatherSlice.reducer;
