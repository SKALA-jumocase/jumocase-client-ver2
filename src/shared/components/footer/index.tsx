export default function Footer() {
  return (
    <footer className="bg-onPrimary/80 w-full py-12 text-white">
      <div className="mx-auto w-fit">
        <p className="text-sm">&copy; 2025 한국의 얼 추천 서비스. All rights reserved.</p>
        <div className="flex flex-row justify-between">
          <a
            href="https://github.com/SKALA-jumocase"
            className="text-surfaceBright hover:text-primary text-sm"
          >
            Github
          </a>
          <p className="mt-1 text-xs">책임있는 음주 문화를 지향합니다.</p>
        </div>
      </div>
    </footer>
  );
}
