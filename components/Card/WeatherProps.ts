export interface WeatherProps {
  data: any[];
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateData: (cityName: string) => void;
  removeData: (cityName: string) => void;
}
