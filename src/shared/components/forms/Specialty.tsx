import { useState } from "react";
import { useUser } from "../../../contexts/UserContext";

export default function Specialty() {
  const { userData, isUserDataComplete } = useUser();
  const [formData, setFormData] = useState({
    purpose: "",
    style: "",
    query: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.purpose || !formData.style || !formData.query.trim()) return;
    if (!isUserDataComplete || !userData) {
      alert("기본 정보를 먼저 입력해주세요.");
      return;
    }

    const fullFormData = {
      age: userData.age,
      sex: userData.sex,
      purpose: formData.purpose,
      style: formData.style,
      query: formData.query,
    };

    console.log("특산품 추천 요청 데이터:", fullFormData);
    alert("백엔드가 준비되지 않아 콘솔에 출력되었습니다.");
  };

  return (
    <div className="bg-surfaceBright text-onPrimary mx-auto max-w-3xl min-w-sm rounded-2xl p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">특산품</h2>
        <p className="text-onPrimary/80">당신에게 맞는 특산품을 추천해드립니다</p>
      </div>

      {!isUserDataComplete ? (
        <div className="py-8 text-center">
          <div className="mb-4 text-4xl">🔒</div>
          <h3 className="mb-2 text-lg font-semibold">기본 정보가 필요합니다</h3>
          <p className="text-onPrimary/80 mb-4">
            맞춤 추천을 위해 나이대와 성별 정보를 먼저 입력해주세요.
          </p>
          <p className="text-onPrimary/60 text-sm">
            메인페이지에서 "시작하기" 버튼을 눌러 기본정보를 입력해주세요.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">용도 선택</label>
            <select
              value={formData.purpose}
              onChange={(e) => setFormData((prev) => ({ ...prev, purpose: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">선택해주세요</option>
              <option value="선물">선물용</option>
              <option value="혼자">혼자</option>
              <option value="가족">가족</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">상품 스타일</label>
            <select
              value={formData.style}
              onChange={(e) => setFormData((prev) => ({ ...prev, style: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">선택해주세요</option>
              <option value="간편">간편 소비</option>
              <option value="건강">건강</option>
              <option value="전통">전통</option>
              <option value="프리미엄">프리미엄</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">질문</label>
            <textarea
              value={formData.query}
              onChange={(e) => setFormData((prev) => ({ ...prev, query: e.target.value }))}
              placeholder="예: 부모님 드릴 특산품을 추천해주세요"
              className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!formData.purpose || !formData.style || !formData.query.trim()}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          >
            특산품 추천 받기
          </button>
        </form>
      )}
    </div>
  );
}
