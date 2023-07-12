export function TextInput({ label, id, value, onChange, readonly, long }) {
  return (
    <div className="mb-3 row">
      <label htmlFor={id} className="col-sm-2 col-form-label">
        {label}
      </label>
      <div className="col-sm-10">
        <input
          type={long ? "textarea" : "text"}
          rows={long ? 5 : 1}
          required
          readOnly={readonly}
          className={"form-control" + (readonly ? "-plaintext" : "")}
          id={id}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
