import { useState } from "react";
import { useUser } from "../../../contexts/UserContext";

export default function Region() {
  const { userData, isUserDataComplete } = useUser();
  const [formData, setFormData] = useState({
    travelPurpose: '',
    companionType: '',
    query: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.travelPurpose || !formData.companionType || !formData.query.trim()) return;
    if (!isUserDataComplete || !userData) {
      alert('기본 정보를 먼저 입력해주세요.');
      return;
    }

    const fullFormData = {
      age: userData.age,
      sex: userData.sex,
      travelPurpose: formData.travelPurpose,
      companionType: formData.companionType,
      query: formData.query
    };

    console.log('여행 추천 요청 데이터:', fullFormData);
    alert('백엔드가 준비되지 않아 콘솔에 출력되었습니다.');
  };

  return (
    <div className="bg-surfaceBright text-onPrimary mx-auto max-w-2xl rounded-2xl p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">여행지 추천</h2>
        <p className="text-onPrimary/80">당신에게 맞는 여행지를 추천해드립니다</p>
      </div>

      {!isUserDataComplete ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-lg font-semibold mb-2">기본 정보가 필요합니다</h3>
          <p className="text-onPrimary/80 mb-4">맞춤 추천을 위해 나이대와 성별 정보를 먼저 입력해주세요.</p>
          <p className="text-sm text-onPrimary/60">메인페이지에서 "시작하기" 버튼을 눌러 기본정보를 입력해주세요.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">입력하신 기본 정보</h3>
            <div className="text-sm text-blue-700">
              <span className="mr-4">
                나이: {userData?.age === 20 ? '20대' : userData?.age === 30 ? '30대' : userData?.age === 40 ? '40대' : '50대 이상'}
              </span>
              <span>성별: {userData?.sex === 'male' ? '남성' : '여성'}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">여행 목적</label>
            <select
              value={formData.travelPurpose}
              onChange={(e) => setFormData(prev => ({ ...prev, travelPurpose: e.target.value }))}
              className="w-full p-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">선택해주세요</option>
              <option value="힐링">힐링</option>
              <option value="맛집 탐방">맛집 탐방</option>
              <option value="자연 감상">자연 감상</option>
              <option value="액티비티">액티비티</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">동행자 유형</label>
            <select
              value={formData.companionType}
              onChange={(e) => setFormData(prev => ({ ...prev, companionType: e.target.value }))}
              className="w-full p-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">선택해주세요</option>
              <option value="혼자">혼자</option>
              <option value="친구">친구</option>
              <option value="연인">연인</option>
              <option value="가족">가족</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">질문</label>
            <textarea
              value={formData.query}
              onChange={(e) => setFormData(prev => ({ ...prev, query: e.target.value }))}
              placeholder="예: 서울에서 가까운 힐링 여행지를 추천해주세요"
              className="w-full p-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!formData.travelPurpose || !formData.companionType || !formData.query.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            여행지 추천 받기
          </button>
        </form>
      )}
    </div>
  );
}
