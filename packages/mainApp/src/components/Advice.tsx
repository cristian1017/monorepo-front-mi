import { FC, useEffect, useState } from "react";
import { fetchAdvice } from "../services/advice.services";
import { Skeleton } from "primereact/skeleton";

const Advice: FC = () => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    /**
     * Fetches a random advice from the AdviceSlip API.
     * Updates component state with the advice and sets loading to false.
     * If the request fails, logs the error to the console.
     */
    const loadAdvice = async () => {
      try {
        const adviceData = await fetchAdvice();
        setAdvice(adviceData);
      } catch (error) {
        console.error("Error fetching advice:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAdvice();
  }, []);

  if (loading) {
    return (
      <div>
        <Skeleton width="100%" className="mb-2"></Skeleton>
      </div>
    );
  }

  return <div>{advice}</div>;
};

export default Advice;
