#!/bin/bash

# 프로젝트 루트(wins/)에서 실행 확인
if [ ! -d "apps" ]; then
    echo "❌ Error: 'apps' 폴더를 찾을 수 없습니다. wins 프로젝트 루트에서 실행해주세요."
    exit 1
fi

echo "========================================="
echo "  🚀 Initializing Next.js & shadcn/ui..."
echo "========================================="

cd apps

# 1. 기존 빈 폴더 정리 (create-next-app 충돌 방지)
# 주의: 이미 작업한 내용이 있다면 백업하세요. 지금은 초기 단계라 가정하고 삭제 후 재생성합니다.
if [ -d "web" ]; then
    echo "[1/5] Cleaning up existing 'web' directory..."
    rm -rf web
fi

# 2. Next.js 설치 (App Router, TypeScript, Tailwind, Src Dir, Import Alias 적용)
echo "[2/5] Running create-next-app..."
npx create-next-app@latest web \
    --typescript \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --import-alias "@/*" \
    --use-npm \
    --no-git-init

cd web

# 3. shadcn/ui 초기화 (Default 설정으로 자동 설치)
echo "[3/5] Initializing shadcn/ui..."
# shadcn init 시 필요한 기본 의존성 미리 설치 아님 init -d가 처리함
npx shadcn@latest init -d

# 4. DDD 폴더 구조 재구성 (create-next-app은 기본 구조만 생성하므로)
echo "[4/5] Constructing DDD Directory Structure..."

# Domain & Infrastructure 생성
mkdir -p src/domain
mkdir -p src/infrastructure
mkdir -p src/shared/components
mkdir -p src/shared/lib
mkdir -p src/shared/hooks
mkdir -p src/shared/utils

# shadcn이 생성한 components.json이 가리키는 위치 확인 및 이동 (필요시)
# 기본적으로 src/components/ui 에 설치되므로, 이를 shared/components/ui로 이동하거나
# 구조에 맞게 폴더를 정리합니다. 여기서는 shared 패턴을 따릅니다.

# 기존 shadcn 컴포넌트 폴더가 src/components라면 이동
if [ -d "src/components" ]; then
    mv src/components src/shared/
fi

# lib/utils.ts (shadcn 유틸) 이동
if [ -d "src/lib" ]; then
    mv src/lib/* src/shared/lib/
    rmdir src/lib
fi

# 5. components.json 경로 수정 (shadcn이 새 경로를 알도록)
# sed 명령어로 path 수정 (Mac/Linux 호환)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # MacOS
    sed -i '' 's|"@/components"|"@/shared/components"|g' components.json
    sed -i '' 's|"@/lib/utils"|"@/shared/lib/utils"|g' components.json
    sed -i '' 's|src/components|src/shared/components|g' components.json
    sed -i '' 's|src/lib|src/shared/lib|g' components.json
else
    # Linux
    sed -i 's|@/components|@/shared/components|g' components.json
    sed -i 's|@/lib/utils|@/shared/lib/utils|g' components.json
    sed -i 's|src/components|src/shared/components|g' components.json
    sed -i 's|src/lib|src/shared/lib|g' components.json
fi

# 예시 도메인 생성 (Inventory)
mkdir -p src/domain/inventory/components
mkdir -p src/domain/inventory/hooks
mkdir -p src/domain/inventory/services
mkdir -p src/domain/inventory/types

echo "========================================="
echo "  ✅ Next.js Setup & DDD Structure Complete!"
echo "  📂 Location: apps/web"
echo "  👉 Run: 'cd apps/web && npm run dev'"
echo "========================================="