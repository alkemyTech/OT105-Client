const validate = (values) => {
  let errors = {};

  if (!values.logo) {
    errors.logo = 'required!';
  } else if (!/\.(jpe?g|png)$/i.test(values.logo)) {
    errors.logo = 'file must be png or jpg';
  }
  if (!values.name) {
    errors.name = 'required!';
  }
  if (!values.longDescription) {
    errors.longDescription = 'required!';
  }
  if (!values.shortDescription) {
    errors.shortDescription = 'required!';
  }
  if (!values.link1) {
    errors.link1 = 'required';
  } else if (
    !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
      values.link1,
    )
  ) {
    errors.link1 = 'must be a valid url link';
  }
  if (!values.link2) {
    errors.link2 = 'required';
  } else if (
    !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
      values.link2,
    )
  ) {
    errors.link2 = 'must be a valid url link';
  }
  if (!values.link3) {
    errors.link3 = 'required';
  } else if (
    !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
      values.link3,
    )
  ) {
    errors.link3 = 'must be a valid url link';
  }

  return errors;
};

export default validate;
