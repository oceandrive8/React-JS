export async function getAll() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/oceandrive8/Homify/refs/heads/main/barbiemovies.json"
    );

    if (!res.ok) throw new Error("Failed to load data");

    const data = await res.json();
    return data.movies || []; 
  } catch (err) {
    throw err;
  }
}

export async function getById(id) {
  try {
    const movies = await getAll();
    const movie = movies.find(m => String(m.id) === String(id));

    if (!movie) throw new Error("Movie not found");

    return movie;
  } catch (err) {
    throw err;
  }
}
