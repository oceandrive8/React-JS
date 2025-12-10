import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import { getItems } from "../services/itemsService";
import { setItems, setCurrentPage } from "../store/itemsSlice";
import "../styles/Items.css";

export default function Items() {
  const dispatch = useDispatch();
  const { items, searchQuery, currentPage, totalPages } = useSelector(
    (state) => state.items
  );
  const pageSize = 10; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allItems = await getItems(searchQuery || "Seventeen");
        const start = (currentPage - 1) * pageSize;
        const pagedItems = allItems.slice(start, start + pageSize);
        const pages = Math.ceil(allItems.length / pageSize);

        dispatch(setItems({ items: pagedItems, totalPages: pages }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [searchQuery, currentPage, dispatch]);

  return (
    <>
      <Navbar />
      <main className="items-page">
        <div className="items-grid">
          {items.length === 0 ? (
            <p>No items found.</p>
          ) : (
            items.map((item) => <ItemCard key={item.id} item={item} />)
          )}
        </div>
        <div className="pagination">
          <button onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))}>
            Prev
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))}
          >
            Next
          </button>
          <select
            value={pageSize}
            onChange={() => dispatch(setCurrentPage(1))}
          >
            {[5, 10, 15, 20].map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
        </div>
      </main>
      <Footer />
    </>
  );
}

