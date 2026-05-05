# 블로그 작성 사이트

정적 HTML/CSS/JavaScript로 만든 블로그 글 생성 페이지입니다.

## 로컬 실행

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.

## 배포

정적 사이트이므로 GitHub Pages, Netlify, Vercel 같은 정적 호스팅에 그대로 업로드할 수 있습니다.

GitHub Pages 기준:

1. GitHub에 새 저장소를 만듭니다.
2. 이 프로젝트의 `index.html`, `style.css`, `main.js`, `.nojekyll` 파일을 업로드합니다.
3. 저장소 Settings > Pages에서 배포 브랜치를 `main`으로 설정합니다.
