
import { useState, useEffect } from "react";

function useFetch<T>(url: string) {

  // Store API data
  const [data, setData] = useState<T | null>(null);

  // Track loading state
  const [loading, setLoading] = useState(true);

  // Store error messages
  const [error, setError] = useState("");

  useEffect(() => {

    // Allow the request to be cancelled
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        setData(null);

        // Make API request
        const response = await fetch(url, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        // Convert response into JSON
        const result: T = await response.json();

        setData(result);

      } catch (err) {

        // Ignore cancelled requests
        if (controller.signal.aborted) {
          return;
        }

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup when URL changes
    return () => controller.abort();

  }, [url]);

  return { data, loading, error };
}

export default useFetch;
