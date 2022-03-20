import { useState, useId } from "react";
import DatePicker from "react-datepicker";
import "./NewsSelectItem.css";

function NewsSelectItem({
  label,
  field,
  isInput,
  isSelect,
  isDate,
  isNumber,
  selectList = [],
  setSelectObj,
}) {
  const [value, setValue] = useState("");
  const [number, setNumber] = useState(100);
  const [date, setDate] = useState();

  const id = useId();
  const handleChange = (e) => {
    if (isNumber) {
      const newNumber = parseInt(e.target.value);
      setNumber(newNumber);
      setSelectObj((obj) => ({ ...obj, [field]: newNumber ? newNumber : 100 }));
      return;
    }

    if (isDate) {
      const newDate = e;
      newDate.setHours(newDate.getHours() + 15);
      setDate(newDate);

      const dateString = newDate.toISOString().split("T")[0];
      setSelectObj((obj) => ({ ...obj, [field]: dateString }));
      return;
    }

    const newValue = e.target.value;
    setValue(newValue);
    setSelectObj((obj) => ({ ...obj, [field]: newValue }));
  };

  return (
    <div className="news-select-item">
      <label className="news-select-label" htmlFor={id}>
        {label}
      </label>
      {isInput && (
        <input
          className="news-select-input"
          id={id}
          name={label}
          value={value}
          onChange={handleChange}
        />
      )}
      {isSelect && (
        <select name={label} value={value} onChange={handleChange}>
          <option value="">전체</option>
          {selectList.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      )}
      {isDate && <DatePicker selected={date} onChange={handleChange} />}
      {isNumber && (
        <input
          className="news-select-input"
          id={id}
          name={label}
          value={number}
          type="number"
          onChange={handleChange}
        />
      )}
    </div>
  );
}

export default NewsSelectItem;
