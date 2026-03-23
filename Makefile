.PHONY: dist test
default: help
dev:
	npm run dev

dist:
	npm run build

view:
	npm run preview

lint:
	npm run lint

new:
	npm run new


	
help:
	@echo "    make dev [npm run dev] chế độ phát triển"
	@echo "    make dist [npm run build] Chế độ biên dịch"
	@echo "    make view [npm run preview] Xem trước tập tin gói"
	@echo "    make new [npm run lint] Tạo mã thông qua các quy trình tự động"
	@echo "    make lint [npm run new] Kiểm tra định dạng"