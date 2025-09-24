import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import TraditionalDrink from "../shared/components/forms/TraditionalDrink";
import Specialty from "../shared/components/forms/Specialty";
import Region from "../shared/components/forms/Region";
import Modal from "../shared/components/modal";
import { useUser } from "../contexts/UserContext";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isUserDataComplete } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-auto my-8 flex flex-col gap-8">
      {/* 시작하기 버튼 - 기본 정보가 없을 때만 표시 */}
      {!isUserDataComplete && (
        <div className="text-center py-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
            <div className="text-4xl mb-4">🍶</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">전통주 여정을 시작해보세요</h2>
            <p className="text-gray-600 mb-6">맞춤형 추천을 위해 기본 정보를 입력해주세요</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              시작하기
            </button>
          </div>
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <div className="flex flex-row gap-8">
        <TraditionalDrink />
        <Specialty />
        <Region />
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
