import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="bg-primaryContainer text-surface w-full shadow-lg">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
            <div className="text-3xl">담 아 카 세</div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide"></h1>
              <p className="text-xs">한국의 멋과 맛을 담다</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="hover:bg-surfaceBright/30 rounded-md px-4 py-2 font-medium transition-colors"
            >
              추천받기
            </Link>
            <Link
              to="/stat"
              className="hover:bg-surfaceBright/30 rounded-md p-2 font-medium transition-colors"
            >
              통계보기
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
