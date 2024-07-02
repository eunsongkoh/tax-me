import { useState } from "react";

const apiUrl = process.env.REACT_APP_OCR_URL;
const apiKey = process.env.REACT_APP_OCR_API_KEY;

export const useOcrApi = () => {
  const [data, setData] = useState(null);

  const getPrice = async (imageName) => {
    try {
      const formData = new FormData();
      formData.append("file", imageName);

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          apikey: apiKey,
        },
      });
      const jsonData = await response.json();
      if (jsonData && jsonData.ParsedResults.length > 0) {
        const parsedText = jsonData.ParsedResults[0].ParsedText;
        const priceRegex = /\$\d+(\.\d+)?/;

        const match = parsedText.match(priceRegex);
        if (match) {
          setData(match[0]);
          console.log(data);
        } else {
          throw new Error("Price Not Found");
        }
      }
    } catch (error) {
      console.error("Error fetching OCR data:", error);
    }
  };

  return { data, getPrice };
};
