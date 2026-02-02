# Mockit - 스마트 디바이스 목업 생성기

Mockit은 스크린샷과 디자인을 위한 멋진 디바이스 목업을 생성할 수 있는 강력한 웹 기반 도구입니다. iPhone, Pixel, 웹 브라우저와 같은 현실적인 디바이스 프레임 안에 이미지를 손쉽게 넣고 프레젠테이션, 포트폴리오, 소셜 미디어용으로 내보내세요.

## 주요 기능

- **다양한 디바이스 지원**:
  - **iPhone**: 다양한 모델 및 색상 옵션 제공.
  - **Pixel**: Google Pixel 디바이스 프레임 지원.
  - **Browser**: 커스텀 주소창이 포함된 깔끔한 브라우저 창 (Chrome/Safari 스타일).
- **심도 있는 커스터마이징**:
  - **배경**: 단색, 그라데이션, 투명 배경 지원.
  - **그림자**: 깊이감을 위한 그림자 강도 조절 가능.
  - **캔버스 제어**: 줌, 스케일, 커스텀 크기 조절.
- **간편한 내보내기**:
  - **PNG** (무손실) 또는 **JPEG**로 내보내기.
  - 품질 설정 조절 가능.
  - **클립보드 지원**: 버튼 클릭 또는 단축키(`Cmd+Shift+C`)로 클립보드에 바로 복사.
  - **붙여넣기 지원**: 이미지를 캔버스에 바로 붙여넣기(`Cmd+V`).
- **모던 UI**: Tailwind CSS와 Framer Motion을 사용하여 세련된 다크 모드 우선 인터페이스로 구축되었습니다.

## 기술 스택

이 프로젝트는 다음과 같은 최신 웹 기술을 사용하여 구축되었습니다:

- **프레임워크**: [Next.js 15](https://nextjs.org/) (App Router)
- **라이브러리**: [React 19](https://react.dev/)
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
- **애니메이션**: [Framer Motion](https://www.framer.com/motion/)
- **이미지 처리**: [html-to-image](https://github.com/bubkoo/html-to-image)
- **아이콘**: [Lucide React](https://lucide.dev/)

## 시작하기

로컬에서 프로젝트를 실행하려면 다음 단계를 따르세요.

### 필수 조건

- Node.js (v18 이상 권장)
- npm 또는 yarn

### 설치 방법

1. 저장소를 클론합니다:
   ```bash
   git clone https://github.com/yourusername/mockit.git
   cd mockit
   ```

2. 의존성을 설치합니다:
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. 개발 서버를 실행합니다:
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 사용 방법

1. **업로드/붙여넣기**: 이미지를 드래그 앤 드롭하거나 캔버스에 붙여넣기(`Cmd+V`)하세요.
2. **커스터마이징**: 왼쪽 사이드바에서 디바이스 종류, 색상, 배경을 변경하세요.
3. **조정**: 오른쪽 사이드바에서 캔버스 크기와 내보내기 설정을 조정하세요.
4. **내보내기**: "Export"를 클릭하여 목업을 저장하거나 `Cmd+Shift+C`를 사용하여 복사하세요.

## 라이선스

[MIT](LICENSE)
