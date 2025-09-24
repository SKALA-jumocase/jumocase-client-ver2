import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { getLiquorRecommendations } from '../../../services/api';
import { useUser } from '../../../contexts/UserContext';
import type { FormData } from '../../../types/api';

export default function TraditionalDrink() {
  const navigate = useNavigate();
  const { userData, isUserDataComplete } = useUser();
  const [formData, setFormData] = useState({
    drinkCount: 1,
    userQuery: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userQuery.trim()) return;
    if (!isUserDataComplete || !userData) {
      alert('기본 정보를 먼저 입력해주세요.');
      return;
    }

    const fullFormData: FormData = {
      age: userData.age,
      sex: userData.sex,
      drinkCount: formData.drinkCount,
      userQuery: formData.userQuery
    };

    setIsLoading(true);
    try {
      const recommendations = await getLiquorRecommendations(fullFormData);

      // Store recommendations in sessionStorage for result page
      sessionStorage.setItem('recommendations', JSON.stringify(recommendations));
      sessionStorage.setItem('formData', JSON.stringify(fullFormData));

      navigate({ to: '/result' });
    } catch (error) {
      console.error('추천 요청 실패:', error);
      alert('추천 요청에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surfaceBright text-onPrimary mx-auto max-w-2xl rounded-2xl p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">전통주 여정을 시작해보세요</h2>
        <p className="text-onPrimary/80">당신에게 맞는 전통주를 추천해드립니다</p>
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
          {/* 사용자 정보 표시 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">입력하신 기본 정보</h3>
            <div className="text-sm text-blue-700">
              <span className="mr-4">
                나이: {userData?.age === 20 ? '20대' : userData?.age === 30 ? '30대' : userData?.age === 40 ? '40대' : '50대 이상'}
              </span>
              <span>성별: {userData?.sex === 'male' ? '남성' : '여성'}</span>
            </div>
          </div>

          {/* 음주빈도 선택 */}
        <div>
          <label className="block text-sm font-medium mb-2">음주빈도</label>
          <select
            value={formData.drinkCount}
            onChange={(e) => setFormData(prev => ({ ...prev, drinkCount: Number(e.target.value) }))}
            className="w-full p-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={1}>거의 안 마심</option>
            <option value={2}>가끔 (월 1-2회)</option>
            <option value={3}>자주 (주 1-2회)</option>
            <option value={4}>매우 자주 (주 3회 이상)</option>
          </select>
        </div>

        {/* 질문 입력 */}
        <div>
          <label className="block text-sm font-medium mb-2">어떤 전통주를 찾고 계신가요?</label>
          <textarea
            value={formData.userQuery}
            onChange={(e) => setFormData(prev => ({ ...prev, userQuery: e.target.value }))}
            placeholder="예: 포도랑 같이 마실 전통주를 추천해줘"
            className="w-full p-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.userQuery.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {isLoading ? '추천 받는 중...' : '전통주 추천 받기'}
          </button>
        </form>
      )}
    </div>
  );
}
