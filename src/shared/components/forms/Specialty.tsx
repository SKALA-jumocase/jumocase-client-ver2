import { useState } from "react";

type SpecialtyItem = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const dummyData: SpecialtyItem[] = [
  {
    id: 1,
    name: "복분자 와인",
    description: "부모님 선물용으로 좋은 고급 전통주",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "막걸리 세트",
    description: "가족과 함께 나누기 좋은 전통 막걸리",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "청주",
    description: "깔끔하고 프리미엄한 스타일의 전통주",
    image: "https://via.placeholder.com/150",
  },
];

export default function Specialty() {
  const [purpose, setPurpose] = useState("");
  const [style, setStyle] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SpecialtyItem[]>([]);

  const handleRecommend = () => {
    // 실제론 백엔드 요청, 지금은 그냥 dummyData 전체 반환 or 간단 필터
    const filtered = dummyData.filter((item) => {
      return (
        item.description.includes(purpose) ||
        item.description.includes(style) ||
        item.description.includes(query)
      );
    });

    setResults(filtered.length > 0 ? filtered : dummyData);
  };

  return (
    <div className="bg-surfaceBright text-onPrimary mx-auto max-w-2xl rounded-2xl p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">특산품</h2>
        <p className="text-onPrimary/80">당신에게 맞는 전통주를 추천해드립니다</p>
      </div>

      {/* 입력 영역 */}
      <div className="space-y-4">
        <div>
          <label className="mb-1 block font-semibold">용도 선택</label>
          <select
            className="w-full rounded border px-3 py-2 text-black"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="선물">선물용</option>
            <option value="혼자">혼자</option>
            <option value="가족">가족</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-semibold">상품 스타일</label>
          <select
            className="w-full rounded border px-3 py-2 text-black"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="간편">간편 소비</option>
            <option value="건강">건강</option>
            <option value="전통">전통</option>
            <option value="프리미엄">프리미엄</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-semibold">자유 입력</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-2 text-black"
            placeholder="예: 부모님 드릴 거예요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          onClick={handleRecommend}
          className="bg-primary hover:bg-primary/80 w-full rounded-lg px-4 py-2 font-semibold text-white"
        >
          추천 받기
        </button>
      </div>

      {/* 추천 결과 */}
      {results.length > 0 && (
        <div className="mt-8 grid gap-4">
          {results.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-lg bg-white p-4 shadow">
              <img src={item.image} alt={item.name} className="h-20 w-20 rounded object-cover" />
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
