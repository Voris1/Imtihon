import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Paginate from "../../components/Paginate/Paginate";
import SideBar from "../../components/SideBar/SideBar";
import "./Home.scss";
import else_img from "../../assets/else.svg";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = (props) => {
  // const minus = () => toast("ост успешно удален");
  const minus = () =>
    toast.success("Пост успешно удален!!!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

 

  const params = useParams();
  const [product, setProduct] = useState();
  const [productSearch, setProductSearch] = useState();
  const [pageOffset, setPageOffset] = useState(5);
  const [pageLimit, setPageLimit] = useState(1);
  const [loginClick, setLoginClick] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState(true);
  const [trash, setTrash] = useState("");
  let token = localStorage.getItem("token");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (!token) {
      window.location = "/login";
    }
    fetch("https://64a6fca7096b3f0fcc80ef97.mockapi.io/products")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const handleTrash = async (id) => {
    fetch(`https://64a6fca7096b3f0fcc80ef97.mockapi.io/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        product.forEach((p, index) => {
          if (p.id == id) {
            product.splice(index, 1);
            let products = [...product];
            setProduct(products);
          }
        });
      });
  };

  console.log(product);

  return (
    <>
      <div className="home">
        <ToastContainer />

        {loginClick ? (
          <div className="header-bar">
            <div className="header-bar-content">
              <h2> Вы действительно хотите выйти с аккаунта?</h2>
              <div className="header-bar-btn">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location = "/login";
                   
                  }}
                  className="exit"
                >
                  Выйти
                </button>
                <button onClick={() => setLoginClick(false)} className="no">
                  Отмена
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {trash ? (
          <div className="header-bar">
            <div className="header-bar-content">
              <h2> Вы действительно хотите удалить пост?</h2>
              <div className="header-bar-btn">
                <button
                  className="exit  ml-[40px]"
                  onClick={() => {
                    handleTrash(trash);
                    setTrash("");
                    setTimeout(() => {
                      minus();
                    }, 500);
                  }}
                >
                  Да
                </button>
                <button onClick={() => setTrash("")} className="no">
                  Нет
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <SideBar />
        <div className="home-div">
          <Header
            head="Товары"
            loginClick={loginClick}
            setLoginClick={setLoginClick}
          />

          {loading ? (
            <div className="loader_div">
              <span className="loader"></span>
            </div>
          ) : product?.length > 0 ? (
            <div>
              <div className="home-content">
                <div className="home-content-start">
                  <h2> Все товары ({product?.length})</h2>
                  <input
                    type="text"
                    name="search"
                    placeholder="Поиск"
                    onChange={(evt) => {
                      setInputValue(evt.target.value);
                      let resSearch = product?.filter((i, index) =>
                        i.name.includes(evt.target.value)
                      );
                      setProductSearch(resSearch);
                    }}
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <hr />
                <div className="home-content-post-start">
                  <div className="post-h2">
                    <i className="fa-solid fa-square-check"></i>
                    <p>Наименование</p>

                    <h2>{props.user}</h2>
                  </div>
                  <p>Артикул</p>
                  <p>Бренд</p>
                  <p>Цена</p>
                  <p>Цена со скидкой</p>
                </div>
                <hr />
                {inputValue !== undefined
                  ? productSearch?.map((i, index) =>
                      index >= pageOffset * (pageLimit - 1) &&
                      index < pageOffset * pageLimit ? (
                        <div key={index} className="home-content-post">
                          <div className="post-h2">
                            <i className="fa-solid fa-square-check"></i>
                            <h2>Товар {index}</h2>
                          </div>

                          <p className="post-p1">{i.createdAt.slice(0, 19)}</p>
                          <p className="post-p2">{i.brand}</p>
                          <p className="post-p3">{i.price}$</p>
                          <p className="post-p4">{i.priceInSale}$</p>

                          <div className="post-icons">
                            <i className="fa-regular fa-pen-to-square"></i>
                            <i className="fa-solid fa-trash"></i>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )
                  : product?.map((i, index) =>
                      index >= pageOffset * (pageLimit - 1) &&
                      index < pageOffset * pageLimit ? (
                        <div key={index} className="home-content-post">
                          <div className="post-h2">
                            <i className="fa-solid fa-square-check"></i>
                            <h2>Товар {index + 1} </h2>
                          </div>

                          <p className="post-p1">{i.createdAt.slice(0, 19)}</p>
                          <p className="post-p2">{i.brand}</p>
                          <p className="post-p3">{i.price}$</p>
                          <p className="post-p4">{i.priceInSale}$</p>

                          <div className="post-icons">
                            <Link to={`/edit/${i.id}`}>
                              {" "}
                              <i className="fa-regular fa-pen-to-square"></i>
                            </Link>
                            <i
                              onClick={() => {
                                setTrash(i.id);
                              }}
                              className="fa-solid fa-trash"
                            ></i>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )}

                {product?.length > 0 ? (
                  <Paginate
                    product={product}
                    changePageOffset={setPageOffset}
                    changePageLimit={setPageLimit}
                    getPageLimit={pageLimit}
                    getPageOffset={pageOffset}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="home-button">
                <Link to={"/add"}>
                  <button className="home-btn"> + Новый товар</button>
                </Link>
                <p>© Anymarket 2022</p>
              </div>
            </div>
          ) : (
            <div className="else-home">
              <div className="else-home-content">
                <h2>Вы пока не создали ни одного товара</h2>
                <img src={else_img} alt="img" />
                <div className="else-btn">
                  <Link to={"/add"}>
                    <button>Создать первый товар</button>
                  </Link>
                </div>
              </div>
              <p>© Anymarket 2022</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
