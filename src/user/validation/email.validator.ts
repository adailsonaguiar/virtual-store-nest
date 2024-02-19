import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const hasUser = await this.userRepository.getByEmail(value);
    return !hasUser;
  }
}

export const IsEmailUnique = (validateOptions: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validateOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
