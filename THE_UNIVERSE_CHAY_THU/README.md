# THE UNIVERSE — Gói 03: Homepage & Language

**Trạng thái:** Đang triển khai · Chưa nghiệm thu
**Phiên bản:** 0.3.0
**Nền tảng:** Next.js App Router · React · TypeScript · React Three Fiber

## 1. Yêu cầu môi trường

- Node.js 20.9 trở lên (khuyến nghị Node.js 22 LTS).
- npm 10 trở lên.
- Kết nối Internet ở lần cài dependency đầu tiên.

## 2. Cài đặt và chạy thử

Từ thư mục gốc repository:

```bash
cp apps/web/.env.example apps/web/.env.local
npm install
npm run dev
```

Mở `http://localhost:3000`. Trang `/` là homepage; nút bắt đầu sẽ mở `/prototype` để xem mô hình Trái Đất 3D.

Windows PowerShell:

```powershell
Copy-Item apps/web/.env.example apps/web/.env.local
npm install
npm run dev
```

## 3. Kiểm tra chất lượng

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run check
```

`npm run check` chạy lint, TypeScript typecheck và tests. Production build chạy riêng bằng `npm run build`.

## 4. Kiểm tra trên điện thoại trong cùng mạng Wi-Fi

Chạy server lắng nghe trên LAN:

```bash
npm run dev --workspace @the-universe/web -- --hostname 0.0.0.0
```

Tìm địa chỉ IPv4 của máy tính (Windows: `ipconfig`), sau đó mở `http://DIA-CHI-IP:3000` trên điện thoại cùng Wi-Fi. Ví dụ `http://192.168.1.20:3000` — thay bằng IP thực tế của máy.

Kiểm tra:
- Homepage ở chiều dọc và ngang; nội dung không tràn màn hình.
- Chuyển EN/VI ở header; English là mặc định khi tải lại.
- Nút guest mở prototype, không yêu cầu đăng nhập.
- Cảnh 3D tải được, kéo một ngón để xoay, chụm/mở hoặc cuộn để zoom.
- Chuyển tab nền rồi quay lại; xoay màn hình; kiểm tra máy nóng, giật hình hoặc mất WebGL context.
- Thử trình duyệt/thiết bị yếu nếu có và ghi lại model máy, OS, browser, FPS cảm nhận, thời gian tải và lỗi.

Lưu ý: đây là prototype R3F đầu tiên để thu thập bằng chứng. Nó chưa triển khai bay sáu hướng và chưa đủ cơ sở để chốt D01. Cần so sánh Babylon.js và PlayCanvas trên thiết bị thật trước khi khóa engine.

## 5. Docker

```bash
docker build -f infrastructure/deployment/Dockerfile -t the-universe-web .
docker run --rm -p 3000:3000 the-universe-web
```

## 6. Cấu trúc chính

```text
apps/web/src/app/             Homepage, prototype route, boundaries, health endpoint
apps/web/src/components/      Shared site header and language provider
apps/web/src/features/        Isolated 3D prototype
apps/web/src/lib/i18n/        English and Vietnamese dictionaries
docs/packages/                Package scopes and acceptance records
docs/decisions/               Package decision logs
tests/                        Foundation and package tests
```

## 7. Trạng thái quyết định

- **D02:** Next.js App Router + React + TypeScript; backend direction Supabase/PostgreSQL remains deferred.
- **D01:** OPEN — React Three Fiber is the first prototype candidate; Babylon.js and PlayCanvas comparison and real-device evidence are still required.
- **D12:** English default and Vietnamese option are implemented for this package; language preference persistence is not included and owner confirmation remains open.
- **D04:** Homepage art direction is provisional and does not approve the complete Gói 07 visual system.

## 8. Tài liệu dự án

- `AGENTS.md`
- `AI_SESSION_START.md`
- `docs/architecture/THE_UNIVERSE_MASTER_SPEC.md`
- `docs/packages/PACKAGE_02_SCOPE_AND_ACCEPTANCE.md`
- `docs/packages/PACKAGE_03_SCOPE_AND_ACCEPTANCE.md`
- `docs/decisions/P02-DECISION-LOG.md`
- `docs/decisions/P03-DECISION-LOG.md`
- `docs/testing/P03_D01_MOBILE_ENGINE_EVALUATION.md`

Gói 03 chỉ được nghiệm thu sau khi chủ dự án review giao diện, chạy các kiểm tra và xác nhận rõ ràng.
