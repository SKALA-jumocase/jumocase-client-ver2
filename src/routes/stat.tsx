import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getAllRecommendations } from '../services/api';
import type { RecommendationRecord } from '../types/api';

export const Route = createFileRoute("/stat")({
  component: RouteComponent,
});

interface AgeGroupStats {
  age: string;
  count: number;
}

interface GenderStats {
  sex: string;
  count: number;
}

interface DrinkCountStats {
  drinkCount: string;
  count: number;
}

interface PopularLiquorStats {
  liquorName: string;
  count: number;
}

function RouteComponent() {
  const [recommendations, setRecommendations] = useState<RecommendationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await getAllRecommendations();
        setRecommendations(data);
      } catch (err) {
        console.error('통계 데이터 로드 실패:', err);
        setError('데이터를 불러올 수 없습니다. 더미 데이터를 사용합니다.');

        // Use dummy data for demonstration
        const dummyData: RecommendationRecord[] = [
          { id: 1, age: 25, sex: "female", drinkCount: 3, liquorName: "복순도가 손막걸리", reason: "포도와 잘 어울려요" },
          { id: 2, age: 34, sex: "male", drinkCount: 1, liquorName: "문배술", reason: "깊은 풍미가 좋아요" },
          { id: 3, age: 28, sex: "female", drinkCount: 2, liquorName: "이화주", reason: "꽃향이 매력적이에요" },
          { id: 4, age: 45, sex: "male", drinkCount: 4, liquorName: "복순도가 손막걸리", reason: "부드러운 맛이 좋아요" },
          { id: 5, age: 22, sex: "female", drinkCount: 1, liquorName: "안동소주", reason: "깔끔한 맛이에요" },
          { id: 6, age: 38, sex: "male", drinkCount: 3, liquorName: "문배술", reason: "전통적인 맛이 좋아요" },
          { id: 7, age: 31, sex: "female", drinkCount: 2, liquorName: "이화주", reason: "향이 좋아요" },
          { id: 8, age: 29, sex: "male", drinkCount: 2, liquorName: "복순도가 손막걸리", reason: "마시기 편해요" },
        ];
        setRecommendations(dummyData);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  const processAgeGroupStats = (): AgeGroupStats[] => {
    const ageGroups = recommendations.reduce((acc, rec) => {
      let ageGroup: string;
      if (rec.age < 30) ageGroup = '20대';
      else if (rec.age < 40) ageGroup = '30대';
      else if (rec.age < 50) ageGroup = '40대';
      else ageGroup = '50대 이상';

      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(ageGroups).map(([age, count]) => ({ age, count }));
  };

  const processGenderStats = (): GenderStats[] => {
    const genderGroups = recommendations.reduce((acc, rec) => {
      const gender = rec.sex === 'male' ? '남성' : '여성';
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(genderGroups).map(([sex, count]) => ({ sex, count }));
  };

  const processDrinkCountStats = (): DrinkCountStats[] => {
    const drinkCountGroups = recommendations.reduce((acc, rec) => {
      let drinkLevel: string;
      switch (rec.drinkCount) {
        case 1: drinkLevel = '거의 안 마심'; break;
        case 2: drinkLevel = '가끔 마심'; break;
        case 3: drinkLevel = '자주 마심'; break;
        case 4: drinkLevel = '매우 자주 마심'; break;
        default: drinkLevel = '알 수 없음'; break;
      }

      acc[drinkLevel] = (acc[drinkLevel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(drinkCountGroups).map(([drinkCount, count]) => ({ drinkCount, count }));
  };

  const processPopularLiquorStats = (): PopularLiquorStats[] => {
    const liquorGroups = recommendations.reduce((acc, rec) => {
      acc[rec.liquorName] = (acc[rec.liquorName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(liquorGroups)
      .map(([liquorName, count]) => ({ liquorName, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">통계 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const ageGroupStats = processAgeGroupStats();
  const genderStats = processGenderStats();
  const drinkCountStats = processDrinkCountStats();
  const popularLiquorStats = processPopularLiquorStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전통주 추천 통계</h1>
          <p className="text-gray-600">사용자들의 전통주 선택 패턴을 분석해보세요</p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              {error}
            </div>
          )}
        </div>

        {/* 요약 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">총 추천 수</h3>
            <p className="text-3xl font-bold text-blue-600">{recommendations.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">인기 전통주</h3>
            <p className="text-xl font-bold text-green-600">
              {popularLiquorStats[0]?.liquorName || 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">주 연령대</h3>
            <p className="text-xl font-bold text-purple-600">
              {ageGroupStats.sort((a, b) => b.count - a.count)[0]?.age || 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">성별 비율</h3>
            <p className="text-xl font-bold text-pink-600">
              {genderStats.find(g => g.sex === '여성')?.count || 0} : {genderStats.find(g => g.sex === '남성')?.count || 0}
            </p>
          </div>
        </div>

        {/* 차트들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 연령대별 통계 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">연령대별 사용자</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageGroupStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 성별 통계 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">성별 분포</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ sex, percent }: any) => `${sex} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {genderStats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 음주 빈도 통계 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">음주 빈도별 분포</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={drinkCountStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="drinkCount" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 인기 전통주 */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">인기 전통주 TOP 5</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={popularLiquorStats} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="liquorName" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 최근 추천 목록 */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">최근 추천 기록</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">나이</th>
                  <th className="px-4 py-2 text-left">성별</th>
                  <th className="px-4 py-2 text-left">음주빈도</th>
                  <th className="px-4 py-2 text-left">추천 전통주</th>
                  <th className="px-4 py-2 text-left">추천 사유</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.slice(0, 10).map((rec) => (
                  <tr key={rec.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{rec.id}</td>
                    <td className="px-4 py-2">{rec.age}세</td>
                    <td className="px-4 py-2">{rec.sex === 'male' ? '남성' : '여성'}</td>
                    <td className="px-4 py-2">
                      {rec.drinkCount === 1 ? '거의 안 마심' :
                       rec.drinkCount === 2 ? '가끔 마심' :
                       rec.drinkCount === 3 ? '자주 마심' : '매우 자주 마심'}
                    </td>
                    <td className="px-4 py-2 font-medium">{rec.liquorName}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 max-w-xs truncate">
                      {rec.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
