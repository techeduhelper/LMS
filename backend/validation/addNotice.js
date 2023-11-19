const validateAddNoticeInput = (data) => {
  let errors = {};

  // Perform validation checks on the data object
  if (!data.title) {
    errors.title = "Title is required";
  }

  if (!data.content) {
    errors.content = "Content is required";
  }

  if (!data.publisher) {
    errors.publisher = "Publisher is required";
  }

  if (!data.publisherName) {
    errors.publisherName = "Publisher Name is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export default validateAddNoticeInput;
