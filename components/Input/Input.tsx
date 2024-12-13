import styles from './Input.module.scss';
import loopSvg from '../../public/loop.svg';
import { InputProps } from './InputType';

export default function Input({
  location,
  onLocationChange,
  onSubmit,
}: InputProps): JSX.Element {
  return (
    <div>
      <label className={styles.label}>Add cities' weather</label>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Type Your City..."
          value={location}
          onChange={onLocationChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmit();
            }
          }}
        />
        <button className={styles.buttonSearch} onClick={onSubmit}>
          <img alt="Search Button" src={loopSvg} />
        </button>
      </div>
    </div>
  );
}
