const API_KEY = "Xgf887LkNMx8VC2m5UJvcg==FmwyEDyvI1bMKjiS";
const url = "https://api.api-ninjas.com/v1/quotes";

const quote_author = document.getElementById("quote-author");
const quote_text = document.getElementById("quote");
const get_quote = document.getElementById("get-quote");

const fetchQuote = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Returns the fetched data
  } catch (err) {
    console.error("Fetch Error:", err.message);
  }
};

get_quote.addEventListener("click", async () => {
  try {
    const data = await fetchQuote();
    console.log(data);
    if (data && data.length > 0) {
      quote_author.innerText = data[0].author || "Unknown Author";
      quote_text.innerText = data[0].quote || "No quote available.";
    } else {
      quote_author.innerText = "Error";
      quote_text.innerText = "No quote found.";
    }
  } catch (err) {
    console.error("Error in event listener:", err.message);
    quote_author.innerText = "Error";
    quote_text.innerText = "Failed to fetch quote.";
  }
});
