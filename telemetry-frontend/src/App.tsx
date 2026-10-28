import { useEffect, useState } from 'react';
import type { TelemetryPoint } from './types';

export default function App() {
  const [data, setData] = useState<TelemetryPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTelemetry = async () => {
    try {
      setError(null);
      // UPDATE THIS PORT to match your `dotnet run` output!
      const res = await fetch('http://localhost:5027/api/telemetry'); 
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result: TelemetryPoint[] = await res.json();
      setData(result);
    } catch (err: any) {
      console.error('Failed to fetch telemetry:', err);
      setError(err.message || 'Failed to fetch telemetry');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Mission Control Telemetry Monitor</h1>
      <button onClick={fetchTelemetry}>Refresh Now</button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {loading ? (
        <p>Loading telemetry stream...</p>
      ) : (
        <table border={1} cellPadding={10} style={{ marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>System</th>
              <th>Altitude (ft)</th>
              <th>Speed (kts)</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.systemName}</td>
                <td>{item.altitudeFeet?.toLocaleString()}</td>
                <td>{item.speedKnots}</td>
                <td style={{ color: item.status === 'Critical' ? 'red' : item.status === 'Warning' ? 'orange' : 'green' }}>
                  {item.status}
                </td>
                <td>{item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}