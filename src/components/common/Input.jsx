function Input({ label, id, type ="text", placeholder, value, onChange,required }) {

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} />
    </div>
  )
}

export default Input;