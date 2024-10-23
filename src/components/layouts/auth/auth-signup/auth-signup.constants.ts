export enum ConfirmPasswordRules {
  Match = "Passwords do not match",
}

export enum UserNameRules {
  MinLength = "Must be at least 3 characters long",
  MaxLength = "Must be at most 254 characters long",
}

export enum CompanyNameRules {
  MinLength = "Must be at least 3 characters long",
  MaxLength = "Must be at most 254 characters long",
}

export enum EmailRules {
  ValidEmail = "Must be a valid email address",
  MaxLength = "Must be at most 254 characters long",
}
