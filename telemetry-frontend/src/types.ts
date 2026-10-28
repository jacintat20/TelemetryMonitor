export interface TelemetryPoint {
  id: number;
  systemName: string;
  altitudeFeet: number;
  speedKnots: number;
  status: 'Nominal' | 'Warning' | 'Critical';
  timestamp: string;
}