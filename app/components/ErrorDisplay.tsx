export default function ErrorDisplay({ error }: { error: string }) {
  return (
    <div className="error-container bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="error-message text-red-600">{error}</p>
    </div>
  );
}
