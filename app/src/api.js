export async function createGame() {
  const response = await fetch(`/api/game/create`, {
    method: "POST",
  });
  if (!response.ok) {
    alert("Failed to create game");
    return;
  }
  const json = await response.json();
  return json;
}
