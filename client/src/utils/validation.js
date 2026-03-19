// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (basic)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate personal info form
export const validatePersonalInfo = (data) => {
  const errors = {};

  if (!data.full_name?.trim()) {
    errors.full_name = "Full name is required";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (data.linkedin && !isValidUrl(data.linkedin)) {
    errors.linkedin = "Please enter a valid LinkedIn URL";
  }

  if (data.website && !isValidUrl(data.website)) {
    errors.website = "Please enter a valid website URL";
  }

  return errors;
};

// Validate experience/education dates
export const validateDateRange = (startDate, endDate, currentlyWorking = false) => {
  if (!startDate) return "Start date is required";
  
  const start = new Date(startDate);
  if (!currentlyWorking && endDate) {
    const end = new Date(endDate);
    if (end < start) {
      return "End date must be after start date";
    }
  }

  return null;
};

// Validate all experience entries
export const validateExperience = (experiences) => {
  const errors = [];

  experiences.forEach((exp, index) => {
    const expErrors = {};

    if (!exp.company_name?.trim()) {
      expErrors.company_name = "Company name is required";
    }

    if (!exp.position?.trim()) {
      expErrors.position = "Position is required";
    }

    const dateError = validateDateRange(
      exp.start_date,
      exp.end_date,
      exp.currently_working
    );
    if (dateError) {
      expErrors.date = dateError;
    }

    if (Object.keys(expErrors).length > 0) {
      errors[index] = expErrors;
    }
  });

  return errors;
};

// Validate education entries
export const validateEducation = (education) => {
  const errors = [];

  education.forEach((edu, index) => {
    const eduErrors = {};

    if (!edu.school_name?.trim()) {
      eduErrors.school_name = "School/University name is required";
    }

    if (!edu.field_of_study?.trim()) {
      eduErrors.field_of_study = "Field of study is required";
    }

    const dateError = validateDateRange(edu.start_date, edu.end_date);
    if (dateError) {
      eduErrors.date = dateError;
    }

    if (Object.keys(eduErrors).length > 0) {
      errors[index] = eduErrors;
    }
  });

  return errors;
};

// Validate skills
export const validateSkills = (skills) => {
  const errors = [];

  skills.forEach((skill, index) => {
    if (!skill.name?.trim()) {
      errors[index] = "Skill name is required";
    }
  });

  return errors;
};
