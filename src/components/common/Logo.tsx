import DepthText from "../ui/DepthText";

export default function Logo() {
  return (
    <div className="text-center flex flex-col items-center justify-center">
      <div className="mb-4">
        <DepthText
          text="DevTrack AI"
          layers={24}
          depth={1.8}
          faceColor="#3b82f6"
          depthColor="#1d4ed8"
          fontSize="clamp(2rem, 6vw, 3.5rem)"
          fontWeight={900}
          tilt={8}
          pointerTracking={true}
          shadow={true}
        />
      </div>

      <p className="text-gray-500 dark:text-slate-400 mt-2 transition-colors">
        AI-powered Developer Productivity Platform
      </p>

      <p className="text-sm text-gray-400 dark:text-slate-500 mt-4 transition-colors">
        Built with fun ⚡️
      </p>
    </div>
  );
}