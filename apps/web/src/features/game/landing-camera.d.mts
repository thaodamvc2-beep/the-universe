export type LandingCameraAnchor = { cameraWorldPosition: [number, number, number]; lookAtWorldPosition: [number, number, number] };
export function createLandingCameraAnchor(playerPosition: [number, number, number], bodyCenter: [number, number, number], surfaceRadius: number, cameraOffset: [number, number, number]): LandingCameraAnchor;
export function getLandingCameraLocalFrame(playerPosition: [number, number, number], anchor: LandingCameraAnchor): { cameraPosition: [number, number, number]; lookAt: [number, number, number] };
