import { Link } from "react-router-dom";

const Alert = ({
  variant,
  title,
  message,
  showLink = false,
  linkHref = "#",
  linkText = "Learn more",
}) => {
  const variantClasses = {
    success: {
      container: "border-success-500 bg-success-50 dark:border-success-500/30 dark:bg-success-500/15",
      icon: "text-success-500",
    },
    error: {
      container: "border-error-500 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15",
      icon: "text-error-500",
    },
    warning: {
      container: "border-warning-500 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/15",
      icon: "text-warning-500",
    },
    info: {
      container: "border-blue-light-500 bg-blue-light-50 dark:border-blue-light-500/30 dark:bg-blue-light-500/15",
      icon: "text-blue-light-500",
    },
  };

  const icons = {
    success: (
      <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.3-8.3 8.3S3.7 16.6 3.7 12zm8.3-10.1c-5.6 0-10.1 4.5-10.1 10.1s4.5 10.1 10.1 10.1 10.1-4.5 10.1-10.1S17.6 1.9 12 1.9zm3.6 8.8c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-3.2 3.2-1.5-1.5c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.2 2.2c.2.2.4.3.7.3s.5-.1.7-.3l3.9-3.9z"
        />
      </svg>
    ),
    error: (
      <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.35 12c0 4.61-3.74 8.35-8.35 8.35S3.65 16.61 3.65 12 7.39 3.65 12 3.65 20.35 7.39 20.35 12zM12 22.15c5.61 0 10.15-4.54 10.15-10.15S17.61 1.85 12 1.85 1.85 6.39 1.85 12 6.39 22.15 12 22.15zm1-5.67c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM12 6.63c.41 0 .75.34.75.75v5.68c0 .41-.34.75-.75.75s-.75-.34-.75-.75V7.38c0-.41.34-.75.75-.75z"
        />
      </svg>
    ),
    warning: (
      <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.65 12c0-4.61 3.74-8.35 8.35-8.35s8.35 3.74 8.35 8.35-3.74 8.35-8.35 8.35S3.65 16.61 3.65 12zM12 1.85c-5.61 0-10.15 4.54-10.15 10.15S6.39 22.15 12 22.15 22.15 17.61 22.15 12 17.61 1.85 12 1.85zm-1 5.68c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm1 9.85c-.41 0-.75-.34-.75-.75v-5.68c0-.41.34-.75.75-.75s.75.34.75.75v5.68c0 .41-.34.75-.75.75z"
        />
      </svg>
    ),
    info: (
      <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.65 12c0-4.61 3.74-8.35 8.35-8.35s8.35 3.74 8.35 8.35-3.74 8.35-8.35 8.35S3.65 16.61 3.65 12zM12 1.85c-5.61 0-10.15 4.54-10.15 10.15S6.39 22.15 12 22.15 22.15 17.61 22.15 12 17.61 1.85 12 1.85zm-1 5.67c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm1 9.85c-.41 0-.75-.34-.75-.75v-5.68c0-.41.34-.75.75-.75s.75.34.75.75v5.68c0 .41-.34.75-.75.75z"
        />
      </svg>
    ),
  };

  return (
    <div className={`rounded-xl border p-4 ${variantClasses[variant].container}`}>
      <div className="flex items-start gap-3">
        <div className={`-mt-0.5 ${variantClasses[variant].icon}`}>{icons[variant]}</div>
        <div>
          <h4 className="mb-1 text-sm font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
          {showLink && (
            <Link
              to={linkHref}
              className="inline-block mt-3 text-sm font-medium text-gray-500 underline dark:text-gray-400"
            >
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
