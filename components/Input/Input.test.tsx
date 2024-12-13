import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';
import { InputProps } from './InputType';
import { vi } from 'vitest';

vi.mock('./Input.module.scss', () => ({
  default: {
    label: 'label',
    inputContainer: 'inputContainer',
    input: 'input',
    buttonSearch: 'buttonSearch',
  },
}));

vi.mock('../../public/loop.svg', () => ({
  default: 'loop.svg',
}));

describe('Input Component', () => {
  const setup = (props: Partial<InputProps> = {}) => {
    const initialProps: InputProps = {
      location: '',
      onLocationChange: vi.fn(),
      onSubmit: vi.fn(),
      ...props,
    };

    return render(<Input {...initialProps} />);
  };

  test('renders label and input correctly', () => {
    setup();

    expect(screen.getByText("Add cities' weather")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Type Your City...'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls onLocationChange when input value changes', () => {
    const onLocationChange = vi.fn();
    setup({ onLocationChange });

    const input = screen.getByPlaceholderText('Type Your City...');
    fireEvent.change(input, { target: { value: 'New York' } });

    expect(onLocationChange).toHaveBeenCalled();
    expect(onLocationChange).toHaveBeenCalledWith(expect.anything());
  });

  test('calls onSubmit when button is clicked', () => {
    const onSubmit = vi.fn();
    setup({ onSubmit });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalled();
  });
});
