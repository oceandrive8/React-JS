export default function Box({ title, className, children }) {
  return (
    <div className={`box ${className || ''}`}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}
