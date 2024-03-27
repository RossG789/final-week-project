export default function Toast(message: any) {
  return (
    <div className="toast">
      <div className="alert alert-info">
        <span>{message}</span>
      </div>
    </div>
  );
}
