export const supportedLanguages = ['en', 'vi'] as const;
export type Language = (typeof supportedLanguages)[number];

export const translations = {
  en: {
    navExperience: 'The experience',
    navHome: 'Home world',
    languageLabel: 'Language',
    eyebrow: 'A QUIET PLACE BEYOND THE STARS',
    heroTitle: 'A universe',
    heroAccent: 'without edges.',
    heroDescription:
      'Drift beyond the familiar. Discover distant worlds, quiet light and the wonder of simply being here.',
    enterGuest: 'ENTER AS GUEST',
    discoverMore: 'DISCOVER THE UNIVERSE',
    guestNote: 'No account needed. Your journey begins at Earth.',
    homeEyebrow: 'YOUR JOURNEY BEGINS HERE',
    homeTitle: 'Earth is home.',
    homeDescription:
      'A familiar blue world to begin from — and a place you can always return to.',
    homeTag: 'HOME WORLD · SOLAR SYSTEM',
    quietTitle: 'Explore at your own pace.',
    quietDescription:
      'No races. No missions. Just space to wander, look closer and find your own quiet corner of the universe.',
    footerLine: 'MADE FOR WONDER, BUILT FOR QUIET MOMENTS',
    footerCoordinate: 'HOME WORLD · EARTH',
    prototypeAriaLabel: 'Interactive Earth rendering prototype',
    prototypeLabel: 'INTERACTIVE PROTOTYPE',
    prototypeTitle: 'A first glimpse of Earth.',
    prototypeDescription:
      'Move the view to look around this stylized 3D study. This is an early rendering prototype, not the full flight experience.',
    prototypeHint: 'Drag to look around · Pinch or scroll to zoom',
    prototypeFallback: 'This browser could not start the 3D scene. You can still return to the homepage.',
    backHome: 'BACK TO HOME',
    loadingLabel: 'Preparing your space…',
    errorEyebrow: 'A MOMENT OF STILLNESS',
    errorTitle: 'Something interrupted this view.',
    errorDescription: 'The current page could not be displayed.',
    retryLabel: 'Try again',
    notFoundEyebrow: 'NOT FOUND',
    notFoundTitle: 'This path is not here.',
    notFoundDescription: 'The address may be incomplete or no longer available.',
    prototypeNote: 'Prototype scene · Procedural geometry · No external image assets',
  },
  vi: {
    navExperience: 'Trải nghiệm',
    navHome: 'Thế giới quê nhà',
    languageLabel: 'Ngôn ngữ',
    eyebrow: 'MỘT NƠI TĨNH LẶNG NGOÀI NHỮNG VÌ SAO',
    heroTitle: 'Vũ trụ',
    heroAccent: 'không giới hạn.',
    heroDescription:
      'Rời xa những điều quen thuộc. Khám phá các thế giới xa xôi, ánh sáng dịu êm và vẻ đẹp của khoảnh khắc hiện tại.',
    enterGuest: 'BẮT ĐẦU VỚI TƯ CÁCH KHÁCH',
    discoverMore: 'KHÁM PHÁ VŨ TRỤ',
    guestNote: 'Không cần tài khoản. Hành trình bắt đầu từ Trái Đất.',
    homeEyebrow: 'HÀNH TRÌNH BẮT ĐẦU TỪ ĐÂY',
    homeTitle: 'Trái Đất là nhà.',
    homeDescription:
      'Một hành tinh xanh thân thuộc để khởi hành — và luôn là nơi bạn có thể trở về.',
    homeTag: 'THẾ GIỚI QUÊ NHÀ · HỆ MẶT TRỜI',
    quietTitle: 'Khám phá theo nhịp điệu của riêng bạn.',
    quietDescription:
      'Không cuộc đua. Không nhiệm vụ. Chỉ có không gian để phiêu du, quan sát và tìm một góc bình yên của riêng mình trong vũ trụ.',
    footerLine: 'DÀNH CHO SỰ KỲ DIỆU, CHO NHỮNG KHOẢNH KHẮC TĨNH LẶNG',
    footerCoordinate: 'THẾ GIỚI QUÊ NHÀ · TRÁI ĐẤT',
    prototypeAriaLabel: 'Bản thử nghiệm hiển thị Trái Đất tương tác',
    prototypeLabel: 'BẢN THỬ TƯƠNG TÁC',
    prototypeTitle: 'Thoáng nhìn Trái Đất.',
    prototypeDescription:
      'Di chuyển góc nhìn để quan sát mô hình Trái Đất 3D cách điệu này. Đây là bản thử nghiệm hiển thị ban đầu, chưa phải trải nghiệm bay hoàn chỉnh.',
    prototypeHint: 'Kéo để quan sát · Chụm hoặc cuộn để phóng to',
    prototypeFallback: 'Trình duyệt chưa thể khởi chạy cảnh 3D. Bạn vẫn có thể quay lại trang chủ.',
    backHome: 'QUAY VỀ TRANG CHỦ',
    loadingLabel: 'Đang chuẩn bị không gian của bạn…',
    errorEyebrow: 'MỘT KHOẢNH KHẮC TĨNH LẶNG',
    errorTitle: 'Đã có gián đoạn xảy ra.',
    errorDescription: 'Trang hiện tại chưa thể hiển thị.',
    retryLabel: 'Thử lại',
    notFoundEyebrow: 'KHÔNG TÌM THẤY',
    notFoundTitle: 'Đường dẫn này không tồn tại.',
    notFoundDescription: 'Địa chỉ có thể chưa đầy đủ hoặc không còn khả dụng.',
    prototypeNote: 'Cảnh thử nghiệm · Hình khối tạo theo quy tắc · Không dùng ảnh bên ngoài',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['en'];

export function translate(language: Language, key: TranslationKey): string {
  return translations[language][key];
}
