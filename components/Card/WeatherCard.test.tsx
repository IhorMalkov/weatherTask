import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WeatherCard from './WeatherCard';
import { BrowserRouter as Router } from 'react-router-dom';

const mockData = [
  {
    name: 'London',
    weather: [{ description: 'Clear sky' }],
    main: { temp: 300 },
  },
  {
    name: 'Paris',
    weather: [{ description: 'Cloudy' }],
    main: { temp: 290 },
  },
];

const mockUpdateData = vi.fn();
const mockRemoveData = vi.fn();

describe('WeatherCard Component', () => {
  it('renders loading state', () => {
    render(
      <Router>
        <WeatherCard
          data={[]}
          loading={true}
          error={null}
          updateData={mockUpdateData}
          removeData={mockRemoveData}
          updating={false}
        />
      </Router>,
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <Router>
        <WeatherCard
          data={[]}
          loading={false}
          error="Failed to fetch weather data"
          updateData={mockUpdateData}
          removeData={mockRemoveData}
          updating={false}
        />
      </Router>,
    );
    expect(
      screen.getByText(/Error: Failed to fetch weather data/i),
    ).toBeInTheDocument();
  });

  it('renders weather data correctly', () => {
    render(
      <Router>
        <WeatherCard
          data={mockData}
          loading={false}
          error={null}
          updateData={mockUpdateData}
          removeData={mockRemoveData}
          updating={false}
        />
      </Router>,
    );
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
    expect(screen.getByText('27°C')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
    expect(screen.getByText('17°C')).toBeInTheDocument();
  });

  it('calls updateData when the update button is clicked', () => {
    render(
      <Router>
        <WeatherCard
          data={mockData}
          loading={false}
          error={null}
          updateData={mockUpdateData}
          removeData={mockRemoveData}
          updating={false}
        />
      </Router>,
    );
    const updateButton = screen.getAllByText('Update Data')[0];
    fireEvent.click(updateButton);
    expect(mockUpdateData).toHaveBeenCalledWith('London');
  });

  it('calls removeData when the remove button is clicked', () => {
    render(
      <Router>
        <WeatherCard
          data={mockData}
          loading={false}
          error={null}
          updateData={mockUpdateData}
          removeData={mockRemoveData}
          updating={false}
        />
      </Router>,
    );
    const removeButton = screen.getAllByText('Remove City')[0];
    fireEvent.click(removeButton);
    expect(mockRemoveData).toHaveBeenCalledWith('London');
  });
});
