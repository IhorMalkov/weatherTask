export interface InputProps {
  location: string;
  onLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}
