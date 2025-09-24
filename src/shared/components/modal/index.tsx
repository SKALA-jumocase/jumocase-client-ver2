import { useState } from 'react';
import { useUser } from '../../../contexts/UserContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const { setUserData } = useUser();
  const [formData, setFormData] = useState({
    age: 20,
    sex: 'female' as 'male' | 'female',
    isPrivacyAgreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.isPrivacyAgreed) {
      alert('개인정보 활용동의는 필수입니다.');
      return;
    }

    setUserData({
      age: formData.age,
      sex: formData.sex,
      isPrivacyAgreed: formData.isPrivacyAgreed,
    });

    onClose();
  };

  const handleCancel = () => {
    if (!formData.isPrivacyAgreed) {
      // 개인정보 활용동의를 안 했으면 뒤로 보내기
      window.history.back();
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">기본 정보 입력</h2>
          <p className="text-gray-600">맞춤 추천을 위해 기본 정보를 입력해주세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 나이대 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">나이대</label>
            <select
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: Number(e.target.value) }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={20}>20대</option>
              <option value={30}>30대</option>
              <option value={40}>40대</option>
              <option value={50}>50대 이상</option>
            </select>
          </div>

          {/* 성별 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">성별</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={formData.sex === 'male'}
                  onChange={(e) => setFormData(prev => ({ ...prev, sex: e.target.value as 'male' | 'female' }))}
                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">남성</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={formData.sex === 'female'}
                  onChange={(e) => setFormData(prev => ({ ...prev, sex: e.target.value as 'male' | 'female' }))}
                  className="mr-2 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">여성</span>
              </label>
            </div>
          </div>

          {/* 개인정보 활용동의 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privacy-agreement"
                checked={formData.isPrivacyAgreed}
                onChange={(e) => setFormData(prev => ({ ...prev, isPrivacyAgreed: e.target.checked }))}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="text-sm">
                <label htmlFor="privacy-agreement" className="font-medium text-gray-700 cursor-pointer">
                  개인정보 수집 및 이용동의 (필수)
                </label>
                <div className="text-gray-600 mt-1 text-xs">
                  <p>• 수집항목: 나이, 성별</p>
                  <p>• 이용목적: 맞춤형 전통주 추천 서비스 제공</p>
                  <p>• 보유기간: 서비스 이용 기간</p>
                </div>
              </div>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 font-medium transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!formData.isPrivacyAgreed}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition-colors"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
