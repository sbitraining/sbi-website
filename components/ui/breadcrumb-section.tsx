import React from "react";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homeUrl?: string;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  homeUrl = "/",
  className = "",
}) => {
  return (
    <nav
      className={`w-full flex items-end justify-start py-4 md:py-8 pb-2 md:pb-4 min-h-[80px] md:min-h-[150px] ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 md:space-x-3 w-full -mb-3 md:-mb-7 overflow-x-auto scrollbar-hide">
        {showHome && (
          <li className="flex-shrink-0">
            <a
              href={homeUrl}
              className="flex items-center text-white hover:text-white text-lg md:text-2xl font-bold transition-all duration-200 hover:scale-105"
              aria-label="Home"
            >
              <Home
                size={24}
                className="mr-1 md:mr-2 text-white font-bold md:w-6 md:h-6"
              />
              <span className="hidden sm:inline">Home</span>
            </a>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              {(showHome || index > 0) && (
                <li className="flex-shrink-0">
                  <ChevronRight
                    size={24}
                    className="text-white text-lg md:text-2xl font-bold mx-1 md:w-6 md:h-6"
                  />
                </li>
              )}

              <li className="flex-shrink-0">
                {isLast ? (
                  <span className="text-white text-lg md:text-2xl font-bold tracking-wide whitespace-nowrap">
                    {item.label.length > 15
                      ? `${item.label.substring(0, 15)}...`
                      : item.label}
                  </span>
                ) : (
                  <a
                    href={item.url}
                    className="text-white hover:text-white text-sm md:text-base font-medium transition-all duration-200 hover:scale-105 hover:underline decoration-2 underline-offset-4 whitespace-nowrap"
                  >
                    {item.label.length > 12
                      ? `${item.label.substring(0, 12)}...`
                      : item.label}
                  </a>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
