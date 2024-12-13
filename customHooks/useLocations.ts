import { useState, useEffect } from 'react';

export function useLocation() {
  const [location, setLocation] = useState<string>('');
  const [savedLocations, setSavedLocations] = useState<string[]>(() => {
    const storedLocations = localStorage.getItem('locations');
    return storedLocations ? JSON.parse(storedLocations) : [];
  });

  useEffect(() => {
    localStorage.setItem('locations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = (location: string) => {
    if (location && !savedLocations.includes(location)) {
      const updatedLocations = [...savedLocations, location];
      setSavedLocations(updatedLocations);
      setLocation('');
    }
  };

  return {
    location,
    savedLocations,
    handleLocationChange,
    handleLocationSubmit,
    setSavedLocations,
  };
}
