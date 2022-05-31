import React, { useCallback, useEffect, useMemo } from 'react';

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation(initialValues, initialValid) {
  const [values, setValues] = React.useState({});

  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(initialValid ?? false);

  // 
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues)
    }
  }, [initialValues]);

  const isDisabled = useMemo(() => {
    // console.log(initialValues)
    if (!initialValues) return
    console.log(initialValues)
    const hasChangedData = Object.entries(initialValues).filter(([key, value]) => {
      return values[key] !== value
    })
    return !hasChangedData?.length
  }, [initialValues, values]);
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, isDisabled, resetForm };
}