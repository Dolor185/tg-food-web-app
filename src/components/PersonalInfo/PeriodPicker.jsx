import { Button } from '../../styles/FormElements.styled';

export const PeriodPicker = ({ handlePeriodChange }) => {
  const periods = [1, 3, 7];

  return (
    <div>
      <h3>Выберите период расчёта:</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        {periods.map((p) => (
          <Button key={p} onClick={() => handlePeriodChange(p)}>
            {p} день{p > 1 ? 'а' : ''}
          </Button>
        ))}
      </div>
    </div>
  );
};