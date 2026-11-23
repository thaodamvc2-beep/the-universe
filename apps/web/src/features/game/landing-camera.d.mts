export type LandingCameraAnchor = { cameraWorldPosition: number[]; lookAtWorldPosition: number[] };
export function createLandingCameraAnchor(playerPosition: number[], bodyCenter: number[], surfaceRadius: number, cameraOffset: number[]): LandingCameraAnchor;
export function getLandingCameraLocalFrame(playerPosition: number[], anchor: LandingCameraAnchor): { cameraPosition: [number, number, number]; lookAt: [number, number, number] };
