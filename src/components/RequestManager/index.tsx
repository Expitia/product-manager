import { getError, isLoading } from "@/app/libs/redux/slices/logger";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.css";

export const RequestManager = () => {
  const errors = useSelector(getError);
  const loading = useSelector(isLoading);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (errors.length) {
      setShowToast(true);
      const timeout = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [errors]);

  return (
    <>
      {showToast && (
        <div className="toast">
          <div className="message error">{errors[errors.length - 1]}</div>
        </div>
      )}
      {loading && <div className="loading" />}
    </>
  );
};
