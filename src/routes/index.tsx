import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import TraditionalDrink from "../shared/components/forms/TraditionalDrink";
import Specialty from "../shared/components/forms/Specialty";
import Region from "../shared/components/forms/Region";
import Modal from "../shared/components/modal";
import { useUser } from "../contexts/UserContext";

import LogoBK from "../shared/image/logo_bk.png";

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
        <div className="py-8 text-center">
          <div className="mx-auto flex max-w-md flex-col rounded-2xl bg-white p-8 shadow-lg">
            <img className="mx-auto mb-8 w-40" src={LogoBK} />
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              당신을 위한 추천을 시작해보세요
            </h2>
            <p className="mb-6 text-gray-600">맞춤형 추천을 위해 기본 정보를 입력해주세요</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              시작하기
            </button>
          </div>
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <div className="mt-8 flex flex-row gap-8">
        <TraditionalDrink />
        <Specialty />
        <Region />
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
