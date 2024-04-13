/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./App.css";

type Data = {
  id: number;
  title: string;
  description: string;
};

const data: Data[] = [
  {
    id: 1,
    title: "content 1",
    description: "content 1 description",
  },
  {
    id: 2,
    title: "data 2",
    description: "data  2 details",
  },
  {
    id: 3,
    title: "asar ",
    description: "i am a superman",
  },
  {
    id: 4,
    title: "zonal",
    description: "i studied at zonal",
  },
  {
    id: 5,
    title: "leaders",
    description: "then i went to leaders for further.....",
  },
  {
    id: 6,
    title: "punjab college",
    description: "then i went to punjab college",
  },
  {
    id: 7,
    title: "university",
    description: "then i went to uni for higher studies",
  },
  {
    id: 8,
    title: "graduated",
    description: "graduated as a software engineer",
  },
  {
    id: 9,
    title: "random",
    description: "random data",
  },
  {
    id: 10,
    title: "random",
    description: "random data",
  },
];
function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // // curren page = 1 * 3 =3
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // //3-3 = 0
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  // // 0,3

  //calculating index of last item to be displayed one current page
  const indexOfLastItem = currentPage * itemsPerPage;
  //calculating index of first item to be displayed one current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    //if i want to stop when i reach to the end
    setCurrentPage(currentPage + 1);

    // if i want to cycle through pagination and don't want to stop
    // setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);

    // if i want to cycle through pagination and don't want to stop
    // setCurrentPage((prev) => ( prev === 1 ? totalPages : prev -1))
  };

  return (
    <div className="App">
      <h1>Basic pagination</h1>
      <div>
        {currentItems.map((item) => {
          return (
            <div key={item.id}>
              <h3>
                {item.id} {item.title}
              </h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from(
          { length: Math.ceil(data.length / itemsPerPage) },
          (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          )
        )}

        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
