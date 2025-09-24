import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getLiquorPairings } from '../services/api'
import type { LiquorRecommendation, LiquorRecommendationWithId, FormData, PairingResponse } from '../types/api'

export const Route = createFileRoute('/result')({
  component: RouteComponent,
})

function RouteComponent() {
  const [recommendations, setRecommendations] = useState<LiquorRecommendationWithId[]>([])
  const [formData, setFormData] = useState<FormData | null>(null)
  const [selectedLiquor, setSelectedLiquor] = useState<LiquorRecommendationWithId | null>(null)
  const [pairing, setPairing] = useState<PairingResponse | null>(null)
  const [isLoadingPairing, setIsLoadingPairing] = useState(false)

  useEffect(() => {
    const storedRecommendations = sessionStorage.getItem('recommendations')
    const storedFormData = sessionStorage.getItem('formData')

    if (storedRecommendations && storedFormData) {
      const parsedRecommendations: LiquorRecommendation[] = JSON.parse(storedRecommendations)
      const parsedFormData: FormData = JSON.parse(storedFormData)

      // Add ID to recommendations for selection
      const recommendationsWithId = parsedRecommendations.map((rec, index) => ({
        ...rec,
        id: index + 1
      }))

      setRecommendations(recommendationsWithId)
      setFormData(parsedFormData)
    } else {
      // Dummy data for testing when sessionStorage is empty
      const dummyRecommendations: LiquorRecommendationWithId[] = [
        {
          id: 1,
          liquorName: "복순도가 손막걸리",
          reason: "포도의 과일산과 막걸리의 약한 산미가 만나 스파클링와인처럼 청량한 조합을 만듭니다."
        },
        {
          id: 2,
          liquorName: "문배술",
          reason: "포도의 달콤함과 문배술의 깊은 풍미가 어우러져 독특한 맛의 조화를 선사합니다."
        },
        {
          id: 3,
          liquorName: "이화주",
          reason: "포도와 함께 마시면 꽃향과 과일향이 조화롭게 어우러진 우아한 맛을 즐길 수 있습니다."
        }
      ]
      setRecommendations(dummyRecommendations)
      setFormData({ age: 25, sex: '여성', drinkCount: 2, userQuery: '포도랑 같이 마실 전통주를 추천해줘' })
    }
  }, [])

  const handleSelectLiquor = async (liquor: LiquorRecommendationWithId) => {
    setSelectedLiquor(liquor)
    setIsLoadingPairing(true)
    setPairing(null)

    try {
      const pairingData = await getLiquorPairings(liquor.id)
      setPairing(pairingData)
    } catch (error) {
      console.error('페어링 정보 로드 실패:', error)
      // Use dummy pairing data on error
      setPairing({ foodName: '포도' })
    } finally {
      setIsLoadingPairing(false)
    }
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">추천 데이터를 불러올 수 없습니다</h2>
          <a href="/" className="text-blue-600 hover:underline">다시 시도하기</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전통주 추천 결과</h1>
          <p className="text-gray-600">"{formData.userQuery}"에 대한 추천입니다</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 추천 목록 */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">추천 전통주</h2>
            {recommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className={`bg-white rounded-lg p-6 shadow-md cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedLiquor?.id === recommendation.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleSelectLiquor(recommendation)}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {recommendation.liquorName}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {recommendation.reason}
                </p>
                {selectedLiquor?.id === recommendation.id && (
                  <div className="mt-3 text-sm text-blue-600 font-medium">
                    ✓ 선택된 전통주
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 페어링 정보 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">음식 페어링</h2>

              {!selectedLiquor ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">🍶</div>
                  <p className="text-gray-500">전통주를 선택하면<br/>어울리는 음식을 알려드려요</p>
                </div>
              ) : (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">
                    {selectedLiquor.liquorName}와 어울리는 음식
                  </h3>

                  {isLoadingPairing ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-gray-500 mt-2">로딩 중...</p>
                    </div>
                  ) : pairing ? (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl mb-2">🍇</div>
                      <p className="text-lg font-medium text-gray-800">
                        {pairing.foodName}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        이 조합으로 더욱 맛있게 즐겨보세요!
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      페어링 정보를 불러올 수 없습니다
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            다시 추천받기
          </a>
        </div>
      </div>
    </div>
  )
}
