import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {

    const controller = new AbortController();

    let fetchData = async () => {

      setIsPending(true);


      try {
        let response = await fetch(url, {signal: controller.signal});

        if(!response.ok) {
          throw new Error(response.statusText);
        }


        let json = await response.json();

        setIsPending(false);
        // Update the state
        setData(json);
        setError(null);
      } catch (err) {

        if(err.name === "AbortError") {
          console.log("Fetch Aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch data");
          console.log(err.message);
        }
      }




    }

    fetchData();

    return () => {
      controller.abort();
    }
  }, [url])


  return { data, isPending, error }; // for data: data
}

