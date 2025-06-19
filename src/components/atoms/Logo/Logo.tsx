interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const Logo = ({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-blue-600 rounded-lg flex items-center justify-center mr-3`}
      >
        <i className={`fas fa-home text-white ${iconSizeClasses[size]}`}></i>
      </div>
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizeClasses[size]}`}>
          Hogar360
        </span>
      )}
    </div>
  );
};
