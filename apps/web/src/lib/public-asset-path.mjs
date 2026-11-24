export function publicAssetPath(path, basePath = process.env.NEXT_PUBLIC_ASSET_BASE_PATH ?? '/the-universe') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const trimmedBase = basePath.replace(/^\/+|\/+$/g, '');
  const normalizedBase = trimmedBase ? `/${trimmedBase}` : '';
  return `${normalizedBase}${normalizedPath}`;
}
