export default function TimeSlotPicker({ value, onChange }) {
  return <input type="datetime-local" value={value} onChange={onChange} className="w-full p-3 border rounded" />;
}
