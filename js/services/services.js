async function getData(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Bad get data menu for error ${res.status}`)
    }

    return await res.json();
};

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    if (!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};

export {postData, getData};