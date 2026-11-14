import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5005";
axios.interceptors.response.use(
  response => response,
  error => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);
export default {
  getTasks: async () => {
    const result = await axios.get("/items")
    return result.data;
  },

  addTask: async (name) => {
    const result = await axios.post("/items", {
      name: name,
      isComplete: false
    });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    // השרת מחליף גם את השם, לכן שולפים קודם את המשימה הקיימת
    const all = await axios.get(`/items`);
    const task = all.data.find(t => t.id === id);
    await axios.put(`/items/${id}`, {
      name: task.name,
      isComplete: isComplete
    });
    return {};
  },

  deleteTask: async (id) => {
    await axios.delete(`/items/${id}`);
  }
};