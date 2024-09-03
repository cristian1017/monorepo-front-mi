import { FC, useEffect, useState } from "react";
import { fetchAdvice } from "../services/advice.services";
import { Skeleton } from "primereact/skeleton";

const Advice: FC = () => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
