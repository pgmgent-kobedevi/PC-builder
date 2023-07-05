import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createStorage } from "../../../../core/modules/Storage/api";
import { PossibleRoutes } from "../../../../core/routing";
import ErrorAlert from "../../../shared/ErrorAlert";
import { uploadImage } from "core/modules/Upload/api";
import StorageForm from "../forms/StorageForm";

const CreateStorage = () => {
  const withAuth = useAuthApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [file, setFile] = useState();

  const handleSubmit = (data) => {
    setIsLoading(true);

    if(file) {
      const formData = new FormData();
      formData.append('file', file);

      // File upload
      const fileUpload = new Promise(async (resolve, reject) => {
        // await uploadImage(formData, data, user)
        withAuth(uploadImage(formData))
        .then((data) => {
            resolve(data.link);
        })
        .catch((err) =>{
            reject(err);
        })
      });

      fileUpload
      .then((link) => {
        data.image = link
        creater(data);
      })
    }
    else {
      creater(data)
    }

  };

  const creater = (data) => {
    withAuth(createStorage(data))
    .then(() => {
      navigate(PossibleRoutes.Storage, { replace: true });
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
    });
  }

  return (
    <div>
      <h2>Create Storage</h2>
      {error && <ErrorAlert error={error} />}
      <StorageForm file={file} setFile={setFile} onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
};

export default CreateStorage;