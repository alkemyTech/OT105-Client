import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Alert } from '@mui/material';
import { blobToBase64 } from '../../utils/imageToBase64';

export const CustomDropzone = ({ setImage64 = () => {} }) => {
  const [image, setImage] = useState({
    file: null,
    preview: null,
    error: null,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    multiple: false,
    maxFiles: 1,
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 63747e6 (add util function to get base64)
=======

>>>>>>> fb478f9 (add patch fetching function if receive a user)
    onDrop: (acceptedImage) => {
      if (
        acceptedImage.length > 0 &&
        (acceptedImage[0].type === 'image/png' ||
          acceptedImage[0].type === 'image/jpeg')
      ) {
        setImage({
          file: acceptedImage[0],
          preview: URL.createObjectURL(acceptedImage[0]),
          error: null,
        });
      } else {
        setImage({
          file: null,
          preview: null,
<<<<<<< HEAD
<<<<<<< HEAD
          error: 'El archivo debe ser una imagen .png/.jpg',
        });
      }
    },
    onSubmit: () => {
      setImage({
        ...image,
        preview: null,
      });
    },
<<<<<<< HEAD
=======
          error: 'File must be an image',
=======
          error: 'El archivo debe ser una imagen .png/.jpg',
>>>>>>> 927dec3 (implements post on create user)
        });
      }
    },
>>>>>>> 63747e6 (add util function to get base64)
=======
>>>>>>> fb478f9 (add patch fetching function if receive a user)
  });

  useEffect(() => {
    if (image.file) {
      setDataImage();
    }
<<<<<<< HEAD
<<<<<<< HEAD
  }, [image.file]);
=======
  }, [image]);
>>>>>>> 63747e6 (add util function to get base64)
=======
  }, [image.file]);
>>>>>>> 927dec3 (implements post on create user)

  const setDataImage = async () => {
    const base64 = await blobToBase64(image.file);

    setImage64(base64);
  };

  const style = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          <section className="container">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <h3>Drag and drop some files here, or click to select files *</h3>
              <p>Only png and jpg accepted*</p>
            </div>
          </section>
        </Grid>
        <Grid item md={4} xs={12}>
          <div className="dropzone">
            {image.preview && (
              <img
                alt="preview"
                fit="cover"
                src={image.preview}
                style={{
                  objectFit: 'scale-down',
                  width: '100%',
                  maxHeight: '160px',
                }}
              />
            )}
          </div>
        </Grid>
      </Grid>
      {image.error && <Alert severity="warning">{image.error}</Alert>}
    </>
  );
};
