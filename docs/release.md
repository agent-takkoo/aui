현재 패키지 버전은 `@heogeon0/aui@0.1.0`이며 아직 npm에 배포하지 않았다. `0.0.1`은 2026-10-28에 MIT 라이선스로 [npm에 공개 배포했다](https://www.npmjs.com/package/@heogeon0/aui). 아래 검증 명령은 실제 패키지를 등록하지 않는다.

## 0.1.0 변경과 이전 버전에서 옮기기

[PR #12](https://github.com/agent-takkoo/aui/pull/12)를 합치고 마이너 버전을 올렸다. 기존 API를 사용하는 프로젝트는 다음 변경을 확인한다.

- Theme의 `light`·`dark` 색 입력을 `brand`·`neutral` 스케일과 `radius`·`scaling`·`fontFamily` 설정으로 바꿨다. `defineTheme` 예제에 맞춰 프로젝트 theme을 변경한다. 같은 이름의 theme을 교체해도 스타일이 갱신되며, hover 대비와 터치 영역 하한을 유지한다.
- Button variant는 `primary`·`secondary`·`ghost`·`destructive`를 사용한다. Badge·Callout은 `tone`을 사용하고, Icon은 lucide 이름으로 변경했다. Grid·PageHeader·ActionBar·AppShell과 라우터 연결을 추가했다. `linkComponent`에 넘기는 adapter는 `href`를 라우터의 `to`로 전달해야 한다. Select의 모바일 필수값 검증과 form reset도 수정했다.
- 컴포넌트별 AI 문서, 화면 레시피, 소비 프로젝트용 AGENTS.md와 스킬을 포함한다. ESLint는 HTML 요소의 직접 스타일, 다른 UI 라이브러리, 화면 코드의 CSS import를 검사한다. AI 예제 생성기는 `import type`을 유지한다.

자세한 API와 예제는 [컴포넌트 사용법](components.md)과 [패키지 README](../packages/design-system/README.md)를 따른다. `pnpm check`의 설치 검증 파일은 임시 경로에 만든 뒤 삭제한다. 버전을 올린 후 `release:check`로 검증·pack·dry-run을 수행한다.

## 0.1.0 패키지 구성

- `packages/design-system`만 배포한다. 저장소 루트와 Storybook은 private workspace로 유지한다.
- 공개 경로는 `@heogeon0/aui`, `/theme`, `/styles.css`, `/eslint`, `/llms.txt`, `/llms-full.txt`, `/llms/*`, `/agents.md`, `/skill/*`다. React 19·React DOM 19를 peer dependency로 사용하고 ESM과 TypeScript 타입을 제공한다.
- tarball에는 `dist`, `ai`, `package.json`, `README.md`, `LICENSE`, `NOTICE.md`를 넣는다. `prepack`이 패키지와 AI 문서를 다시 빌드하므로 오래된 결과물이 배포되지 않는다.
- npm 공개 패키지에 MIT 라이선스를 적용한다. 저장소와 npm 패키지에 같은 LICENSE 본문을 제공한다. GitHub 저장소의 공개 여부는 바꾸지 않는다.

## 검증

저장소 루트에서 실행한다.

```sh
pnpm install --frozen-lockfile
pnpm release:check
pnpm format:check
```

`release:check`는 lint·타입·단위 테스트·Storybook 빌드·E2E를 실행한 뒤 tarball을 만든다. 별도의 임시 프로젝트에 tarball을 설치해 ESM·CSS·theme·ESLint·SSR·소비 코드 타입을 확인하고, 같은 tarball로 `npm publish --dry-run`을 실행한다.

결과물은 `artifacts/heogeon0-aui-0.1.0.tgz`, 배포 미리보기는 `artifacts/npm-publish-preview.json`이다. 빌드와 배포 미리보기만 다시 확인하려면 `pnpm release:dry-run`을 사용한다. 이것은 전체 검사를 대신하지 않는다.

2026-10-30에 `0.1.0`으로 `pnpm check`를 통과했다. 단위 테스트 40개와 E2E 225개를 통과했고 기기 조건에 맞지 않는 6개는 제외했다. 별도 프로젝트의 tarball 설치·타입·SSR 검증도 완료했다. 패키징 파일이 저장소 밖에 생성되던 `pack:package` 경로를 고친 뒤 `pnpm release:dry-run`까지 통과했다.

배포 전에 다른 프로젝트에서 미리 설치할 수도 있다.

```sh
npm install /absolute/path/to/ai-system/artifacts/heogeon0-aui-0.1.0.tgz
```

## 첫 배포 결과

2026-10-28 배포 전 검증에서 `pnpm release:check`와 `pnpm format:check`가 통과했다. 단위 테스트 16개, E2E 152개를 통과했고 모바일에 해당하지 않는 manager·hover 검사 4개는 제외했다. 별도 프로젝트 설치·소비 코드 타입·SSR과 npm 배포 dry-run까지 완료했다.

MIT로 변경한 뒤 tarball을 다시 만들고 독립 설치·소비 코드 타입·SSR·배포 dry-run을 재확인했다. 설치된 패키지의 license가 MIT이며 LICENSE 본문이 저장소와 같은지도 검사한다.

`heogeon0` 계정의 2FA 설정과 브라우저 인증을 완료한 뒤 2026-10-28 16:09 KST에 public·latest로 배포했다. 처음에는 2FA 미설정으로 E403이 발생했으나 설정 후 해결됐다. 배포 직후 공개 조회에 잠시 404가 나왔지만 이후 정상으로 바뀌었다.

익명 registry 조회에서 MIT·0.0.1·latest를 확인했다. 배포된 파일의 SHA-512가 로컬 검증 파일과 같으며, 새 캐시와 별도 프로젝트로 npm에서 설치해 ESM·CSS·타입 파일·Theme·ESLint·SSR을 확인했다. 기록은 `artifacts/npm-publish-result.json`에 저장한다.

첫 배포에 사용한 명령은 다음과 같다. 비밀번호·패스키 인증은 사용자가 직접 완료하고 토큰을 저장소나 문서에 넣지 않는다.

```sh
npm login --registry https://registry.npmjs.org
npm whoami --registry https://registry.npmjs.org
npm publish ./artifacts/heogeon0-aui-0.0.1.tgz --access public --registry https://registry.npmjs.org --ignore-scripts
```

`0.0.1`은 이미 등록된 버전이므로 다시 배포하지 않는다. 다음 배포에서는 package.json과 ESLint metadata의 버전을 함께 올리고 검증한 뒤 새 tarball을 등록한다.

명령과 배포 파일 규칙은 [npm publish 문서](https://docs.npmjs.com/cli/v11/commands/npm-publish/)와 [package.json 문서](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)를 따른다.
