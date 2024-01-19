import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
    {
      message:
        'Password must contain at least 1 number, 1 special character, 1 upper case character and 1 lower case character.',
    },
  )
  password: string;
}
