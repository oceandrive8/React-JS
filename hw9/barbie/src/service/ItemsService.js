import { collection, getDocs, doc, getDoc,  query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function getAll(query) {
  try {
    const snap = await getDocs(collection(db, "movies"));
    const arr = [];
    snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
    if (!query) return arr;
    return arr.filter(m =>
      m.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (err) {
    throw err;
  }
}

export async function getById(id) {
  const q = query(collection(db, "movies"), where("id", "==", Number(id)));
  const snap = await getDocs(q);
  if (snap.empty) throw new Error("Movie not found");
  const movie = snap.docs[0].data();
  return { id: snap.docs[0].id, ...movie };
}



