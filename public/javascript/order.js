async function commentFormHandler(event) {
  event.preventDefault();

  const name = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();
  const customer_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      customer_id,
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
