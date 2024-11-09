import * as yup from "yup";

const clubName = yup.string().required("Club name is required").min(3);
const clubCountry = yup.string().required("Club country is required").min(3);
const clubLogo = yup.string().required("Club logo is required");

export const AddClubSchema = yup
  .object({ clubName, clubCountry, clubLogo })
  .required();
