const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

// src/services/hootService.js

const show = async (hootId) => {
  try {
    const res = await fetch(`${BASE_URL}/${hootId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const create = async (hootFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hootFormData),
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const createComment = async (hootId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export { index, show, create, createComment }; //named export syntax used to export multiple functions from a module
