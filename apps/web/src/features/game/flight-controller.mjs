export const FLIGHT_MODES = Object.freeze({
  GROUNDED: 'grounded',
  WALKING: 'walking',
  SITTING: 'sitting',
  FLYING: 'flying',
  LANDING: 'landing',
  APPROACHING: 'approaching',
});

const DIRECTIONS = ['forward', 'back', 'left', 'right', 'up', 'down'];

export function createFlightInputState() {
  return {
    forward: false, back: false, left: false, right: false, up: false, down: false,
    land: false, takeoff: false, boost: false, resting: false, autoFlight: false,
    mode: FLIGHT_MODES.GROUNDED,
  };
}

function clearMovement(input) {
  for (const key of DIRECTIONS) input[key] = false;
}

export function transitionFlightControl(input, action, direction) {
  switch (action) {
    case 'WALK_START':
      if (input.mode === FLIGHT_MODES.GROUNDED || input.mode === FLIGHT_MODES.WALKING || input.mode === FLIGHT_MODES.SITTING) {
        input.mode = FLIGHT_MODES.WALKING;
        input.resting = false;
      }
      break;
    case 'WALK_STOP':
      if (direction) input[direction] = false;
      if (input.mode === FLIGHT_MODES.WALKING && !DIRECTIONS.some((key) => input[key])) input.mode = FLIGHT_MODES.GROUNDED;
      break;
    case 'SIT':
      if ([FLIGHT_MODES.GROUNDED, FLIGHT_MODES.WALKING, FLIGHT_MODES.SITTING].includes(input.mode)) {
        clearMovement(input);
        input.mode = FLIGHT_MODES.SITTING;
        input.resting = true;
      }
      break;
    case 'WAKE':
      if (input.mode === FLIGHT_MODES.SITTING) input.mode = FLIGHT_MODES.GROUNDED;
      input.resting = false;
      break;
    case 'TOGGLE_FLIGHT':
      if (input.mode === FLIGHT_MODES.FLYING && input.autoFlight) {
        input.autoFlight = false;
      } else {
        clearMovement(input);
        input.mode = FLIGHT_MODES.FLYING;
        input.resting = false;
        input.land = false;
        input.takeoff = true;
        input.autoFlight = true;
      }
      break;
    case 'LAND':
      clearMovement(input);
      input.mode = FLIGHT_MODES.LANDING;
      input.land = true;
      input.takeoff = false;
      input.autoFlight = false;
      input.resting = false;
      break;
    case 'BEGIN_APPROACH':
      clearMovement(input);
      input.mode = FLIGHT_MODES.APPROACHING;
      input.land = false;
      input.takeoff = false;
      input.autoFlight = false;
      input.resting = false;
      break;
    case 'MANUAL_OVERRIDE':
      input.mode = FLIGHT_MODES.FLYING;
      input.autoFlight = false;
      input.land = false;
      input.takeoff = false;
      input.resting = false;
      break;
    case 'DIRECTION_START':
      if (input.mode === FLIGHT_MODES.GROUNDED || input.mode === FLIGHT_MODES.WALKING || input.mode === FLIGHT_MODES.SITTING) {
        input.mode = FLIGHT_MODES.WALKING;
      } else if (input.mode === FLIGHT_MODES.LANDING || input.mode === FLIGHT_MODES.APPROACHING) {
        input.mode = FLIGHT_MODES.FLYING;
      }
      if (direction && DIRECTIONS.includes(direction)) input[direction] = true;
      if (!(input.mode === FLIGHT_MODES.FLYING && input.autoFlight)) input.autoFlight = false;
      input.land = false;
      input.resting = false;
      break;
    case 'DIRECTION_STOP':
      if (direction && DIRECTIONS.includes(direction)) input[direction] = false;
      if (input.mode === FLIGHT_MODES.WALKING && !DIRECTIONS.some((key) => input[key])) input.mode = FLIGHT_MODES.GROUNDED;
      break;
    case 'ARRIVED_LANDED':
      clearMovement(input);
      input.mode = FLIGHT_MODES.GROUNDED;
      input.land = false;
      input.takeoff = false;
      input.autoFlight = false;
      input.resting = false;
      break;
    case 'APPROACH_COMPLETE':
      clearMovement(input);
      input.mode = FLIGHT_MODES.FLYING;
      input.land = false;
      input.takeoff = false;
      input.autoFlight = false;
      break;
    case 'TAKEOFF_COMPLETE':
      input.takeoff = false;
      input.mode = FLIGHT_MODES.FLYING;
      break;
    case 'RELEASE_ALL':
      clearMovement(input);
      input.boost = false;
      if (input.mode === FLIGHT_MODES.WALKING) input.mode = FLIGHT_MODES.GROUNDED;
      break;
    case 'RESET_HOME':
      clearMovement(input);
      input.land = false;
      input.takeoff = false;
      input.boost = false;
      input.resting = false;
      input.autoFlight = false;
      input.mode = FLIGHT_MODES.GROUNDED;
      break;
    default:
      throw new Error('Unknown flight control action: ' + action);
  }
  return input;
}


/** Track held directions by physical input source so multi-touch and keyboard releases cannot cancel each other. */
export function createDirectionInputRegistry() {
  return new Map();
}

export function setFlightDirectionSource(input, registry, direction, source, active) {
  if (!DIRECTIONS.includes(direction)) throw new Error('Unknown flight direction: ' + direction);
  if (!source) throw new Error('A stable input source is required');
  const sources = registry.get(direction) ?? new Set();
  const wasActive = sources.size > 0;
  if (active) sources.add(source);
  else sources.delete(source);
  if (sources.size) registry.set(direction, sources);
  else registry.delete(direction);
  if (!wasActive && sources.size) transitionFlightControl(input, 'DIRECTION_START', direction);
  else if (wasActive && !sources.size) transitionFlightControl(input, 'DIRECTION_STOP', direction);
  return input;
}

/** Return false for controls that own pointer capture; only the scene surface may start camera dragging. */
export function shouldStartCameraDrag(target) {
  return !(target && typeof target.closest === 'function' && target.closest('button, a, input, textarea, select, [role="button"]'));
}
