import * as yup from "yup";

export const userSchema = yup.object({
   firstname: yup.string().required().min(5).max(20)
})