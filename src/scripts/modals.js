import { Modal } from "bootstrap";

const orderBtnDOMEl = document.getElementById("order-btn");
const modalOrderDOMEl = document.getElementById("modal-order");
const modalSuccessDOMEl = document.getElementById("modal-success");
const modalOrder = new Modal(modalOrderDOMEl);
const modalSuccess = new Modal(modalSuccessDOMEl);
const burgerForModalDOMEl = document.querySelector(".burger-for-modal");

orderBtnDOMEl.addEventListener("click", () => {
  modalOrderDOMEl.querySelector(".burger-for-modal").replaceWith(burgerForModalDOMEl.cloneNode(true));
  modalOrder.show();
});

document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();
  modalOrder.hide();
  modalSuccessDOMEl.querySelector(".burger-for-modal").replaceWith(burgerForModalDOMEl.cloneNode(true));
  modalSuccess.show();
});

document.getElementById("success-form").addEventListener("submit", (e) => {
  e.preventDefault();
  modalSuccess.hide();
});
