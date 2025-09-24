import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { getLiquorRecommendations } from '../../../services/api';
import type { FormData } from '../../../types/api';

export default function TraditionalDrink() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    age: 20,
    sex: 'female',
    drinkCount: 1,
    userQuery: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userQuery.trim()) return;

    setIsLoading(true);
    try {
      const recommendations = await getLiquorRecommendations(formData);

      // Store recommendations in sessionStorage for result page
      sessionStorage.setItem('recommendations', JSON.stringify(recommendations));
      sessionStorage.setItem('formData', JSON.stringify(formData));

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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 나이대 선택 */}
        <div>
          <label className="block text-sm font-medium mb-2">나이대</label>
          <select
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: Number(e.target.value) }))}
            className="w-full p-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={20}>20대</option>
            <option value={30}>30대</option>
            <option value={40}>40대</option>
            <option value={50}>50대 이상</option>
          </select>
        </div>

        {/* 성별 선택 */}
        <div>
          <label className="block text-sm font-medium mb-2">성별</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="sex"
                value="male"
                checked={formData.sex === 'male'}
                onChange={(e) => setFormData(prev => ({ ...prev, sex: e.target.value }))}
                className="mr-2"
              />
              남성
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sex"
                value="female"
                checked={formData.sex === 'female'}
                onChange={(e) => setFormData(prev => ({ ...prev, sex: e.target.value }))}
                className="mr-2"
              />
              여성
            </label>
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
    </div>
  );
}
