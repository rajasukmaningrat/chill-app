function Button({ children, type="button", variant="login", className="", onClick}) {

  return (
  <button type={type} className={`btn-${variant} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;