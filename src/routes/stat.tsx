import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stat")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/stat"!
      {/* TODO */}
      {/* /recommendations api에서 받은 데이터 사용자가 보기 편하게 통계
    원하는 정보를 얻을 수 있어야함 라이브러리 설치 자유 */}
    </div>
  );
}
