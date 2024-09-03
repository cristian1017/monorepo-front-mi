/**
 * Fetches a random advice from the AdviceSlip API.
 * Returns a string with the advice.
 * If the request fails, returns a string with the error.
 */
export const fetchAdvice = async () => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    return data.slip.advice;
  } catch (error) {
    return "No advice available right now." + error;
  }
};
