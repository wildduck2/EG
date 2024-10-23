export enum PhoneInputError {
  TooShort = "Phone number must be at least 10 digits",
  InvalidCharacters = "Phone number must contain only digits",
  TooLong = "Phone number must be at most 15 digits",
}

export enum PasswordRules {
  MaxLength = "Must be at most 32 characters long",
  MinLength = "Must be at least 6 characters long",
  // Uppercase = "Must contain an uppercase letter",
  // Lowercase = "Must contain a lowercase letter",
  // Number = "Must contain a number",
  // SpecialCharacter = "Must contain a special character (e.g. !@#$%)",
}
