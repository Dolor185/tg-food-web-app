import { Button } from '../../styles/FormElements.styled';

export const PeriodPicker = ({ handlePeriodChange, onBack}) => {
  const periods = [1, 3, 7];

  return (
    <div>
      <h3>Choose period</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        {periods.map((p) => (
          <Button key={p} onClick={() => handlePeriodChange(p)}>
            {p} day{p > 1 ? 's' : ''}
          </Button>
        ))}
        <Button onClick={onBack} style={{ marginLeft: 'auto' }}>
          Back
        </Button>
      </div>
    </div>
  );
};