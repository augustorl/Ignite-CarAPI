const errorMessages = {
  user_not_admin: "This user does not have permission to do this action!",
  user_unregistered: "User does not exists!",
  user_rent_in_progress:
    "There is a already a rental in progress for this user",
  incorrect_credentials: "Password or email is incorrect!",
  missing_auth_token: "Refresh Token does not exist!",
  invalid_token: "Invalid or missing token.",
  expired_token: "Token expired!",
  mail_already_registered: "E-mail already in use.",
  category_already_registered: "Category already exists!",
  specification_already_registered: "Specification already exists!",
  car_unregistered: "Car does not exists!",
  car_already_registered: "Car already exists!",
  car_rent_in_progress: "Car is unavaible at this time!",
  rent_unregistered: "Rental does not exists!",
  invalid_return_rent_date: "Invalid return time",
  too_many_requests: "Too many requests. Please wait for a few seconds!",
};

export { errorMessages };
