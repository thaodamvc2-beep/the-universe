export type CollisionBody = Readonly<{ id: string; x: number; y: number; z: number; clearance: number }>;
export function createCollisionBodies(bodies: ReadonlyArray<{ id: string; position: readonly [number, number, number]; radius: number }>): CollisionBody[];
export function moveAvoidingBodies(start: { x: number; y: number; z: number }, displacement: { x: number; y: number; z: number }, bodies: ReadonlyArray<CollisionBody>, ignoreId?: string | null): [number, number, number];
