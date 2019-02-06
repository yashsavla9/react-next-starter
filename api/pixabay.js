import axios from "axios";

export default axios.create({
  baseURL: "https://pixabay.com/api",
  params: {
    key: "11412104-e96ed73b22a446b005e8b1bbc",
    iamge_type: "photo"
  }
});
