/** Precompute immutable collision spheres once per body-catalogue change. */
export function createCollisionBodies(bodies) {
  return bodies.map((body) => ({ id: body.id, x: body.position[0], y: body.position[1], z: body.position[2], clearance: body.radius * 1.3 + 0.72 }));
}
/** Swept-sphere avoidance with scalar projection and squared distances; no per-body Vector3 allocations. */
export function moveAvoidingBodies(start, displacement, bodies, ignoreId = null) {
  const dx = displacement.x, dy = displacement.y, dz = displacement.z;
  const lengthSquared = dx * dx + dy * dy + dz * dz;
  if (lengthSquared < 1e-16) return [start.x, start.y, start.z];
  const length = Math.sqrt(lengthSquared), ux = dx / length, uy = dy / length, uz = dz / length;
  let ax = dx, ay = dy, az = dz;
  for (const body of bodies) {
    if (body.id === ignoreId) continue;
    const sx = start.x - body.x, sy = start.y - body.y, sz = start.z - body.z;
    const startD2 = sx * sx + sy * sy + sz * sz;
    const projection = Math.max(0, Math.min(length, (body.x - start.x) * ux + (body.y - start.y) * uy + (body.z - start.z) * uz));
    const qx = start.x + ux * projection - body.x, qy = start.y + uy * projection - body.y, qz = start.z + uz * projection - body.z;
    const gapD2 = qx * qx + qy * qy + qz * qz, minD2 = body.clearance * body.clearance;
    const ex = start.x + dx - body.x, ey = start.y + dy - body.y, ez = start.z + dz - body.z;
    const endD2 = ex * ex + ey * ey + ez * ez;
    if (gapD2 < minD2 && !(startD2 < minD2 && endD2 > startD2)) {
      let nx = qx, ny = qy, nz = qz, nD2 = nx * nx + ny * ny + nz * nz;
      if (nD2 < 0.001) { nx = sx; ny = sy; nz = sz; nD2 = nx * nx + ny * ny + nz * nz; }
      if (nD2 < 0.001) { nx = 0; ny = 1; nz = 0; nD2 = 1; }
      const invN = 1 / Math.sqrt(nD2); nx *= invN; ny *= invN; nz *= invN;
      const along = ux * nx + uy * ny + uz * nz;
      let tx = ux - nx * along, ty = uy - ny * along, tz = uz - nz * along;
      let tD2 = tx * tx + ty * ty + tz * tz;
      if (tD2 < 0.001) { tx = -nz; ty = 0; tz = nx; tD2 = tx * tx + tz * tz; }
      if (tD2 < 0.001) { tx = 0; ty = nz; tz = -ny; tD2 = ty * ty + tz * tz; }
      const invT = 1 / Math.sqrt(tD2);
      ax = tx * invT * length; ay = ty * invT * length; az = tz * invT * length;
      break;
    }
  }
  let cx = start.x + ax, cy = start.y + ay, cz = start.z + az;
  for (const body of bodies) {
    if (body.id === ignoreId) continue;
    const sx = start.x - body.x, sy = start.y - body.y, sz = start.z - body.z;
    const startD2 = sx * sx + sy * sy + sz * sz;
    let nx = cx - body.x, ny = cy - body.y, nz = cz - body.z;
    const d2 = nx * nx + ny * ny + nz * nz, minD2 = body.clearance * body.clearance;
    if (d2 < minD2 && !(startD2 < minD2 && d2 > startD2)) {
      let nD2 = d2;
      if (nD2 < 0.001) { nx = sx; ny = sy; nz = sz; nD2 = nx * nx + ny * ny + nz * nz; }
      if (nD2 < 0.001) { nx = 0; ny = 1; nz = 0; nD2 = 1; }
      const scale = body.clearance / Math.sqrt(nD2);
      cx = body.x + nx * scale; cy = body.y + ny * scale; cz = body.z + nz * scale;
    }
  }
  return [cx, cy, cz];
}
