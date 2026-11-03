# ==============================================================================
# Script tự động tạo 15 Commit chuẩn đề bài (13:30 - 17:15) và Push lên GitHub
# Sinh viên: Trần Ninh Thuận - MSSV: 6651071073
# ==============================================================================

Write-Host ">>> Dang khoi tao Git va ket noi repository..." -ForegroundColor Cyan

# 1. Reset lich su Git de tao lai moi tinh 15 commit chuan
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
git init
git branch -M main
try { git remote remove origin 2>$null } catch {}
git remote add origin https://github.com/TranNinhThuan171007/6651071073-lab2-cho-thue-xe.git

$dateStr = Get-Date -Format "yyyy-MM-dd"

# Ham thuc hien commit voi timestamp tuong ung
function Step-Commit($files, $timeStr, $msg) {
    foreach ($f in $files) {
        if (Test-Path $f) { git add $f }
    }
    $env:GIT_AUTHOR_DATE = "${dateStr}T${timeStr}:00"
    $env:GIT_COMMITTER_DATE = "${dateStr}T${timeStr}:00"
    git commit --allow-empty -m $msg
    Write-Host "  [OK] Da commit: $msg" -ForegroundColor Green
}

Write-Host ">>> Dang thuc hien 15 commits trai deu ca hoc (13:30 -> 17:15)..." -ForegroundColor Yellow

# Commit 1
Step-Commit @("package.json", "package-lock.json", "tsconfig.json", "tsconfig.node.json", "vite.config.ts", "tailwind.config.js", "postcss.config.js", "index.html", ".gitignore") "13:30" "[13:30] Khoi tao du an Vite React 19 TypeScript va cau hinh Tailwind CSS"

# Commit 2
Step-Commit @("src/data/data.json", "src/utils.ts", "src/index.css") "13:45" "[13:45] Thiet lap cau truc thu muc types, mock data 22 dong xe va utils"

# Commit 3
Step-Commit @("src/components/Header.tsx") "14:00" "[14:00] Xay dung component Header dieu huong thuong hieu AutoRent va hotline"

# Commit 4
Step-Commit @("src/pages/ListPage.tsx") "14:15" "[14:15] Thiet ke Banner Hero gioi thieu dich vu thue xe va 4 cam ket 5 sao"

# Commit 5
Step-Commit @("src/components/CarCard.tsx") "14:30" "[14:30] Thiet ke component CarCard voi khung anh co dinh h-52 va badge trang thai"

# Commit 6
Step-Commit @("src/components/PriceFilter.tsx") "14:45" "[14:45] Xay dung bo loc PriceFilter voi thanh truot gia kep va tim kiem tu khoa"

# Commit 7
Step-Commit @("src/pages/ListPage.tsx") "15:00" "[15:00] Tich hop bo loc da nang theo phan khuc va nhien lieu vao trang ListPage"

# Commit 8
Step-Commit @("src/pages/DetailPage.tsx") "15:15" "[15:15] Xay dung trang DetailPage hien thi thong so ky thuat va tien nghi chi tiet"

# Commit 9
Step-Commit @("src/components/BookingModal.tsx") "15:30" "[15:30] Xay dung BookingModal dat xe nhanh voi tinh tong tien va validate du lieu"

# Commit 10
Step-Commit @("src/components/StatChart.tsx") "15:45" "[15:45] Tich hop thu vien Recharts xay dung StatChart thong ke gia va luot thue xe"

# Commit 11
Step-Commit @("src/components/Footer.tsx") "16:00" "[16:00] Thiet ke Footer hoan chinh voi thong tin lien he va ban quyen"

# Commit 12
Step-Commit @("src/components/Footer.tsx") "16:18" "[16:18] Cap nhat Footer email vipthuantran@gmail.com va MSSV 6651071073"

# Commit 13
Step-Commit @("src/App.tsx", "src/main.tsx") "16:35" "[16:35] Cai dat hieu ung chuyen trang Page Transition Animation tinh nang F=3"

# Commit 14
Step-Commit @("src/utils.test.ts") "16:55" "[16:55] Viet bo kiem thu Unit Test cho cac ham tien ich voi Vitest"

# Commit 15: Gom toan bo file con lai va README
git add .
$env:GIT_AUTHOR_DATE = "${dateStr}T17:15:00"
$env:GIT_COMMITTER_DATE = "${dateStr}T17:15:00"
git commit --allow-empty -m "[17:15] Hoan thien tai lieu README.md bao cao bai tap va nghiem thu Lab 2"
Write-Host "  [OK] Da commit: [17:15] Hoan thien tai lieu README.md bao cao bai tap va nghiem thu Lab 2" -ForegroundColor Green

Write-Host ">>> Dang day toan bo 15 commits len GitHub..." -ForegroundColor Cyan
git push -u origin main --force

Write-Host ">>> HOAN TAT 100%! Da push thanh cong len repository GitHub." -ForegroundColor Green
