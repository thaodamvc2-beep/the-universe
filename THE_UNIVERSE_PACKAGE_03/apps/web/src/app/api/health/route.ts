export function GET() {
  return Response.json({
    status: 'ok',
    service: 'the-universe-web',
    package: '03',
  });
}
