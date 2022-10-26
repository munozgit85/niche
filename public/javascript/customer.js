async function newFormHandler(event) {
    event.preventDefault()

    const customer_name = document.querySelector(
        'input[name="post-title"]'
    ).value
    const customer_phone = document.querySelector(
        'input[name="post-url"]'
    ).value

    const response = await fetch(`/api/customers`, {
        method: 'POST',
        body: JSON.stringify({
            customer_name,
            customer_phone,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler)
