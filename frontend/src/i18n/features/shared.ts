const zh = {
  sse: {
    aiGenerating: 'AI生成中...',
    preparing: '准备生成...',
    doNotClose: '请勿关闭页面，生成过程需要一定时间',
    cancelTask: '取消任务',
  },
  markdown: {
    noContent: '暂无内容',
    announcementImageAlt: '公告图片',
  },
  api: {
    requestFailed: '请求失败',
    badRequest: '请求参数错误',
    sessionExpired: '登录状态已失效，请重新登录',
    forbidden: '没有权限访问',
    notFound: '请求的资源不存在',
    validationFailed: '请求参数验证失败',
    serverError: '服务器内部错误',
    serviceUnavailable: '服务暂时不可用，请稍后重试',
    requestFailedStatus: '请求失败 ({{status}})',
    networkError: '网络错误，请检查网络连接',
  },
};

const en = {
  sse: {
    aiGenerating: 'AI generating...',
    preparing: 'Preparing...',
    doNotClose: 'Do not close this page, generation takes some time',
    cancelTask: 'Cancel task',
  },
  markdown: {
    noContent: 'No content',
    announcementImageAlt: 'Announcement image',
  },
  api: {
    requestFailed: 'Request failed',
    badRequest: 'Invalid request parameters',
    sessionExpired: 'Your session has expired, please sign in again',
    forbidden: 'Access denied',
    notFound: 'The requested resource was not found',
    validationFailed: 'Request parameter validation failed',
    serverError: 'Internal server error',
    serviceUnavailable: 'Service temporarily unavailable, please try again later',
    requestFailedStatus: 'Request failed ({{status}})',
    networkError: 'Network error, please check your connection',
  },
};

const vi = {
  sse: {
    aiGenerating: 'AI đang tạo...',
    preparing: 'Đang chuẩn bị tạo...',
    doNotClose: 'Đừng đóng trang, quá trình tạo cần một khoảng thời gian',
    cancelTask: 'Hủy tác vụ',
  },
  markdown: {
    noContent: 'Chưa có nội dung',
    announcementImageAlt: 'Ảnh thông báo',
  },
  api: {
    requestFailed: 'Yêu cầu thất bại',
    badRequest: 'Tham số yêu cầu không hợp lệ',
    sessionExpired: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại',
    forbidden: 'Không có quyền truy cập',
    notFound: 'Không tìm thấy tài nguyên yêu cầu',
    validationFailed: 'Xác thực tham số yêu cầu thất bại',
    serverError: 'Lỗi máy chủ nội bộ',
    serviceUnavailable: 'Dịch vụ tạm thời không khả dụng, vui lòng thử lại sau',
    requestFailedStatus: 'Yêu cầu thất bại ({{status}})',
    networkError: 'Lỗi mạng, vui lòng kiểm tra kết nối',
  },
};

export default { zh, en, vi };
