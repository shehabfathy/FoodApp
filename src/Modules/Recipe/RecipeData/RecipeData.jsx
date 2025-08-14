import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

export default function RecipeData() {
  const [Category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  let location = useLocation();

  let { EditData, isUpdate } = location.state || {};

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onDrop = (acceptedFiles) => {
    setValue("recipeImage", acceptedFiles, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  if (EditData) {
    setValue("name", EditData.name);
    setValue("tagId", EditData.tag);
    setValue("price", EditData.price);
    setValue("categoriesIds", EditData.category);
    setValue("recipeImage", EditData.image);
  }

  const onSubmit = async (value) => {
    let formData = new FormData();
    formData.append("name", value.name);
    formData.append("tagId", value.tagId);
    formData.append("price", value.price);
    formData.append("categoriesIds", value.categoriesIds);
    formData.append("description", value.description);
    formData.append("recipeImage", value.recipeImage[0]);

    try {
      await axios[isUpdate ? "put" : "post"](
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${
          isUpdate ? EditData.id : ""
        }`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      toast.success(
        `${
          isUpdate
            ? "The Recipe updated successfully"
            : "The Recipe created successfully"
        }`
      );
      navigate("/dashboard/recipeList");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=5&pageNumber=1",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setCategory(data.data);
    } catch (error) {
      toast(error.message);
    }
  };

  const getTags = async () => {
    try {
      const { data } = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag/",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setTags(data);
    } catch (error) {
      toast(error.message);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTags();
  }, []);

  return (
    <section className="container-fluid">
      <div
        className="title d-flex justify-content-between align-items-center p-4 mb-2"
        style={{ backgroundColor: "rgba(240, 255, 239, 1)" }}
      >
        <div className="description">
          <h5>
            {isUpdate ? (
              <>
                Edit <span style={{ color: "#009247" }}>the Recipe !</span>
              </>
            ) : (
              <>
                Fill
                <span style={{ color: "#009247" }}> the Recipes !</span>
              </>
            )}
          </h5>
          <p className="w-75">
            You can now fill the meals easily using the table and form. Click
            here and fill it with the table!
          </p>
        </div>
        <div className="btns">
          <button
            className="btn btn-success"
            onClick={() => navigate("/dashboard/recipeList")}
          >
            All Recipes
            <i className="fa-solid fa-arrow-right ps-2"></i>
          </button>
        </div>
      </div>

      <fieldset>
        <legend className="text-muted">{isUpdate ? "" : "Add New Item"}</legend>
        <form className="w-75 mx-auto py-3" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: "Enter a Recipe Name" })}
            type="text"
            className="form-control mb-3"
            placeholder="Recipe Name"
          />
          {errors.name && (
            <span className="text-danger mb-3">{errors.name.message}</span>
          )}

          <select
            className="form-control mb-3"
            {...register("tagId", { required: "Please select a tag" })}
          >
            <option value="">Select a tag</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          {errors.tagId && (
            <span className="text-danger mb-3">{errors.tagId.message}</span>
          )}

          <input
            {...register("price", { required: "Enter a price" })}
            type="number"
            className="form-control mb-3"
            placeholder="Price"
          />
          {errors.price && (
            <span className="text-danger mb-3">{errors.price.message}</span>
          )}

          <select
            className="form-control mb-3"
            {...register("categoriesIds", {
              required: "Please select a category",
            })}
          >
            <option value="">Select a category</option>
            {Category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoriesIds && (
            <span className="text-danger mb-3">
              {errors.categoriesIds.message}
            </span>
          )}

          <textarea
            {...register("description", {
              required: "Please enter a description",
            })}
            className="form-control mb-3"
            placeholder="Description"
          ></textarea>
          {errors.description && (
            <span className="text-danger mb-3">
              {errors.description.message}
            </span>
          )}

          <div {...getRootProps()} className="dropZoneStyle text-center mb-3">
            <input {...getInputProps()} />
            <i className="fa-solid fa-arrow-up-from-bracket fa-xl mb-3"></i>
            <p>
              {acceptedFiles.length > 0 ? (
                acceptedFiles[0].name
              ) : (
                <>
                  Drag & Drop or{" "}
                  <span style={{ color: "#009247" }}>Choose a Item Image</span>{" "}
                  to Upload
                </>
              )}
            </p>
          </div>
          {errors.recipeImage && (
            <span className="text-danger mb-3">
              {errors.recipeImage.message}
            </span>
          )}

          <input
            type="hidden"
            {...register("recipeImage", {
              required: "Please upload an image",
            })}
          />

          <div className="btns d-flex justify-content-end align-items-center">
            <button
              type="button"
              className="btn border-1 border-success me-2 px-4"
              onClick={() => navigate("/dashboard/recipeList")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success px-4">
              {isUpdate ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </fieldset>
    </section>
  );
}
