const API_KEY = "Xgf887LkNMx8VC2m5UJvcg==FmwyEDyvI1bMKjiS";
const url = "https://api.api-ninjas.com/v1/quotes";

const quote_author = document.getElementById("quote-author");
const quote_text = document.getElementById("quote");
const get_quote = document.getElementById("get-quote");
const share_button = document.getElementById("share");
const categories_container = document.getElementById("categories");

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

const displayCategories = (categories) => {
  categories_container.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category;
    categories_container.appendChild(button);
  });
};

get_quote.addEventListener("click", async () => {
  try {
    const data = await fetchQuote();
    if (data && data.length > 0) {
      quote_author.innerText = data[0].author || "Unknown Author";
      quote_text.innerText = data[0].quote || "No quote available.";
      displayCategories(data[0].categories || []);
    } else {
      quote_author.innerText = "Error";
      quote_text.innerText = "No quote found.";
      categories_container.innerHTML = "";
    }
  } catch (err) {
    console.error("Error in event listener:", err.message);
    quote_author.innerText = "Error";
    quote_text.innerText = "Failed to fetch quote.";
    categories_container.innerHTML = "";
  }
});

share_button.addEventListener("click", () => {
  const quote = quote_text.innerText;
  const author = quote_author.innerText;
  const textToCopy = `"${quote}" - ${author}`;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("Quote copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
});
