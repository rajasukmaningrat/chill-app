function Loading({ label = "Memuat..."}) {
  return (
    <div className="loading-wrap">
      <span className="loading-spinner"/>
      <p>{label}</p>
    </div>
  );
}

export default Loading;