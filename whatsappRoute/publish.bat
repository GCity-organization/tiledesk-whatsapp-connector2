@echo off
setlocal enabledelayedexpansion

:: Lấy phiên bản từ tệp package.json
for /f %%a in ('node -e "console.log(require('./package.json').version)"') do set "version=%%a"
echo "Version: !version!"

:: Kiểm tra phiên bản có tồn tại không
if "!version!" neq "" (
    :: Tạo tag mới với phiên bản
    git tag -a "!version!" -m "!version!"
    echo "Created: !version!"

    :: Đẩy tag lên repository
    git push --tags

    :: Xuất bản package lên npm
    npm publish --access public
)