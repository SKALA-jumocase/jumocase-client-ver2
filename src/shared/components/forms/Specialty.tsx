export default function Specialty() {
  return (
    <div className="bg-surfaceBright text-onPrimary mx-auto max-w-2xl rounded-2xl p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">특산품</h2>
        <p className="text-onPrimary/80">당신에게 맞는 전통주를 추천해드립니다</p>
      </div>
      {/* TODO */}
      {/*
      전통주 백엔드만 있어서 이건 dummy data로 시연 예정

    용도: 선물용, 혼자, 가족
    상품 스타일: 간편 소비, 건강, 전통, 프리미엄
    query: "부모님 드릴 거예요", "예쁜 포장 원해요" 등 자유 입력

      
      Modal에서 선택한 나이대, 성별과 합쳐서 요청 보냄
      */}
    </div>
  );
}
