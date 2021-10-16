const requestForm = document.getElementById("request-form");
const requestUrlInput = document.getElementById("request-url-input");
const requestBodyDataArea = document.getElementById("request-body-data");
const requestResult = document.getElementById("request-result");
const submitBtn = document.getElementById("submit-btn");
const uploadForm = document.getElementById("file-upload-form");
const requestMethodSelector = document.getElementById(
  "request-method-selector"
);

const getApiResponse = (url, method, data) => {
  if (method === "GET" || method === "DELETE") {
    return fetch(url, {
      method,
    });
  } else {
    uploadForm.setAttribute("action", url);
    uploadForm.setAttribute("method", method);
    return fetch(url, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  }
};

const sendRequest = (event) => {
  event.preventDefault();
  let requestUrl = requestUrlInput.value;
  let bodyData = requestBodyDataArea.value;
  let selectedMethod = requestMethodSelector.value || "GET";

  if (bodyData && bodyData !== " ") {
    try {
      bodyData = JSON.parse(bodyData);
    } catch (error) {
      bodyData = {};
      alert("can only send json data");
    }
  } else {
    bodyData = {};
  }

  getApiResponse(requestUrl, selectedMethod, bodyData)
    .then((res) => res.text())
    .then((apiData) => {
      if (apiData) {
        try {
          requestResult.innerText = JSON.stringify(
            JSON.parse(apiData),
            null,
            2
          );

          //   if (selectedMethod === "POST" || selectedMethod === "PUT") {
          //     uploadForm.submit();
          //     window.location = "/";
          //   }
        } catch (error) {
          requestResult.innerText = apiData;
        }
      }
    })
    .catch((err) => {
      console.log(err);
      requestResult.innerText = err;
    });
};

requestForm.addEventListener("submit", sendRequest);
