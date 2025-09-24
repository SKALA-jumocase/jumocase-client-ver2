import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getLiquorPairings } from "../services/api";
import type { LiquorRecommendationWithId, FormData, PairingResponse } from "../types/api";

export const Route = createFileRoute("/result")({
  component: RouteComponent,
});

function RouteComponent() {
  const [recommendations, setRecommendations] = useState<LiquorRecommendationWithId[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedLiquor, setSelectedLiquor] = useState<LiquorRecommendationWithId | null>(null);
  const [pairing, setPairing] = useState<PairingResponse | null>(null);
  const [isLoadingPairing, setIsLoadingPairing] = useState(false);

  useEffect(() => {
    const storedRecommendations = sessionStorage.getItem("recommendations");
    const storedFormData = sessionStorage.getItem("formData");

    if (storedRecommendations && storedFormData) {
      const parsedRecommendations: LiquorRecommendationWithId[] = JSON.parse(storedRecommendations);
      const parsedFormData: FormData = JSON.parse(storedFormData);

      console.log(JSON.parse(storedRecommendations));
      setRecommendations(parsedRecommendations);
      setFormData(parsedFormData);
    } else {
      // Dummy data for testing when sessionStorage is empty
      const dummyRecommendations: LiquorRecommendationWithId[] = [
        {
          id: 1,
          liquorName: "복순도가 손막걸리",
          reason:
            "포도의 과일산과 막걸리의 약한 산미가 만나 스파클링와인처럼 청량한 조합을 만듭니다.",
        },
        {
          id: 2,
          liquorName: "문배술",
          reason: "포도의 달콤함과 문배술의 깊은 풍미가 어우러져 독특한 맛의 조화를 선사합니다.",
        },
        {
          id: 3,
          liquorName: "이화주",
          reason:
            "포도와 함께 마시면 꽃향과 과일향이 조화롭게 어우러진 우아한 맛을 즐길 수 있습니다.",
        },
      ];
      setRecommendations(dummyRecommendations);
      setFormData({
        age: 25,
        sex: "female",
        drinkCount: 2,
        userQuery: "포도랑 같이 마실 전통주를 추천해줘",
      });
    }
  }, []);

  const handleSelectLiquor = async (liquor: LiquorRecommendationWithId) => {
    setSelectedLiquor(liquor);
    setIsLoadingPairing(true);
    setPairing(null);

    try {
      const pairingData = await getLiquorPairings(liquor.id);
      setPairing(pairingData);
    } catch (error) {
      console.error("페어링 정보 로드 실패:", error);
      // Don't set dummy data, leave pairing as null to show error state
      setPairing(null);
    } finally {
      setIsLoadingPairing(false);
    }
  };

  if (!formData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">추천 데이터를 불러올 수 없습니다</h2>
          <a href="/" className="text-blue-600 hover:underline">
            다시 시도하기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">전통주 추천 결과</h1>
          <p className="text-gray-600">"{formData.userQuery}"에 대한 추천입니다</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 추천 목록 */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">추천 전통주</h2>
            {recommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className={`cursor-pointer rounded-lg border-2 bg-white p-6 shadow-md transition-all hover:shadow-lg ${
                  selectedLiquor?.id === recommendation.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleSelectLiquor(recommendation)}
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {recommendation.liquorName}
                  {recommendation.id}
                </h3>
                <p className="leading-relaxed text-gray-600">{recommendation.reason}</p>
                {selectedLiquor?.id === recommendation.id && (
                  <div className="mt-3 text-sm font-medium text-blue-600">
                    ✓ 선택된 전통주 {recommendation.id}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 페어링 정보 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">음식 페어링</h2>

              {!selectedLiquor ? (
                <div className="py-8 text-center">
                  <div className="mb-4 text-4xl text-gray-400">🍶</div>
                  <p className="text-gray-500">
                    전통주를 선택하면
                    <br />
                    어울리는 음식을 알려드려요
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="mb-3 font-medium text-gray-900">
                    {selectedLiquor.liquorName}와 어울리는 음식
                  </h3>

                  {isLoadingPairing ? (
                    <div className="py-4 text-center">
                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-gray-500">페어링 정보 로딩 중...</p>
                    </div>
                  ) : pairing ? (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 text-2xl">🍽️</div>
                      <p className="text-lg font-medium text-gray-800">{pairing.foodName}</p>
                      <p className="mt-2 text-sm text-gray-600">
                        이 조합으로 더욱 맛있게 즐겨보세요!
                      </p>
                    </div>
                  ) : selectedLiquor ? (
                    <div className="py-4 text-center">
                      <div className="mb-2 text-2xl text-red-400">❌</div>
                      <p className="font-medium text-red-600">페어링 정보 로드 실패</p>
                      <p className="mt-1 text-sm text-gray-500">잠시 후 다시 시도해 주세요</p>
                      <button
                        onClick={() => handleSelectLiquor(selectedLiquor)}
                        className="mt-3 text-sm text-blue-600 underline hover:text-blue-800"
                      >
                        다시 시도
                      </button>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            다시 추천받기
          </a>
        </div>
      </div>
    </div>
  );
}
