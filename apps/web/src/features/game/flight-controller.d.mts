export type FlightMode = 'grounded' | 'walking' | 'sitting' | 'flying' | 'landing' | 'approaching';
export type FlightDirection = 'forward' | 'back' | 'left' | 'right' | 'up' | 'down';
export type InputState = Record<FlightDirection, boolean> & {
  land: boolean;
  takeoff: boolean;
  boost: boolean;
  resting: boolean;
  autoFlight: boolean;
  mode: FlightMode;
};
export const FLIGHT_MODES: Readonly<Record<'GROUNDED'|'WALKING'|'SITTING'|'FLYING'|'LANDING'|'APPROACHING', FlightMode>>;
export function createFlightInputState(): InputState;
export function transitionFlightControl(input: InputState, action: string, direction?: FlightDirection): InputState;

export function createDirectionInputRegistry(): Map<FlightDirection, Set<string>>;
export function setFlightDirectionSource(input: InputState, registry: Map<FlightDirection, Set<string>>, direction: FlightDirection, source: string, active: boolean): InputState;
