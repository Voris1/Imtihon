import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import "../Edit/Edit.scss";
import add from "../../assets/add.png";
import { Link, useParams } from "react-router-dom";

const Edit = (token) => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    fetch(`https://64a6fca7096b3f0fcc80ef97.mockapi.io/products${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  });

  if (!token) {
    window.location = "/login";
  }

  const handleSubmit = async (e) => {
    let {
      name,
      brand,
      createdAt,
      madeIn,
      description,
      weight,
      image,
      color,
      price,
      priceInSale,
    } = e.target;
    e.preventDefault();
    const response = await fetch(
      `https://64a6fca7096b3f0fcc80ef97.mockapi.io/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          brand: brand.value,
          createdAt: createdAt.value,
          madeIn: madeIn.value,
          description: description.value,
          weight: weight.value,
          image: image.value,
          color: color.value,
          price: price.value,
          priceInSale: priceInSale.value,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    if (result?.id !== 0) {
      window.location = "/";
    }
  };

  return (
    <>
      <div className="edit-div">
        <SideBar />
        <div className="add">
          <div className="header">
            <div className="header-content">
              <div className="header-text">
                <h2>Новый товар </h2>
                <p>Главная / Товары</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="add-content-input">
            <div className="add-content">
              <h2>Основные</h2>
              <div className="add-input-content">
                <div className="add-content-input">
                  <label>
                    Название <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-[780px] h-[45px]"
                    required
                    value={id.newname}
                  />
                </div>

                <div className="add-content-input-div flex">
                  <div className="add-content-input">
                    <label>
                      Бренд <span className="text-red-400">*</span>
                      <i className="fa-regular fa-circle-question"></i>
                    </label>
                    <input
                      type="text"
                      name="brand"
                      className="w-[360px] h-[45px]"
                      required
                      value={id.brand}
                    />
                  </div>
                  <div className="add-content-input">
                    <label>
                      Артикул производителя
                      <span className="text-red-400">*</span>
                      <i className="fa-regular fa-circle-question"></i>
                    </label>
                    <input
                      type="text"
                      name="createdAt"
                      className="w-[360px] h-[45px]"
                      required
                      value={id.createdAt}
                    />
                    <p className="text-red-500">Укажите артикул</p>
                  </div>
                </div>
                <div className="add-content-input">
                  <label>
                    Страна производства
                    <i className="fa-regular fa-circle-question"></i>
                  </label>
                  <input
                    type="text"
                    name="madeIn"
                    className="w-[360px] h-[45px]"
                    placeholder="Китай"
                    required
                    value={id.madeIn}
                  />
                </div>
                <div className="add-content-input">
                  <label>
                    Описание <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    className="area"
                    name="description"
                    type="text"
                    cols="90"
                    rows="6"
                    value={id.description}
                  ></textarea>
                </div>
                <div className="add-content-input">
                  <label>Вес с упаковкой, грамм </label>
                  <input
                    type="text"
                    name="weight"
                    className="w-[240px] h-[45px]"
                    required
                    value={id.weight}
                  />
                </div>
              </div>
              <div className="add-input-content-2">
                <div className="add-content-input">
                  <label>
                    Описание <span className="text-red-400">*</span>
                  </label>
                  <button className="add-btn">
                    <img src={add} alt="img" />
                    <input
                      type="file"
                      id="add_image_input"
                      name="image"
                      required
                      value={id.image}
                    />
                  </button>
                  <p>Загрузите не более 20 фотографий</p>
                </div>
                <div className="add-content-input flex">
                  <input
                    type="color"
                    name="color"
                    placeholder="Выберите цвет"
                    className="color-input align"
                    required
                  />
                  <p className="ml-4 mt-[12px] text-lg">Выберите цвет</p>
                </div>
                <div className="add-content-input-div flex">
                  <div className="add-content-input">
                    <label>Цена</label>
                    <input
                      type="text"
                      name="price"
                      className="w-[250px] h-[45px]"
                      required
                      value={id.price}
                    />
                  </div>
                  <div className="add-content-input">
                    <label>Цена со скидкой</label>
                    <input
                      type="text"
                      name="priceInSale"
                      className="w-[250px] h-[45px]"
                      value={id.priceInSale}
                    />
                  </div>
                </div>
              </div>
            </div>

            <footer>
              <div className="footer-content">
                <button type="submit" className="footer-btn">
                  Сохранить
                </button>

                <Link to={"/"}>
                  <p>Отмена</p>
                </Link>
              </div>
            </footer>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
