export default async function(url, getTokenSilently, loginWithPopup) {
  try {
    let token = await getTokenSilently();

    let response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    let data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    await loginWithPopup();
  }
}
