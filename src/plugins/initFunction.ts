/**
 * * Chức năng được thực thi khi khởi tạo trang
 */
export const initFunction = async () => {
  // bắt lỗi toàn cầu
  window.addEventListener("unhandledrejection", event => {
    console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
  });
}